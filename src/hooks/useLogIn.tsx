//import firebase
import { authFire } from "../firebase/config";
import { signInWithEmailAndPassword } from 'firebase/auth';
//import hooks react
import { useState, useEffect } from 'react';

export const useLogIn = () => {
    const [error, setError] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>();

    //cleanup - avoid memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = authFire;

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }
    const login = async (data: any) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
        } catch (error: any) {
            let systemErrorMessage: any;
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found.";

            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Wrong password.";
            } else {
                systemErrorMessage = "An error has been ocurred. Please, try again later.";
            }
            setError(systemErrorMessage);
            setLoading(false);
        }


    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        login,
        error,
        loading
    }
}