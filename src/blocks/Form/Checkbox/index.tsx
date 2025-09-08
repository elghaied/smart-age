import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required ? `${label} is required` : false })
  const { setValue } = useFormContext()
  const hasError = !!errors[name]

  return (
    <Width width={width}>
      <div className="space-y-2">
        <div
          className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${hasError ? 'border-destructive bg-destructive/5' : 'border-border hover:border-accent/30 hover:bg-accent/5'}`}
        >
          <CheckboxUi
            defaultChecked={defaultValue}
            id={name}
            className="mt-0.5"
            {...props}
            onCheckedChange={(checked) => {
              setValue(props.name, checked)
            }}
          />
          <div className="flex-1">
            <Label
              htmlFor={name}
              className="text-sm font-medium text-foreground cursor-pointer leading-relaxed"
            >
              {required && (
                <span className="text-destructive mr-1" aria-label="required">
                  *
                </span>
              )}
              {label}
            </Label>
          </div>
        </div>
        <Error name={name} />
      </div>
    </Width>
  )
}
