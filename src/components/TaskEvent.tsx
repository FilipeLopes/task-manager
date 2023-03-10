import { useEffect, useRef, useState } from "react";
import "./TaskEvent.css";


type Props = {
    taskModal: (value: any) => void;
    modalDisplay: any;
}

const TaskEvent = ({ taskModal, modalDisplay }: Props) => {
    const [taskName, setTaskName] = useState<string>();

    const refModal = useRef<HTMLDivElement>(null);

    const handleNewTask = (e: any) => {
        e.preventDefault();
        const start = new Date();
        console.log(taskName, start);
    }

    useEffect(() => {
        if (refModal.current) {
            refModal.current.style.display = modalDisplay;
        }
    }, [modalDisplay]);

    return (
        <div id="modal" className="modal" ref={refModal}>
            <div className="modal-content">
                <span className="close" onClick={() => taskModal("none")}>&times;</span>
                <h2>Create a new task</h2>
                <p>Define a new task to work with...</p>
                <form onSubmit={handleNewTask}>
                    <label>
                        <span>Task name: </span>
                        <input type="text" name="taskName" required placeholder="Type the task name" onChange={(e) => setTaskName(e.target.value)} value={taskName || ""} />
                    </label>
                    <button className="btn">Confirm</button>
                </form>
            </div>
        </div >
    )
}

export default TaskEvent