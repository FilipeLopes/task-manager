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

//FullCalendar
//import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventModal from "../../components/EventModal";

type Props = {}

const Dashboard = (props: Props) => {
    const [modalDisplay, setModalDisplay] = useState<string>();
    const [taskState, setTaskState] = useState<any>();
    const [loadingTask, setLoadingTask] = useState<any>();
    const [eventModalDisplay, setEventModalDisplay] = useState<any>();
    const [eventId, setEventId] = useState<any>();

    const taskModal = (value: any) => {
        setModalDisplay(value);
    }

    const eventModal = (value: any) => {
        setEventModalDisplay(value);
    }

    const { user } = useAuthValue();
    const uid = user.uid;
    const search = "all";
    let listObjectsTask: any;

    const { documents: taskActive, loading: loadActive } = useFetchActiveEvent("tasks", null, uid);
    const { documents: tasks, loading } = useFetchAllEvents("tasks", null, uid);
    const { documents: tasksNoEnd, loading: loadingNoEnd } = useFetchAllEvents("tasks", search, uid);

    if (tasksNoEnd) {
        listObjectsTask = tasksNoEnd.map((taskNoEnd: any) => (
            {
                title: taskNoEnd.taskName,
                description: taskNoEnd.taskDescription,
                start: new Date(taskNoEnd.start.seconds * 1000 + Math.round(taskNoEnd.start.nanoseconds / 1000000)),
                end: new Date(taskNoEnd.end.seconds * 1000 + Math.round(taskNoEnd.end.nanoseconds / 1000000)),
                color: taskNoEnd.color,
                isActive: taskNoEnd.isActive,
                id: taskNoEnd.id,
            }
        ))

    }



    if (listObjectsTask) {
        listObjectsTask.map((objTask: any) => {
            if (objTask.end.toString() === "Invalid Date" && objTask.isActive) {
                return objTask.end = new Date();
            } else {
                return objTask;
            }
        })
    }

    const handleEventClick = (clickInfo: any) => {
        setEventId(clickInfo.event.id);
        setEventModalDisplay("block");
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
                    <br />
                    {eventId && <EventModal eventModal={eventModal} eventModalDisplay={eventModalDisplay} eventId={eventId} />}
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        initialView='timeGridWeek'
                        events={listObjectsTask}
                        allDaySlot={false}
                        contentHeight={610}
                        slotDuration={'01:00'}
                        nowIndicator={true}
                        eventClick={handleEventClick}
                    />
                    <br />
                </>
            </div>
        </>

    )
}

export default Dashboard