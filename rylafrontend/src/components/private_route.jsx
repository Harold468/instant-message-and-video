import { Navigate, Outlet } from "react-router-dom";

export default function Private_Route({user}){
    return(
        <>
        {
            user !==''?
            <Outlet/>
            :
            <Navigate to='/'/>
        }
        </>
    );
}