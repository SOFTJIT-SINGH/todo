'use client'

import { POST } from '@/app/api/todo/route'
import { useState } from 'react'

const Todoadd = ({todos : initialtodos}) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [todos,setTodos] = useState(initialtodos)
  async function addtodo() {
    const res = await fetch('http://localhost:3000/api/todo', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        desc,
      }),
    })

    if (!res) {
        console.log("Creating failed")
        return
    }


    const data = await res.json()
    setTodos((prev) => [...prev, data])
    console.log(data)
    setTitle("")
    setDesc("")
  }

   async function deletetodo(id){
    const res = await fetch(`http://localhost:3000/api/todo/${id}`,{
      method : "DELETE"
    })

    if (!res){
        console.log("delete failed")
        return
    }

    setTodos((prev) => prev.filter((todo) => todo._id != id))
  }

  return (
    <div>
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
        <button type='submit'>Submit</button>
      </form>

{todos.map((todo) => (
        <div className="flex my-2 bg-gray-200 justify-between p-2" key={todo._id}>
            <div className=""><p>{todo.title}</p> <br />
          <p>{todo.desc}</p></div>
          
          <button onClick={()=> deletetodo(todo._id)}>Delete</button>
        </div>
      ) )}
          

      
    </div>
  )
}
export default Todoadd
