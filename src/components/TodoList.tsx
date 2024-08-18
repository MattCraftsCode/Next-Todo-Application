'use client'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { add } from '@/store/features/todoSlice'
import {
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Checkbox,
  Spacer,
} from '@nextui-org/react'
import { Plus } from 'lucide-react'
import { ITodoItem } from '@/types'
import { remove, change } from '@/store/features/todoSlice'
import clsx from 'clsx'
import { DeleteIcon } from '../app/icons/DeleteIcon'
import { EditIcon } from '../app/icons/EditIcon'
import EmptyState from './EmptyState'

export default function TodoList() {
  const todoItems = useAppSelector(state => state.todo.items)
  const dispatch = useAppDispatch()

  const handleAddItem = () => {
    const name = prompt('请输入名称')
    if (name) {
      dispatch(add(name))
    }
  }

  const handleChangeName = (item: ITodoItem) => {
    const newName = prompt('请输入新的名称?', item.name) || ''
    if (newName) {
      dispatch(change({ id: item.id, name: newName }))
    }
  }

  const handleChangeStatus = (item: ITodoItem) => {
    dispatch(change({ id: item.id, completed: !item.completed }))
  }

  const handleRemove = (item: ITodoItem) => {
    dispatch(remove(item.id))
  }

  return (
    <div className="flex flex-col items-end">
      <div>
        <Button color="success" endContent={<Plus />} onClick={() => handleAddItem()}>
          Add
        </Button>
        <Spacer y={2} />
      </div>
      <Table aria-label="Todo Application">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody items={todoItems} emptyContent={<EmptyState />}>
          {(item: ITodoItem) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  onValueChange={() => {
                    handleChangeStatus(item)
                  }}
                  lineThrough={item.completed}
                  defaultSelected={item.completed}
                  checked={item.completed}
                  size="md"
                  color="success"
                >
                  {item.name}
                </Checkbox>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={item.completed ? 'success' : 'danger'}
                  size="sm"
                  variant="flat"
                >
                  {item.completed ? '已完成' : '进行中'}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="Edit it">
                    <span
                      onClick={() => {
                        handleChangeName(item)
                      }}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete it">
                    <span
                      onClick={() => {
                        handleRemove(item)
                      }}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
