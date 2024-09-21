import ItemForm from '@/components/ItemForm';

export default function CreateItem() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Item</h1>
      <ItemForm />
    </div>
  );
}
