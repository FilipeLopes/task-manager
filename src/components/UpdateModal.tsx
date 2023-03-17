import "./UpdateModal.css"

//Hooks
import { useRef, useEffect, useState } from "react";
import { useFetchSingleDocument } from "../hooks/useFetchSingleEvent";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

type Props = {
    updateModal: (value: any) => void;
    updateModalDisplay: any;
    eventId: any;
}

const UpdateModal = ({ updateModal, updateModalDisplay, eventId }: Props) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [dateStart, setDateStart] = useState<any>();
    const [dateEnd, setDateEnd] = useState<any>();

    const refModal = useRef<HTMLDivElement>(null);

    const { document: event, loading } = useFetchSingleDocument('tasks', eventId);
    const { updateDocument } = useUpdateDocument("tasks");

    const handleUpdate = (e: any) => {
        e.preventDefault();

        const data = {
            end: new Date(dateEnd),
        }
        updateDocument(eventId, data);
        updateModal("none");
    }

    function convertData(data: any) {
        const year = data.getFullYear();
        const month = String(data.getMonth() + 1).padStart(2, '0');
        const day = String(data.getDate()).padStart(2, '0');
        const hour = String(data.getHours()).padStart(2, '0');
        const minutes = String(data.getMinutes()).padStart(2, '0');
        const formDate = `${year}-${month}-${day}T${hour}:${minutes}`;
        return formDate;
    }

    if (loading) {
        <p>Loading...</p>
    }

    useEffect(() => {
        if (event) {
            setName(event.taskName);
            setDescription(event.taskDescription);
            setDateStart(convertData(new Date(event.start.seconds * 1000 + Math.round(event.start.nanoseconds / 1000000))));
            setDateEnd(convertData(new Date(event.end.seconds * 1000 + Math.round(event.end.nanoseconds / 1000000))));
        }
    }, [event]);

    useEffect(() => {
        if (refModal.current) {
            refModal.current.style.display = updateModalDisplay;
        }
    }, [updateModalDisplay]);

    return (
        <div id="modal" className="modal" ref={refModal}>
            <div className="modal-content">
                <span className="close" onClick={() => updateModal("none")}>&times;</span>
                <h2>Edit event</h2>
                <p>Edit your event...</p>
                <form onSubmit={handleUpdate}>
                    <label>
                        <input type="text" name="name" disabled onChange={(e) => setName(e.target.value)} value={name || ""} />
                    </label>
                    <label>
                        <input type="text" name="description" disabled onChange={(e) => setDescription(e.target.value)} value={description || ""} />
                    </label>
                    <label>
                        <input type="datetime-local" name="dateStart" disabled onChange={(e) => setDateStart(e.target.value)} value={dateStart || ""} />
                    </label>
                    <label>
                        <input type="datetime-local" name="dateEnd" onChange={(e) => setDateEnd(e.target.value)} value={dateEnd || ""} />
                    </label>
                    <button className="btn">Update</button>
                </form>

            </div>
        </div >
    )
}

export default UpdateModal