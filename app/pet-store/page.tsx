import { findPetsByStatusServer } from '@/lib/api/gen/server/pet/pet';
import PetComp from './_components/PetComp';

async function Page() {
  const pets = await findPetsByStatusServer({ status: ['available'] });

  const randomIndex = Math.floor(Math.random() * pets.length);
  console.log({ randomIndex, pets });
  return (
    <div className="space-y-4">
      <h1 className="text-3xl">
        Sold Pet: {pets.length > 0 && pets[randomIndex].category?.name}
      </h1>
      <div>
        <h2>Pet Comp</h2>
        <PetComp />
      </div>
    </div>
  );
}

export default Page;
