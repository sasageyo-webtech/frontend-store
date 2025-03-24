type useFetchType = typeof useFetch

export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()

  options.baseURL = config.public.baseUrl + '/api'
  return useFetch(path, options)
}