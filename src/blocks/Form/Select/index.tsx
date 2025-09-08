import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, options, required, width, defaultValue }) => {
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
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field: { onChange, value } }) => {
            const controlledValue = options.find((t) => t.value === value)

            return (
              <SelectComponent
                onValueChange={(val) => onChange(val)}
                value={controlledValue?.value}
              >
                <SelectTrigger
                  className={`w-full transition-all duration-200 ${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                  id={name}
                >
                  <SelectValue placeholder={`Select ${label?.toLowerCase() || 'an option'}`} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(({ label: optionLabel, value: optionValue }) => {
                    return (
                      <SelectItem key={optionValue} value={optionValue}>
                        {optionLabel}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </SelectComponent>
            )
          }}
          rules={{
            required: required ? `${label} is required` : false,
          }}
        />
        <Error name={name} />
      </div>
    </Width>
  )
}
