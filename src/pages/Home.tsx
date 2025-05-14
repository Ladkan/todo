import { LogOut, pb } from "../services/pb"

function Home(){

    const logout = async () => {
        const data = await LogOut();
    }

    return(
        <>
            <h1>Home</h1>
            <button onClick={logout}>LogOut</button>
        </>
    )
}

export default Home