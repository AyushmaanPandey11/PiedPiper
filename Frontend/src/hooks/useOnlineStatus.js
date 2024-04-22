import { useState, useEffect } from "react";
const UseOnlineStatus = () => {
    const [onlinestatus, setOnlineStatus] = useState(true);
    useEffect( ()=> {
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        })
        window.addEventListener("online", () =>{
            setOnlineStatus(true);
        } )
    },[]);
    return onlinestatus;
};
export default UseOnlineStatus;