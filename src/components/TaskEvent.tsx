import { useEffect, useRef } from "react";
import "./TaskEvent.css";


type Props = {
    taskModal: (value: any) => void;
    modalDisplay: any;
}

const TaskEvent = ({ taskModal, modalDisplay }: Props) => {
    const refModal = useRef<HTMLDivElement>(null);

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
                <p>Conteúdo do modal vai aqui...</p>
            </div>
        </div >
    )
}

export default TaskEvent