export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
  
    const items: Array<T> = await $fetch(`${config.public.API_URL}/missoes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.public.API_TOKEN
      }
    })
  
    return items.slice(2);
  })