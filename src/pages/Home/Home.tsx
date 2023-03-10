import "./Home.css";

//Components
import TaskEvent from "../../components/TaskEvent";

//Hooks
import { useState } from "react"

type Props = {}

const Home = (props: Props) => {
    const [modalDisplay, setModalDisplay] = useState<string>();

    const taskModal = (value: any) => {
        setModalDisplay(value);
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <button className="btn" onClick={() => taskModal("block")}>Create task</button>
            <TaskEvent taskModal={taskModal} modalDisplay={modalDisplay} />
        </div>
    )
}

export default Home