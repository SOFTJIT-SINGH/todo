'use client'

import { useState } from 'react'

export interface TodoItem {
  _id: string;
  title: string;
  desc: string;
}

const Todoadd = ({ todos: initialtodos }: { todos: TodoItem[] }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [editid, setEditid] = useState<string | null>(null)
  const [todos, setTodos] = useState(initialtodos)

  async function addtodo() {
    if (editid) {
      const res = await fetch(`http://localhost:3000/api/todo/${editid}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, desc })
      })

      if (!res.ok) {
        console.log("cant edit")
        alert("cant edit")
        return
      }

      alert("Todo Edited")
      const data = await res.json()
      setEditid(null)
      setTitle("")
      setDesc("")
      setTodos((prev) => prev.map((todo) => todo._id === editid ? data.data : todo))
    }
    else {
      const res = await fetch('http://localhost:3000/api/todo', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc,
        }),
      })

      if (!res.ok) {
        console.log('Creating failed')
        return
      }

      alert("Todo Created")
      const data = await res.json()
      setTodos((prev: TodoItem[]) => [...prev, data])
      console.log(data)
      setTitle('')
      setDesc('')
    }
  }

  async function deletetodo(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      console.log('delete failed')
      return
    }
    alert("Todo Deleted")

    setTodos((prev: TodoItem[]) => prev.filter((todo: TodoItem) => todo._id != id))
  }

  async function edittodo(todo: TodoItem) {
    setTitle(todo.title)
    setDesc(todo.desc)
    setEditid(todo._id)
  }

  return (
    <div>
      <h1>{editid ? "Edit Todo" : "Create Todo"}</h1>
      <form action={addtodo}>
        <input
          type='text'
          value={title}
          placeholder='Enter Title..'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          value={desc}
          placeholder='Enter Description..'
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type='submit'>{editid ? "Edit Todo" : "Create Todo"}</button>
      </form>

      {todos.map((todo: TodoItem) => (
        <div
          className='flex my-2 bg-gray-200 justify-between p-2'
          key={todo._id}
        >
          <div className=''>
            <p>{todo.title}</p> <br />
            <p>{todo.desc}</p>
          </div>

          <button onClick={() => deletetodo(todo._id)}>Delete</button>
          <button onClick={() => edittodo(todo)}>Edit</button>
        </div>
      ))}
    </div>
  )
}
export default Todoadd
