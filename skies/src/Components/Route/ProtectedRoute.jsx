import { Outlet, Navigate } from "react-router-dom";
import { useNote } from "../../Context/NoteContext.jsx";

const ProtectedRoute = ()=>{
    const {isLoggedIn} = useNote()

    if(!isLoggedIn){
        return <Navigate to="/" replace />;
    }

    return<Outlet/>
}

export default ProtectedRoute