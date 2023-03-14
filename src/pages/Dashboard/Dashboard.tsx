import "./Dashboard.css";

//Components
import TaskEvent from "../../components/TaskEvent";
import Taskbar from "../../components/Taskbar";

//Hooks
import { useState, useEffect } from "react"
import { useFetchAllEvents } from "../../hooks/useFetchAllEvents";

//Context
import { useAuthValue } from "../../context/AuthContext";
import { useFetchActiveEvent } from "../../hooks/useFetchActiveEvent";

type Props = {}

const Dashboard = (props: Props) => {
    const [modalDisplay, setModalDisplay] = useState<string>();
    const [taskState, setTaskState] = useState<any>();
    const [loadingTask, setLoadingTask] = useState<any>();
    const taskModal = (value: any) => {
        setModalDisplay(value);
    }

    const { user } = useAuthValue();
    const uid = user.uid;


    const { documents: taskActive, loading: loadActive } = useFetchActiveEvent("tasks", null, uid);
    const { documents: tasks, loading } = useFetchAllEvents("tasks", null, uid);

    useEffect(() => {
        if (taskActive && taskActive[0] !== undefined) {
            setTaskState(taskActive);
            setLoadingTask(loadActive);

        } else {
            setTaskState(tasks);
            setLoadingTask(loading);
        }


    }, [tasks, taskActive, loading, loadActive]);

    if (loadingTask) {
        return <p>Loading...</p>
    }


    return (
        <>
            <Taskbar taskModal={taskModal} listTasks={taskState} />
            <div className="dashboard">
                <TaskEvent taskModal={taskModal} modalDisplay={modalDisplay} />
            </div>
        </>

    )
}

export default Dashboard