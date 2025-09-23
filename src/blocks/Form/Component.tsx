'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { Send } from 'lucide-react'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12 text-muted-foreground text-sm"
          data={introContent}
          enableGutter={false}
        />
      )}

      {/* Outer card only */}
      <div
        className="p-10 rounded-2xl 
                  bg-card/90 backdrop-blur-sm 
                  shadow-sm hover:shadow-xl hover:shadow-primary/10 
                  transition-all duration-300"
      >
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <RichText data={confirmationMessage} />
            </div>
          )}

          {isLoading && !hasSubmitted && (
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                <p className="text-muted-foreground">Loading, please wait...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  Error {error.status || '500'}: {error.message || 'Something went wrong'}
                </span>
              </div>
            </div>
          )}

          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8">
                {formFromProps?.fields?.map((field, index) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <div key={index} className="space-y-3">
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          className="w-full h-12 text-base bg-background/50 border-border/50 
                                 focus:border-primary focus:ring-primary/20 
                                 transition-all duration-300"
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              {/* Submit button */}
              <Button
                form={formID}
                type="submit"
                size="lg"
                variant="default"
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold group 
                       hover:scale-105 transition-all duration-300 
                       bg-primary hover:bg-primary/90 
                       shadow-lg hover:shadow-xl hover:shadow-primary/25"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:rotate-12" />
                    {submitButtonLabel || 'Submit'}
                  </span>
                )}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
