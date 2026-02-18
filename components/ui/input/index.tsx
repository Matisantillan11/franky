import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import { InputProps } from './types';
import { inputVariants } from './variants';

export default function Input({
  label,
  errorText,
  isError,
  className,
  isRequired,
  variant,
  size,
  ...props
}: InputProps) {
  return (
    <KeyboardAvoidingView behavior="position">
      <View className="w-fit">
        {label ? (
          <View className={cn('flex-row items-center', isRequired ? 'gap-1' : '')}>
            <Text
              className={cn(
                'text-gray-gray500 dark:text-gray-gray400 mb-1 text-sm font-medium',
                isError ? 'text-error-error500' : ''
              )}
            >
              {label}
            </Text>
            {isRequired ? (
              <Text
                className={cn(
                  'text-md text-warning-warning500 font-bold',
                  isError ? 'text-error-error500' : ''
                )}
              >
                *
              </Text>
            ) : null}
          </View>
        ) : null}

        <TextInput
          {...props}
          className={cn(
            inputVariants({ variant, size }),
            isError ? 'border-error-error500' : '',
            className
          )}
          placeholderTextColorClassName="accent-gray-gray400 dark:accent-gray-gray500"
          underlineColorAndroidClassName="accent-transparent"
        />

        {errorText && isError ? (
          <Text className="text-error-error500 mt-1 text-sm">{errorText}</Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}
