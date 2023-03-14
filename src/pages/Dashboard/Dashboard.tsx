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
    const search = "all";
    let listObjectsTask;

    const { documents: taskActive, loading: loadActive } = useFetchActiveEvent("tasks", null, uid);
    const { documents: tasks, loading } = useFetchAllEvents("tasks", null, uid);
    const { documents: tasksNoEnd, loading: loadingNoEnd } = useFetchAllEvents("tasks", search, uid);

    if (tasksNoEnd) {
        listObjectsTask = [
            tasksNoEnd.map((taskNoEnd: any) => (
                {
                    name: taskNoEnd.taskName,
                    description: taskNoEnd.taskDescription,
                    start: new Date(taskNoEnd.start.seconds * 1000 + Math.round(taskNoEnd.start.nanoseconds / 1000000)),
                    end: new Date(taskNoEnd.end.seconds * 1000 + Math.round(taskNoEnd.end.nanoseconds / 1000000))
                }
            ))

        ]
    }



    useEffect(() => {
        if (taskActive && taskActive[0] !== undefined) {
            setTaskState(taskActive);
            setLoadingTask(loadActive);

        } else {
            setTaskState(tasks);
            setLoadingTask(loading);
        }


    }, [tasks, taskActive, loading, loadActive]);

    if (loadingTask || loadingNoEnd) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Taskbar taskModal={taskModal} listTasks={taskState} />
            <div className="dashboard">
                <>
                    <TaskEvent taskModal={taskModal} modalDisplay={modalDisplay} />
                    {console.log(listObjectsTask)}
                </>
            </div>
        </>

    )
}

export default Dashboard