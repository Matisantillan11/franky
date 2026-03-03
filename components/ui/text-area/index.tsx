import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { cn } from '~/shared/utils/tailwind';
import ThemedText from '../themed-text';
import { TextAreaProps } from './types';
import { textAreaVariants } from './variants';

export default function TextArea({
  numberOfLines = 4,
  variant,
  size,
  className,
  label,
  ...props
}: TextAreaProps) {
  return (
    <KeyboardAvoidingView behavior="position">
      <View className="w-fit">
        {label ? (
          <View className="flex-row items-center">
            <ThemedText className={cn('text-gray-gray500 dark:text-gray-gray400 mb-1 font-medium')}>
              {label}
            </ThemedText>
          </View>
        ) : null}

        <TextInput
          {...props}
          className={cn(textAreaVariants({ variant, size }), className)}
          multiline
          numberOfLines={numberOfLines}
          placeholderTextColorClassName="accent-gray-gray600 dark:accent-gray-gray600"
          underlineColorAndroidClassName="accent-transparent"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
