import PocketBase from "pocketbase"
export const pb = new PocketBase("http://127.0.0.1:8090/");

pb.autoCancellation(false)

export async function getMyLists() {
    const data = await pb.collection("todolists").getFullList({
        sort: '-created'
    })
    return data
}

export async function getMyListTodos(id:string){
    const data = await pb.collection('todos').getFullList({filter: pb.filter("list = {:id}", {id: id})})
    return data
}

export async function Auth(name:string, passwd: string){
    await pb.collection("users").authWithPassword(name, passwd);
    return pb.authStore.isValid
}

export async function LogOut(){
    pb.authStore.clear()
    return pb.authStore.isValid
}