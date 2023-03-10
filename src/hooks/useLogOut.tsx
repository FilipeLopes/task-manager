//Firebase
import { authFire } from "../firebase/config";
import { signOut } from "firebase/auth";

//Import hooks from react
import { useState, useEffect } from "react";


export const useLogOut = () => {

    const auth = authFire;

    //cleanup - avoid memory leak
    const [cancelled, setCancelled] = useState(false);


    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { logout };
}