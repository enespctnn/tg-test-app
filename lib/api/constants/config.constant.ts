// lib/api/constants/endpoint-config.ts
import { EndpointEnum } from '../enums/endpoint.enum';

export const configs: Partial<Record<EndpointEnum, RequestInit>> = {
  [EndpointEnum.PetFindByStatus]: {
    next: { tags: ['petStatusOnDemand'] },
  },
};
