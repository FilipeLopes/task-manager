import "./Taskbar.css";

//Hooks
import { useState } from "react";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { useInsertEvent } from "../hooks/useInsertEvent";

//Context
import { useAuthValue } from "../context/AuthContext";

type Props = {
    taskModal: (value: any) => void;
    listTasks: any;
}

const Taskbar = ({ taskModal, listTasks }: Props) => {
    const [selectedOp, setSelectedOp] = useState("");

    const { user } = useAuthValue();

    const { updateDocument } = useUpdateDocument("tasks");

    const { insertEvent } = useInsertEvent("tasks");

    const handleStartEvent = () => {

        const data = {
            isActive: true,
            start: new Date(),
        }

        updateDocument(selectedOp, data);

    }

    const handleStopEvent = () => {

        const data = {
            isActive: false,
            end: new Date(),
        }

        updateDocument(listTasks[0].id, data);

        insertEvent({
            taskName: listTasks[0].taskName,
            taskDescription: listTasks[0].taskDescription,
            isActive: false,
            start: "",
            end: "",
            color: listTasks[0].color,
            uid: user.uid,
            createdBy: user.email
        })

    }

    //Fix error when user don't have tasks yet
    if (!listTasks || listTasks[0] === undefined) {
        listTasks = [
            { isActive: false }
        ]
    }

    return (
        <>
            <nav className="taskbar">
                <ul className="task_list">
                    {listTasks && listTasks[0].isActive === true ?
                        (<li className="li_task"><button className="taskbar-btn" disabled>Create task</button></li>)
                        :
                        (<li className="li_task"><button className="taskbar-btn" onClick={() => taskModal("block")}>Create task</button></li>)
                    }

                    {listTasks && listTasks[0].isActive === true && (
                        <li>
                            <select name="task-select" className="task-select" disabled >
                                <option>{listTasks[0].taskName}</option>

                            </select>
                        </li>
                    )}
                    {listTasks && listTasks[0].isActive === false && (
                        <li>
                            <select name="task-select" className="task-select" onChange={(e) => { setSelectedOp(e.target.value) }} value={selectedOp || ""}>
                                <option value="Select a task">Select a task</option>
                                {listTasks && listTasks[0].createdAt && listTasks.map((task: any) => (
                                    <option key={task.id} value={task.id}>{task.taskName}</option>
                                ))}
                            </select>
                        </li>
                    )}
                    <li>
                        {listTasks && listTasks[0].isActive === true ?
                            (<button className="taskbar-btn stop" onClick={handleStopEvent}>Stop</button>)
                            :
                            (<button className="taskbar-btn" onClick={handleStartEvent}>Start</button>)
                        }
                    </li>

                </ul>

            </nav>
        </>
    )
}

export default Taskbar