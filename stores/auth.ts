import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import { makeRequest, type RequestMethod } from "~/helpers/fetch";
import type { User } from "~/types/user.types";
import { toast } from "@neoncoder/vuetify-sonner";

type AuthRequestOptions = {
  url: string
  method: RequestMethod
  data: any, 
  type?: 'JSON' | 'FormData'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<RemovableRef<User> | null>(useLocalStorage<User>("user", null))
  const csrfToken = ref<RemovableRef<string> | null>(useLocalStorage<string>("csrfToken", null))
  const accessToken = ref<RemovableRef<string> | null>(useLocalStorage<string>("accessToken", null))
  const refreshToken = ref<RemovableRef<string> | null>(useLocalStorage<string>("refreshToken", null));
  const makeAuthenticatedRequest = async ({url, method, data, type = 'JSON'}: AuthRequestOptions) => {
    const headers = { authorization:  `Bearer ${accessToken.value}`}
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
      if(response?.success) {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    }
    return {error, response}
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
  const logout = async () => {
    console.log('Logout')
  }
  return {
    user,
    login,
    makeAuthenticatedRequest,
    accessToken,
    refreshToken,
    csrfToken
  }
})