import { useState, useEffect } from 'react';
import { db } from "../firebase/config";
import { doc, getDoc } from 'firebase/firestore';
//import { querystring } from '@firebase/util';

export const useFetchSingleDocument = (docCollection: any, id: any) => {
    const [document, setDocument] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<any>();

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument() {
            if (cancelled) return;

            setLoading(true);

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());
                setLoading(false);
            } catch (error: any) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }


        }
        loadDocument();

    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
};