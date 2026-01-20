import axios from 'axios'
import { isRef, ref, unref, watchEffect } from 'vue'

axios.defaults.baseURL = 'http://localhost:5001/'

const defaultConfig = {
  method: 'GET',
}

const defaultOption = {
  immediate: true,
}

export const useAxios = (url, config = {}, option = {}) => {
  const data = ref(null)
  const response = ref(null)
  const totalCount = ref(0)

  // Loading
  const error = ref(null)
  const loading = ref(false)

  const { params } = config

  const { onSuccess, onError, immediate } = {
    ...defaultOption,
    ...option,
  }

  // watch
  const execute = (body) => {
    data.value = null
    error.value = null
    loading.value = true
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {},
    })
      .then((res) => {
        console.log('call useAxios')
        
        totalCount.value = res.data.items;
        data.value = res.data.data
        response.value = res

        if (onSuccess) {
          onSuccess(res)
        }
      })
      .catch((err) => {
        error.value = err

        if (onError) {
          onError(err)
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  if (isRef(params) || isRef(url)) {
    watchEffect(execute)
  } else {
    if (immediate) {
      execute()
    }
  }

  return { totalCount, data, error, loading, response, execute }
}
