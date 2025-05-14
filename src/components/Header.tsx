import { Link, useNavigate } from "react-router-dom";
import { LogOut, pb } from "../services/pb";
import { useEffect } from "react";

function Header(){

    let nav = useNavigate();
    const logout = async () => {
        const data = await LogOut();
        if(!data){
            nav("/login")
        }
    }

    return(
        <>
            <header className='flex shadow-md py-4 px-4 sm:px-10 bg-neutral-800 font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
                <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                    <Link to={"/"}>Todo</Link>
                    <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-neutral-800 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                        <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                            <Link to={"/"} className="hover:text-[#007bff] text-white block font-semibold text-[15px]">Home</Link>
                        </li>
                    </ul>
                    <div className="flex max-lg:ml-auto space-x-3">
                        <button onClick={logout} className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">Logout</button>
                    </div>
                </div>
            </header>
        </>
    )

}

export default Header