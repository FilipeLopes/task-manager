import { useState, useEffect } from 'react';
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
//import { querystring } from '@firebase/util';

export const useFetchAllEvents = (docCollection: any, search = null, uid = null) => {
    const [documents, setDocuments] = useState<any>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<any>(null);

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadData() {
            if (cancelled) return;

            setLoading(true);
            const collectionRef = await collection(db, docCollection);
            try {
                let q;

                //busca
                //dashboard

                q = await query(collectionRef, where("uid", "==", uid), where("end", "==", ""), orderBy("createdAt", "desc"));

                await onSnapshot(q, (QuerySnapshot: any) => {
                    setDocuments(
                        QuerySnapshot.docs.map((doc: any) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )

                });

                setLoading(false);
            } catch (error: any) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }


        }
        loadData();

    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};