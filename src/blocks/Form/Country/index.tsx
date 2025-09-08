import type { CountryField } from '@payloadcms/plugin-form-builder/types'
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
import { countryOptions } from './options'

export const Country: React.FC<
  CountryField & {
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
            const controlledValue = countryOptions.find((t) => t.value === value)

            return (
              <div className="relative">
                <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
                  <SelectTrigger
                    className={`w-full transition-all duration-200 pl-10 ${hasError ? 'border-destructive focus:ring-destructive' : ''}`}
                    id={name}
                  >
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map(({ label: countryLabel, value: countryValue }) => {
                      return (
                        <SelectItem key={countryValue} value={countryValue}>
                          {countryLabel}
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
