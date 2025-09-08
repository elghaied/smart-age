import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 4, width }) => {
  const hasError = !!errors[name]

  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-label="required">
              *
            </span>
          )}
        </Label>
        <TextAreaComponent
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          error={hasError}
          className="transition-all duration-200 resize-vertical min-h-[100px]"
          placeholder={`Enter ${label?.toLowerCase() || 'your message'}`}
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
        />
        <Error name={name} />
      </div>
    </Width>
  )
}
