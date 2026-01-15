import axios from 'axios'

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options))
  return instance
}

//export const todos = create(`${import.meta.env.VITE_APP_API_URL}todos/`)
export const todos = create('http://localhost:5001/todos/')
