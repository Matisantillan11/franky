import {
  useFieldArray as useRHFFieldArray,
  useForm as useRHFForm,
  useFormContext,
} from 'react-hook-form';
import type { FieldValues, UseFormProps, UseFormReturn } from './types';

function useForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  return useRHFForm<TFieldValues>(props);
}

export { useFieldArray as useFieldArray } from 'react-hook-form';
export { useForm, useFormContext };