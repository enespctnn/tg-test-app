import * as dotenv from 'dotenv';
import { defineConfig } from 'orval';
dotenv.config();

const OPENAPI_URL = process.env.OPENAPI_URL!;
const API_BASE_URL = process.env.API_BASE_URL;

if (!OPENAPI_URL) throw new Error('OPENAPI_URL is not set');

if (!API_BASE_URL) throw new Error('API_BASE_URL is not set');

function toCamel(functionName: string) {
  return functionName
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (m) => m.toLowerCase());
}

export default defineConfig({
  clientAxiosRQ: {
    input: { target: OPENAPI_URL },
    output: {
      target: 'lib/api/gen/client/petstore.ts',
      schemas: 'lib/api/gen/client/models',
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      clean: true,
      prettier: true,
      baseUrl: API_BASE_URL,
      override: {
        mutator: {
          path: 'lib/api/mutators/axiosInstance.ts',
          name: 'axiosInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          useInfinite: false,
          options: { staleTime: 30_000, gcTime: 5 * 60_000 },
          shouldExportHttpClient: false,
        },
      },
      optionsParamRequired: true,
    },
  },

  serverFetch: {
    input: {
      target: OPENAPI_URL,
      filters: {
        mode: 'exclude',
        tags: ['user'],
      },
    },
    output: {
      target: 'lib/api/gen/server/petstore.ts',
      schemas: 'lib/api/gen/server/models',
      client: 'fetch',
      mode: 'tags-split',
      clean: true,
      prettier: true,
      baseUrl: API_BASE_URL,
      override: {
        operationName: (op, route, verb) => {
          const base = op.operationId ?? `${verb}-${route}`; // e.g. "get-/pet/findByStatus"
          const camel = toCamel(base); // -> "getPetFindByStatus"
          return `${camel}Server`; // -> "getPetFindByStatusServer"
        },
        mutator: { path: 'lib/api/mutators/basicFetch.ts', name: 'basicFetch' },
        fetch: { includeHttpResponseReturnType: false },
      },
      optionsParamRequired: true,
    },
    hooks: {
      afterAllFilesWrite: 'node scripts/generate-endpoints.cjs',
    },
  },
});
