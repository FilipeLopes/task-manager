import "./Taskbar.css";

//Hooks
import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

type Props = {
    taskModal: (value: any) => void;
    listTasks: any;
}

const Taskbar = ({ taskModal, listTasks }: Props) => {
    const [selectedOp, setSelectedOp] = useState("");

    const { user } = useAuthValue();

    const { updateDocument, response } = useUpdateDocument("tasks");

    const handleTaskEvent = (status: string) => {

        console.log(status, selectedOp);

        const data = {
            isActive: true,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(selectedOp, data);

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
                                <option value="">Select a task</option>
                                {listTasks && listTasks.map((task: any) => (
                                    <option key={task.id} value={task.id}>{task.taskName}</option>
                                ))}
                            </select>
                        </li>
                    )}
                    <li>
                        {listTasks && listTasks[0].isActive === true ?
                            (<button className="taskbar-btn stop" onClick={() => handleTaskEvent("stop")}>Stop</button>)
                            :
                            (<button className="taskbar-btn" onClick={() => handleTaskEvent("start")}>Start</button>)
                        }
                    </li>

                </ul>

            </nav>
        </>
    )
}

export default Taskbar