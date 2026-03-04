import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { BlurView } from '~/components/blur-circle';
import {
  Button,
  Calendar,
  Form,
  FormField,
  Input,
  TextArea,
  ThemedText,
  useForm,
  useToast,
} from '~/components/ui';
import { useCreateTransaction } from '~/libs/fetcher';
import { transformCurrencyToString, transformValueToCurrency } from '~/shared/utils/text-utils';
import CategoriesList from '../categories-list';
import { AddTransactionFormKeys } from './constants';
import { AddTransactionFormValues } from './types';

export default function FormComposition() {
  const router = useRouter();

  const { addToast } = useToast();
  const form = useForm<AddTransactionFormValues>({
    defaultValues: {
      amount: '',
      categoryId: '',
      date: new Date(),
      notes: '',
    },
  });

  const { handleSubmit } = form;
  const { mutateAsync: createTransaction } = useCreateTransaction();

  const onSubmitForm = (data: AddTransactionFormValues) => {
    createTransaction(
      {
        amount: Number(transformCurrencyToString(data.amount)),
        type: 'expense',
        categoryId: data.categoryId,
        dueDate: data.date,
        note: data.notes,
      },
      {
        onSuccess: () => {
          addToast({
            message: 'Transaction saved successfully',
            description:
              'Your transaction has been saved successfully. Go to your dashboard to see your updated balance.',
            type: 'success',
          });
          router.back();
        },
        onError: () => {
          addToast({
            message: 'Error saving transaction',
            description:
              'Something went wrong while saving your transaction. Please try again later.',
            type: 'error',
          });
        },
      }
    );
  };

  return (
    <Form {...form}>
      <View className="mb-12 h-full flex-1 justify-between">
        <View className="w-full flex-1">
          <View className="h-10 w-full" />

          <View className="w-full items-center">
            <ThemedText className="text-center">Total amount</ThemedText>
            <FormField name={AddTransactionFormKeys.amount} form={form}>
              {({ field }) => (
                <Input
                  {...field}
                  value={transformValueToCurrency(field.value, true)}
                  onChangeText={field.onChange}
                  placeholder="$ 0.00"
                  size="xl"
                  variant="ghost"
                  className="w-full"
                  keyboardType="numeric"
                />
              )}
            </FormField>
          </View>

          <View className="h-full w-full flex-1 gap-10">
            <CategoriesList form={form} />

            <View className="w-full gap-4 px-4">
              <FormField name={AddTransactionFormKeys.date} form={form}>
                {({ field }) => <Calendar {...field} label="Date" />}
              </FormField>

              <FormField name={AddTransactionFormKeys.notes} form={form}>
                {({ field }) => (
                  <TextArea
                    {...field}
                    label="Notes"
                    size="lg"
                    variant="ghost"
                    placeholder="What was this for? Add any extra details..."
                    onChangeText={field.onChange}
                  />
                )}
              </FormField>
            </View>
          </View>
        </View>

        <View className="w-full px-4">
          <BlurView size={500} left={-50} />
          <Button onPress={handleSubmit(onSubmitForm)}>Add transaction</Button>
        </View>
      </View>
    </Form>
  );
}
