import "./TaskEvent.css";

//Hooks
import { useEffect, useRef, useState } from "react";
import { useInsertEvent } from "../hooks/useInsertEvent";
import { useNavigate } from "react-router-dom";

//Context
import { useAuthValue } from "../context/AuthContext";


type Props = {
    taskModal: (value: any) => void;
    modalDisplay: any;
}

const TaskEvent = ({ taskModal, modalDisplay }: Props) => {
    const [taskName, setTaskName] = useState<string>();
    const [taskDescription, setTaskDescription] = useState<string>();
    const [gitUrl, setGitUrl] = useState<string>("");
    const [color, setColor] = useState<any>("#3788d8");

    const refModal = useRef<HTMLDivElement>(null);
    const [formError, setFormError] = useState<string>("");

    //Create "user" object with logged user data
    const { user } = useAuthValue();

    //Calls my hook
    const { insertEvent, response } = useInsertEvent("tasks");

    //create function navigate
    const navigate = useNavigate();

    const handleNewTask = (e: any) => {
        e.preventDefault();
        setFormError("");

        //Check values
        if (!taskName || !taskDescription) {
            setFormError("Please, fill all fields!");
        }

        if (formError) return;

        insertEvent({
            taskName,
            taskDescription,
            gitUrl,
            isActive: false,
            start: "",
            end: "",
            color,
            uid: user.uid,
            createdBy: user.email
        })


        setTaskName("");
        setTaskDescription("");
        setGitUrl("");
        setColor("#3788d8");
        taskModal("none");
        navigate("/dashboard");
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
                        <span>Task name:* </span>
                        <input type="text" name="taskName" required placeholder="Type the task name" onChange={(e) => setTaskName(e.target.value)} value={taskName || ""} />
                    </label>
                    <label>
                        <span>Github Repository: </span>
                        <input type="text" name="taskGit" placeholder="Include a github repo" onChange={(e) => setGitUrl(e.target.value)} value={gitUrl || ""} />
                    </label>
                    <label>
                        <span>Task description:* </span>
                        <textarea name="taskDescription" rows={5} required placeholder="Type the description" onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription || ""} />
                    </label>
                    <label>
                        <span>Task color:</span>
                        <input type="color" name="fav-color" className="fav-color" onChange={(e) => setColor(e.target.value)} value={color || "#3788d8"} />
                    </label>
                    {!response.loading && <button className='btn'>Create</button>}
                    {response.loading && <button disabled className='btn'>Wait...</button>}
                    {response.error && <p>{response.error}</p>}
                    {formError && <p>{formError}</p>}
                </form>
            </div>
        </div >
    )
}

export default TaskEvent