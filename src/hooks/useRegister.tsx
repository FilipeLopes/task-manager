//Imports from firebase
import { db, authFire } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//Hooks from react
import { useState, useEffect } from "react";

export const useRegister = () => {
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

    //Register
    const createUser = async (data: any) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);


        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, { displayName: data.displayName });


            setLoading(false);
            //window.location.reload();

            return user;

        } catch (error: any) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage: any

            if (error.message.includes("password")) {
                systemErrorMessage = "Password must contain 6 characters";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email already registered";
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
        createUser,
        error,
        loading
    }
}




