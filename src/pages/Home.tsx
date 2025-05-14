import { useEffect, useState } from "react";
import { pb } from "../services/pb"
import Todo from "../components/Todo";

function Home(){

    const [lists, setLists] = useState([])
    const [trigger_create, setTriggerCreate] = useState(0)
    useEffect(() => {
        pb.collection("todolists").getFullList({ sort: '-created' }).then((res:any) => setLists(res));
    },[trigger_create])
    const [listname, setListname] = useState('');
    const handleCreateList = (e) => {
        e.preventDefault();

        const data = {
            name: listname,
            owner: pb.authStore.record?.id
        };

        pb.collection('todolists').create(data);
        setListname('');
        setTriggerCreate(trigger_create + 1)
    }

    return(
        <div className="flex flex-col">
            <form id="create-form" className="bg-zinc-800 text-white p-4 rounded-sm m-4 flex justify-center" onSubmit={handleCreateList}>
                <input value={listname} onChange={(e) => setListname(e.target.value)} type="text" name="name" placeholder="Name" className="rounded-sm"/>
                <button type="submit" className="text-center w-fit px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">Create List</button>
            </form>
            <div className="flex flex-wrap justify-center gap-5">
{
                lists.map((list) => (
                <div className="bg-zinc-800 p-4 rounded-sm h-min">
                    <h2 className="text-2xl pb-2">{list.name}</h2>
                    <Todo id={list.id} />
                </div>
            ))
            }
            </div>

        </div>
    )
}

export default Home