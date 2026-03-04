import { ReactElement } from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { Text, TextProps, View, ViewProps } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import { useFieldArray, useForm } from './hooks';
import type {
  ControllerFieldState,
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
  UseFormStateReturn,
} from './types';

// ---------------------------------------------------------------------------
// FormField — FACC (Function as a Child Component) pattern
// Children receive { field, fieldState, formState } from react-hook-form
// ---------------------------------------------------------------------------

type FormFieldChildrenProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: Parameters<ControllerProps<TFieldValues, TName>['render']>[0]['field'];
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  children: (props: FormFieldChildrenProps<TFieldValues, TName>) => ReactElement;
  form: UseFormReturn<TFieldValues>;
};

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ children, form, ...props }: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      {...props}
      control={form.control}
      render={(renderProps) => children(renderProps as FormFieldChildrenProps<TFieldValues, TName>)}
    />
  );
}

// ---------------------------------------------------------------------------
// FormItem — container with consistent vertical gap
// ---------------------------------------------------------------------------

type FormItemProps = ViewProps;

function FormItem({ className, ...props }: FormItemProps) {
  return <View className={cn('gap-1', className)} {...props} />;
}

// ---------------------------------------------------------------------------
// FormLabel — label text with optional required indicator and error state
// ---------------------------------------------------------------------------

type FormLabelProps = TextProps & {
  required?: boolean;
  error?: boolean;
};

function FormLabel({ className, required, error, children, ...props }: FormLabelProps) {
  return (
    <View className="flex-row items-center gap-1">
      <Text
        className={cn(
          'text-gray-gray500 dark:text-gray-gray400 text-sm font-medium',
          error && 'text-error-error500',
          className
        )}
        {...props}
      >
        {children}
      </Text>
      {required ? (
        <Text
          className={cn(
            'text-warning-warning500 text-md font-bold',
            error && 'text-error-error500'
          )}
        >
          *
        </Text>
      ) : null}
    </View>
  );
}

// ---------------------------------------------------------------------------
// FormDescription — subtle helper text below a field
// ---------------------------------------------------------------------------

type FormDescriptionProps = TextProps;

function FormDescription({ className, ...props }: FormDescriptionProps) {
  return (
    <Text
      className={cn('text-gray-gray400 dark:text-gray-gray500 text-xs', className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FormMessage — inline error / validation message
// ---------------------------------------------------------------------------

type FormMessageProps = TextProps & {
  error?: string;
};

function FormMessage({ className, error, children, ...props }: FormMessageProps) {
  const body = error ?? children;

  if (!body) return null;

  return (
    <Text className={cn('text-error-error500 text-xs font-medium', className)} {...props}>
      {body}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Form — main export combining FormProvider with all utilities attached
// ---------------------------------------------------------------------------

export const Form = Object.assign(FormProvider, {
  useForm,
  useFormContext,
  useFieldArray,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Description: FormDescription,
  Message: FormMessage,
});

export { FormDescription, FormField, FormItem, FormLabel, FormMessage };
export type {
  FormFieldChildrenProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
};
