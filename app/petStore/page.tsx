import { findPetsByStatusSSG } from '@/lib/api/ssg';
import PetComp from './_components/PetComp';

async function Page() {
  const pets = await findPetsByStatusSSG({ status: ['pending'] });
  const randomIndex = Math.floor(Math.random() * pets.length);
  console.log(randomIndex);

  return (
    <div>
      {pets[randomIndex].category?.name}
      <div>
        <h2>Pet Comp</h2>
        <PetComp />
      </div>
    </div>
  );
}

export default Page;
