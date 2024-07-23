type RequestOptions = {
  method: RequestMethod,
  url: string,
  headers?: {[key: string]: string },
  body: any,
}
export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export const makeRequest = async (requestData: RequestOptions, type: 'JSON' | 'FormData' = 'JSON') => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.API_BASE_URL;
  const {url: path, headers, body, method} = requestData;
  const requestOptions = type === 'JSON' ? {
    method,
    body: JSON.stringify(body),
    headers: {
      ...(headers || {}),
      'Content-Type': 'application/json'
    }
  } : {method, body, headers}
  const url = new URL(`${apiBaseUrl}/${path}`).href
  try {
    const res = await fetch(url, {...requestOptions, credentials: 'same-origin'})
    const response = await res.json()
    return {response, error: response.error}
  } catch (error: any) {
    console.log({error});
    return {response: null, error}
  }
}