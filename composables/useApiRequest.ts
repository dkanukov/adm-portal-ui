import { useFetch, useRuntimeConfig } from "nuxt/app"

export const useApiRequest: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig()

  return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}
