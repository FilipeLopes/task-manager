//Firebase
import { authFire } from "../firebase/config";
import { updateProfile } from "firebase/auth";

//Hooks
import { useState, useEffect } from "react";

export const useProfileUpdate = () => {
    const [error, setError] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>();

    //Clean up - avoid memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = authFire;

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    //Update
    const updateUser = async (data: any) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);


        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: data.name.toLowerCase() });
            }

            setLoading(false);

        } catch (error: any) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage: any

            if (error.message.includes("password")) {
                systemErrorMessage = "Password must contain 6 characters";
            } else {
                systemErrorMessage = "An error has been ocurred. Please, try again later.";
            }
            setLoading(false);
            setError(systemErrorMessage);
        }

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        updateUser,
        error,
        loading
    }
}


