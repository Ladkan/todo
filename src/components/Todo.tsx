import { useState } from "react"
import { deleteTodo, getMyListTodos, pb } from "../services/pb"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"

    function getTodos(id:string){

        const placeholder = [
            {
                todo: "placeholder",
                active: true,
                id: 123
            }
        ]

        return useQuery({
            queryKey: [`list_${id}`],
            queryFn: async (): Promise<Array<any>> => {
                const res = await getMyListTodos(id)
                return res
            },
            placeholderData: placeholder
        })
    }

    function createTodo(data:any){
        const res = pb.collection('todos').create(data)
        return res
    }

function Todo({id}){
    const queryClient = useQueryClient();
    const [todoname, setTodoname] = useState('')
    const changeState = (e: { target: { checked: any; name: string; parentNode: { classList: { toggle: (arg0: string) => void } } } }) => {
        const data = {
            active: !e.target.checked
        }
        pb.collection('todos').update(e.target.name, data)
        e.target.parentNode?.classList.toggle("line-through");
    }

    const {mutate} = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [`list_${id}`]})
        },
    })

    const mutate_delete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [`list_${id}`]})
        },
    });

    const handleCreate = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const data = {
            todo: todoname,
            active: true,
            list: id
        }

        mutate(data)
        setTodoname('')
    }
    
    const {status, data, error, isFetching} = getTodos(id)

    if(error) return "An error has occurred: " + error.message

    return(
        <div className="flex flex-col gap-[1rem]">
        {/* {todos.map((todo) => (
            <p className={todo.active ? "p-2 bg-white text-black rounded-sm" : "p-2 bg-white text-black rounded-sm line-through"} >{todo.todo} <input onChange={changeState} type="checkbox" name={todo.id} id="" defaultChecked={!todo.active} /></p>
        ))} */}
        <>
        {
            data.map((todo) => (
                <div className="bg-white text-black rounded-sm p-2 flex content-between w-full items-center gap-2">
                    <p className={todo.active ? "" : "line-through"} >{todo.todo}</p>
                    <input onChange={changeState} type="checkbox" name={todo.id} id="" defaultChecked={!todo.active} />
                    <span onClick={() => mutate_delete.mutate(todo.id)} ><Trash size={18} /></span>
                </div>
            ))
        }
        </>
        <form className="flex gap-2" onSubmit={handleCreate}>
            <input className="border-none outline-none" placeholder="Text" type="text" name="name" onChange={(e) => setTodoname(e.target.value)} value={todoname} />
            <button type="submit" className="text-center w-fit px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">Add</button>
        </form>
        </div>
    )
}

export default Todo