import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { pb } from "../services/pb"

function Todo({id}){
        const [todoname, setTodoname] = useState('')
    const [todos, setTodos] = useState([])
    const [trigger, setTrigger] = useState(0)
    useEffect(() => {
        pb.collection('todos').getFullList({filter: pb.filter("list = {:id}", {id: id})}).then((res:any) => setTodos(res))


        return () => setTodos([]);
    },[trigger])

    const changeState = (e) => {
        const data = {
            active: !e.target.checked
        }
        pb.collection('todos').update(e.target.name, data)
        e.target.parentNode?.classList.toggle("line-through");
    }

    const handleCreate = (e) => {
        e.preventDefault()

        const data = {
            todo: todoname,
            active: true,
            list: id
        }

        pb.collection('todos').create(data)
        setTodoname('')
        setTrigger(trigger + 1)
    }
    
    return(
        <div className="flex flex-col gap-[1rem]">
        {todos.map((todo) => (
            <p className={todo.active ? "p-2 bg-white text-black rounded-sm" : "p-2 bg-white text-black rounded-sm line-through"} >{todo.todo} <input onChange={changeState} type="checkbox" name={todo.id} id="" defaultChecked={!todo.active} /></p>
        ))}
        <form className="flex gap-2" onSubmit={handleCreate}>
            <input className="border" type="text" name="name" onChange={(e) => setTodoname(e.target.value)} value={todoname} />
            <button type="submit" className="text-center w-fit px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">Add</button>
        </form>
        </div>
    )
}

export default Todo