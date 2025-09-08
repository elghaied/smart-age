import type { StateField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'
import { stateOptions } from './options'

export const State: React.FC<
  StateField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, required, width }) => {
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
          defaultValue=""
          name={name}
          render={({ field: { onChange, value } }) => {
            const controlledValue = stateOptions.find((t) => t.value === value)

            return (
              <div className="relative">
                <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
                  <SelectTrigger
                    className={`w-full transition-all duration-200 pl-10 ${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                    id={name}
                  >
                    <SelectValue placeholder="Select your state/province" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map(({ label: stateLabel, value: stateValue }) => {
                      return (
                        <SelectItem key={stateValue} value={stateValue}>
                          {stateLabel}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
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
