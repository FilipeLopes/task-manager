import { useEffect, useRef } from "react";
import "./EventModal.css";
import { useFetchSingleDocument } from "../hooks/useFetchSingleEvent";

type Props = {
    eventModal: (value: any) => void;
    eventModalDisplay: any;
    eventId: any;
}

const EventModal = ({ eventModal, eventModalDisplay, eventId }: Props) => {

    const refModal = useRef<HTMLDivElement>(null);

    const { document: event, loading } = useFetchSingleDocument('tasks', eventId);

    useEffect(() => {
        if (refModal.current) {
            refModal.current.style.display = eventModalDisplay;
        }
    }, [eventModalDisplay]);

    if (loading) {
        <p>Loading...</p>
    }

    return (
        <div id="modal" className="modal" ref={refModal}>
            <div className="modal-content">
                <span className="close" onClick={() => eventModal("none")}>&times;</span>
                <h2>Event Details</h2>
                <p>Check details from your event...</p>

                {event &&
                    <form>
                        <label>
                            <span>Name:</span>
                            <input type="text" name="title" disabled value={event && event.taskName} />
                        </label>
                        <label>
                            <span>Description:</span>
                            <textarea name="description" rows={5} disabled value={event && event.taskDescription} />
                        </label>
                    </form>
                }



            </div>
        </div >
    )
}

export default EventModal