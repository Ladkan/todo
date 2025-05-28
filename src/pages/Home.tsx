import { useState } from "react";
import { deleteList, getMyLists, pb } from "../services/pb"
import Todo from "../components/Todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RecordModel } from "pocketbase";
import { Trash } from "lucide-react";


    function useLists(){
        return useQuery({ queryKey: ['todolist'], queryFn: async (): Promise<Array<RecordModel>> => {
            const response = await getMyLists();
            return response
        },})
    }

    function cretaeList(data:any){
        const res = pb.collection('todolists').create(data);
        return res
    }

function Home(){

    const {mutate} = useMutation({
        mutationFn: cretaeList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todolist']})
        },
    })

    const mutate_delete = useMutation({
        mutationFn: deleteList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todolist']})
        },
    })

    const [listname, setListname] = useState('');
    const handleCreateList = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = {
            name: listname,
            owner: pb.authStore.record?.id
        };
        mutate(data)
        setListname('');
    }
    const queryClient = useQueryClient();
    const {status, data, error, isFetching} = useLists()

    return(
        <div className="flex flex-col">
            <form id="create-form" className="bg-zinc-800 text-white p-4 rounded-sm m-4 flex justify-center" onSubmit={handleCreateList}>
                <input value={listname} onChange={(e) => setListname(e.target.value)} type="text" name="name" placeholder="Name" className="outline-none"/>
                <button type="submit" className="text-center w-fit px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">Create List</button>
            </form>
            <div className="flex flex-wrap justify-center gap-5">
            <>
            {
                data?.map((list) => (
                    <div className="bg-zinc-800 p-4 rounded-sm h-min">
                        <div className="flex gap-2 items-center">
                            <h2 className="text-2xl pb-2">{list.name}</h2>
                            <span onClick={() => mutate_delete.mutate(list.id)}><Trash size={20} /></span>
                        </div>
                        <Todo id={list.id} />
                    </div>
                ))
            }
            </>
            </div>

        </div>
    )
}

export default Home