import { useEffect, useState } from 'react';
import { HomeScreen } from '~/components/screens';
import { categoriesRepository, type Category } from '~/libs';

export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesRepository.findAll().then(setCategories);
  }, []);

  return <HomeScreen categories={categories} />;
}
