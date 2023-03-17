import { useEffect, useRef, useState } from "react";
import "./EventModal.css";
import { useFetchSingleDocument } from "../hooks/useFetchSingleEvent";
import { useFetchGithubCommits } from "../hooks/useFetchGithubCommits";

type Props = {
    eventModal: (value: any) => void;
    eventModalDisplay: any;
    eventId: any;
}

const EventModal = ({ eventModal, eventModalDisplay, eventId }: Props) => {
    const [commits, setCommits] = useState<any>()
    const refModal = useRef<HTMLDivElement>(null);

    const { document: event, loading } = useFetchSingleDocument('tasks', eventId);

    const { fetchCommit } = useFetchGithubCommits();

    useEffect(() => {
        if (event) {
            fetchCommit(event.gitUrl).then((data) => setCommits(data));
        }
    }, [event])

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
                <span className="close" onClick={() => { eventModal("none") }}>&times;</span>
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
                            <input type="text" name="description" disabled value={event && event.taskDescription} />
                        </label>
                        {commits &&
                            <label>
                                <span>Commits:</span>
                                <textarea name="commits" rows={10} disabled
                                    value={commits && commits.map((commit: any) => (
                                        `${commit.commit.message}\n`
                                    ))}
                                ></textarea>
                            </label>}
                    </form>
                }



            </div >
        </div >
    )
}

export default EventModal