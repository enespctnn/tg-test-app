'use client';

import React from 'react';
import { useFindPetsByStatus } from '@/lib/api/gen/client/pet/pet';

function PetComp() {
  const { data, isLoading } = useFindPetsByStatus({
    status: ['pending'],
  });

  // React.useEffect(() => {
  //   if (!isLoading) {
  //     queryClient.invalidateQueries({
  //       queryKey: getFindPetsByStatusQueryKey({
  //         status: ['pending'],
  //       }),
  //     });
  //   }
  // }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  else if (!data || data.length <= 0) return <div>Nothing found</div>;

  return <div>{data.length > 0 && data[0].category?.name}</div>;
}

export default PetComp;
