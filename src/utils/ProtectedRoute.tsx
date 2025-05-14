import { Navigate, Outlet } from "react-router-dom";
import { pb } from "../services/pb";

function ProtectedRoute(){
    return pb.authStore.isValid ? <Outlet /> : <Navigate to={"/login"}  />
}

export default ProtectedRoute