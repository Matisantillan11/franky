import ModalScreenNodge from '~/components/modal-screen-nodge';
import FormComposition from './components/form/form-composition';

type Props = {
  initialAmount?: string;
  initialCategoryName?: string;
};

export default function AddTransactionScreen({ initialAmount, initialCategoryName }: Props) {
  return (
    <>
      <ModalScreenNodge />
      <FormComposition initialAmount={initialAmount} initialCategoryName={initialCategoryName} />
    </>
  );
}
