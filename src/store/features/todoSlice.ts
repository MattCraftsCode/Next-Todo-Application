import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodoItem } from '../../types/index'
import { nanoid } from 'nanoid'

export interface TodoState {
  items: ITodoItem[]
}

const initialState: TodoState = {
  items: [
    { id: '1', name: '国际化', completed: false },
    { id: '2', name: 'Modal 添加 & 修改任务', completed: false },
    { id: '3', name: '用户登录 SSO 登录', completed: false },
    { id: '4', name: 'Table 列宽的固定', completed: false },
    { id: '5', name: '任务优先级', completed: false },
    { id: '6', name: '任务分日期', completed: false },
    { id: '7', name: '数据持久化到 MySQL', completed: false },
    { id: '8', name: 'vscode 保存格式化', completed: true },
    {
      id: '9',
      name: '部署到 vercel & 体验 vercel 自动部署的过程',
      completed: false,
    },
    {
      id: '10',
      name: '部署到自己的服务器',
      completed: false,
    },
  ],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state: TodoState, action: PayloadAction<string>) => {
      state.items.push({
        id: nanoid(5),
        name: action.payload,
        completed: false,
      })
    },
    remove: (state: TodoState, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    change: (state: TodoState, action: PayloadAction<Partial<ITodoItem>>) => {
      const id = action.payload.id
      if (!id) return
      const item = state.items.find(i => i.id === id)

      if (!item) return

      if (action.payload.name !== undefined) {
        item.name = action.payload.name
      }

      if (action.payload.completed !== undefined) {
        item.completed = action.payload.completed
      }
    },
  },
})

export const { add, remove, change } = todoSlice.actions

export default todoSlice.reducer
