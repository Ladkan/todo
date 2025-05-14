import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut, pb } from "./services/pb";
import Header from "./components/Header";
import { useEffect } from "react";

function Layout(){

    useEffect(() => {

    },[pb.authStore.isValid])

    return(<>
    {pb.authStore.isValid ? <Header /> : ""}
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <Outlet />
        </div>
    </>)
}

export default Layout