import * as dotenv from 'dotenv';
import { defineConfig } from 'orval';
dotenv.config();

const OPENAPI_URL = process.env.OPENAPI_URL!;
const API_BASE_URL = process.env.API_BASE_URL || '';

if (!OPENAPI_URL) throw new Error('OPENAPI_URL is not set');

export default defineConfig({
  // Client-side: TanStack Query hooks using Axios
  clientAxiosRQ: {
    input: { target: OPENAPI_URL },
    output: {
      target: 'lib/api/gen/client/petstore.ts',
      schemas: 'lib/api/gen/client/models',
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split', // 1 folder per service (OpenAPI tag)
      clean: true,
      prettier: true,
      baseUrl: API_BASE_URL,
      override: {
        mutator: {
          path: 'lib/api/mutators/axiosInstance.ts',
          name: 'axiosInstance',
        },
        query: {
          // sensible react-query defaults
          useQuery: true,
          useInfinite: false,
          options: { staleTime: 30_000, gcTime: 5 * 60_000 },
        },
      },
      // ensure the generated call signatures include the `options` param
      optionsParamRequired: true,
    },
  },

  // Server-side: raw fetch functions for SSG/SSR
  // (we’ll wrap them to add Next.js tags)
  serverFetch: {
    input: { target: OPENAPI_URL },
    output: {
      target: 'lib/api/gen/server/petstore.ts',
      schemas: 'lib/api/gen/server/models',
      client: 'fetch',
      mode: 'tags-split',
      clean: true,
      prettier: true,
      baseUrl: API_BASE_URL,
      // use a custom Next-aware fetch mutator
      // (adds headers; **wrappers** will add tags/revalidate)
      override: {
        mutator: { path: 'lib/api/mutators/basicFetch.ts', name: 'basicFetch' },
        fetch: {
          includeHttpResponseReturnType: false,
        },
      },
      optionsParamRequired: true,
    },
    // Run our small post-step to auto-generate SSG/SSR wrappers with tags
    hooks: { afterAllFilesWrite: 'node scripts/generate-ssg-wrappers.cjs' },
  },
});
