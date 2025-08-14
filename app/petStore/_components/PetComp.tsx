'use client';

import { useFindPetsByStatus } from '@/lib/api/gen/client/pet/pet';

function PetComp() {
  const { data } = useFindPetsByStatus(
    {
      status: ['available'],
    }
    // { query: { enabled: false } }
  );

  if (!data) return <div>Nothing found</div>;

  return <div>{data[0].category?.name}</div>;
}

export default PetComp;
