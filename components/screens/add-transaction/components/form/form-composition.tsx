import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BlurView } from '~/components/blur-circle';
import {
  Button,
  Calendar,
  Form,
  FormField,
  Input,
  Tabs,
  TextArea,
  ThemedText,
  useForm,
  useToast,
} from '~/components/ui';
import { useCategories, useCreateTransaction } from '~/libs/fetcher';
import { transformCurrencyToString, transformValueToCurrency } from '~/shared/utils/text-utils';
import CategoriesList from '../categories-list';
import { AddTransactionFormKeys } from './constants';
import { AddTransactionFormValues } from './types';

type Props = {
  initialAmount?: string;
  initialCategoryName?: string;
};

export default function FormComposition({ initialAmount, initialCategoryName }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const { addToast } = useToast();
  const form = useForm<AddTransactionFormValues>({
    defaultValues: {
      amount: initialAmount ?? '',
      categoryId: '',
      type: 'expense',
      date: new Date(),
      notes: '',
    },
  });

  const { handleSubmit, watch } = form;
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const { data: categories } = useCategories();

  // Resolve categoryName → categoryId when coming from a Shortcut deep link
  useEffect(() => {
    if (!initialCategoryName || !categories) return;

    const match = categories.find(
      (c) => c.name.toLowerCase() === initialCategoryName.toLowerCase()
    );

    if (match) {
      form.setValue('categoryId', match.id);
    }
  }, [initialCategoryName, categories]);

  const onSubmitForm = (data: AddTransactionFormValues) => {
    createTransaction(
      {
        amount: Number(transformCurrencyToString(data.amount)),
        type: data.type,
        categoryId: data.categoryId,
        dueDate: data.date,
        note: data.notes,
      },
      {
        onSuccess: () => {
          addToast({
            message: t('transaction.success.title'),
            description: t('transaction.success.description'),
            type: 'success',
          });
          router.back();
        },
        onError: () => {
          addToast({
            message: t('transaction.error.title'),
            description: t('transaction.error.description'),
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
            <ThemedText className="text-center">{t('transaction.totalAmount')}</ThemedText>
            <FormField name={AddTransactionFormKeys.amount} form={form}>
              {({ field }) => {
                const value = `${transformValueToCurrency(field.value, true)}`;

                return (
                  <Input
                    {...field}
                    value={value}
                    onChangeText={field.onChange}
                    placeholder={t('transaction.placeholder')}
                    size="xl"
                    variant="ghost"
                    className="w-full"
                    keyboardType="numeric"
                  />
                );
              }}
            </FormField>
          </View>

          <View className="h-full w-full flex-1 gap-10">
            <CategoriesList form={form} />

            <FormField name={AddTransactionFormKeys.type} form={form}>
              {({ field }) => (
                <View className="px-4">
                  <Tabs
                    value={field.value}
                    onChange={(value) => field.onChange(value as 'expense' | 'income')}
                    label={t('transaction.expense') + ' / ' + t('transaction.income')}
                    options={[
                      { label: t('transaction.expense'), value: 'expense' },
                      { label: t('transaction.income'), value: 'income' },
                    ]}
                  />
                </View>
              )}
            </FormField>

            <View className="w-full gap-4 px-4">
              <FormField name={AddTransactionFormKeys.date} form={form}>
                {({ field }) => <Calendar {...field} label={t('transaction.date')} />}
              </FormField>

              <FormField name={AddTransactionFormKeys.notes} form={form}>
                {({ field }) => (
                  <TextArea
                    {...field}
                    label={t('transaction.notes')}
                    size="lg"
                    variant="ghost"
                    placeholder={t('transaction.notesPlaceholder')}
                    onChangeText={field.onChange}
                  />
                )}
              </FormField>
            </View>
          </View>
        </View>

        <View className="w-full px-4">
          <BlurView size={500} left={-50} />
          <Button onPress={handleSubmit(onSubmitForm)}>{t('transaction.submit')}</Button>
        </View>
      </View>
    </Form>
  );
}
