import { todos } from "."

export function getTodos(params) {
  return todos.get('/', { params })
}

export function getTodoById(id) {
  return todos.get(`${id}`)
}

export function createTodo(data) {
  return todos.post('', data)
}

export function updateTodo(id, data) {
  return todos.patch(`${id}`, data)
}

export function deleteTodo(id) {
  return todos.delete(`${id}`)
}
