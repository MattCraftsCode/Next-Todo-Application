'use client'

import TodoList from '@/components/TodoList'
import { useTitle } from 'ahooks'
import store from '../store/index'
import { Provider } from 'react-redux'

type ITodoItem = {
  id: number
  name: string
  completed: boolean
}

export default function Home() {
  const title = 'Todo Application(Preview)'
  useTitle(title)

  return (
    <div className="w-1/2 m-auto">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-center mt-20 mb-6">{title}</h1>
        <Provider store={store}>
          <TodoList />
        </Provider>
      </div>
    </div>
  )
}
