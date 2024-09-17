import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import { makeRequest, type RequestMethod } from "~/helpers/fetch";
import type { User } from "~/types/user.types";
import { toast } from "@neoncoder/vuetify-sonner";

type AuthRequestOptions = {
  url: string
  method?: RequestMethod
  data?: any, 
  type?: 'JSON' | 'FormData'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<RemovableRef<User> | null>(useLocalStorage<User>("user", null))
  const csrfToken = ref<RemovableRef<string> | null>(useLocalStorage<string>("csrfToken", null))
  // const accessToken = ref<RemovableRef<string> | null>(useLocalStorage<string>("accessToken", null))
  // const refreshToken = ref<RemovableRef<string> | null>(useLocalStorage<string>("refreshToken", null));
  const accessToken = useCookie('accessToken')
  const refreshToken = useCookie('refreshToken')
  const makeAuthenticatedRequest = ({url, method = 'GET', data = {}, type = 'JSON'}: AuthRequestOptions, showToast: boolean = true): Promise<{response: any, error: any}> => {
    return new Promise(async (resolve, reject) => {
      const headers = { authorization:  `Bearer ${accessToken.value}`}
      try {   
        if(['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)){
          if(data instanceof FormData && csrfToken.value){
            data.append('csrfToken', csrfToken.value)
          } else {
            data.csrfToken = csrfToken.value
          }
        }
        const {error, response} = await makeRequest({url, body: data, method, headers}, type)
        if(response?.newAccessToken) accessToken.value = response.newAccessToken
        if(['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)){
          if (showToast) {
            if(response?.success) {
              toast.success(response.message)
            } else {
              toast.error(response.message)
            }
          }
        }
        if(response.success){
          resolve({response, error})
        } else {
          reject({response, error})
        }
      } catch (err: any) {
        console.log({err})
        const {response} = err
        if(showToast){
          if(response){
            if(['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)){
              toast.error(response.message)
            }
          } else {
            toast.error(err.message)
          }
        }
        reject(err)
      }
    });
  }
  const login = async (data: any, type: 'Email' | 'Username' | 'Phone' = 'Email') => {
    const url = `api/v1/auth/login/${type.toLowerCase()}`
    const {error, response} = await makeRequest({url, body: data, method: 'POST'})
    if(response.success) {
      const { meta, user: fetchedUser} = response.data
      if(meta){
        accessToken.value = meta.accessToken
        refreshToken.value = meta.refreshToken
        csrfToken.value = meta.csrfToken
      }
      user.value = fetchedUser;
    }
    return {error, response}
  }
  const logout = () => {
    return new Promise<{response: any, error: any}>((resolve, reject) => {
      makeAuthenticatedRequest({url: 'api/v1/auth/logout'}).then(result => {
        accessToken.value = null
        refreshToken.value = null
        csrfToken.value = null
        user.value = null;
        resolve(result)
      }).catch(error => reject(error))
    })
  }

  const getUserIfLoggedIn = async () => {
    const {response, error} = await makeAuthenticatedRequest({ url: 'api/v1/auth/me' })
    if(response.success){
      const { meta, user: fetchedUser} = response.data
      if(meta){
        accessToken.value = meta.accessToken
        refreshToken.value = meta.refreshToken
        csrfToken.value = meta.csrfToken
      }
      user.value = fetchedUser;
    }
  }

  const userRoles = computed(() => {
    if(user.value){
      return user.value.roles?.map(({name}) => name)
    }
    return []
  })
  return {
    user,
    login,
    logout,
    makeAuthenticatedRequest,
    getUserIfLoggedIn,
    userRoles,
    accessToken,
    refreshToken,
    csrfToken
  }
})