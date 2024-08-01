type RequestOptions = {
  method: RequestMethod,
  url: string,
  headers?: {[key: string]: string },
  body: any,
}
export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export const makeRequest = (requestData: RequestOptions, type: 'JSON' | 'FormData' = 'JSON'): Promise<{response: any, error: any}> => {
  return new Promise((resolve, reject) => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.API_BASE_URL;
    const {url: path, headers, body, method} = requestData;
    const requestOptions = type === 'JSON' ? {
      method,
      credentials: 'include' as RequestCredentials,
      headers: {
        ...(headers || {}),
        'Content-Type': 'application/json'
      }
    } : {method, credentials: 'include' as RequestCredentials, body, headers}
    if(method !== 'GET') {
      if (type === 'JSON') {
        requestOptions.body = JSON.stringify(body)
      } else {
        requestOptions.body = body
      }
    }
    console.log({requestOptions})
    const url = new URL(`${apiBaseUrl}/${path}`).href
    // try {
      fetch(url, {...requestOptions, credentials: 'include'})
      .then(res => res.json())
      .then((response) => {
        console.log({response})
        if(response.success){
          resolve({response, error: response.error})
        } else {
          reject({response, error: response.error})
        }
      })
      .catch(error => {
        console.log({error})
        reject(error)
      })
      // const res = fetch(url, {...requestOptions, credentials: 'include'})
      // console.log({res})
      // const response = res.json()
      // return {response, error: response.error}
    // } catch (error: any) {
    //   console.log({error});
    //   reject({response: null, error})
    // }
  });
  
}