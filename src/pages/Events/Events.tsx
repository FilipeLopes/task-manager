import "./Events.css"
//Context
import { useAuthValue } from "../../context/AuthContext";

//Components
import UpdateModal from "../../components/UpdateModal";

//Hooks
import { useFetchAllEvents } from "../../hooks/useFetchAllEvents";
import { useState } from "react";
import { useDeleteDocument } from "../../hooks/useDeleteEvent";

type Props = {}

const Events = (props: Props) => {

    const { user } = useAuthValue();
    const uid = user.uid;
    const search = "ended";
    const [updateModalDisplay, setUpdateModalDisplay] = useState<any>();
    const [eventId, setEventId] = useState<any>();

    const { documents: tasks, loading } = useFetchAllEvents("tasks", search, uid);

    const { deleteDocument } = useDeleteDocument("tasks");

    const updateModal = (value: any) => {
        setUpdateModalDisplay(value);
    }

    const handleEditEvent = (id: any) => {
        setUpdateModalDisplay("block");
        setEventId(id);
    }

    try {
        if (tasks && tasks[0].start.seconds) {
            tasks.map((task: any) => {
                return (
                    task.start = new Date(task.start.seconds * 1000 + Math.round(task.start.nanoseconds / 1000000)),
                    task.end = new Date(task.end.seconds * 1000 + Math.round(task.end.nanoseconds / 1000000))
                );
            })

        }
    } catch (error) {
        console.log("No events");
    }


    if (loading) {
        <p>Loading...</p>
    }
    return (
        <div className="events">
            {eventId && <UpdateModal updateModal={updateModal} updateModalDisplay={updateModalDisplay} eventId={eventId} />}
            <h1>Events</h1>

            {tasks && tasks.toString() === "" && <p>there is no event created</p>}
            {tasks && tasks.toString() !== "" && <p>Manage your events</p>}

            <table className="list">
                {tasks && tasks.toString() !== "" && (
                    <thead>
                        <tr className="list-item title">
                            <td className="item-name">Name</td>
                            <td className="item-name">Description</td>
                            <td className="item-date">Date Start</td>
                            <td className="item-date">Date End</td>
                            <td className="item-buttons">Actions</td>
                        </tr>
                    </thead>
                )}
                {tasks && tasks.toString() !== "" && (
                    <tbody>
                        {tasks.map((task: any) => (
                            <tr className="list-item" key={task.id}>
                                <td className="item-name">{task.taskName}</td>
                                <td className="item-name">{task.taskDescription.slice(0, 24) + "..."}</td>
                                <td className="item-date">{task.start.toLocaleString({ day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                <td className="item-date">{task.end.toLocaleString({ day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                <td className="item-buttons">
                                    <button className="edit-button" onClick={() => handleEditEvent(task.id)}>Edit</button>
                                    <button className="delete-button" onClick={() => deleteDocument(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>


        </div>
    )
}

export default Events