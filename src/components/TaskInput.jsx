import { useState } from "react"

import "../styles/TaskInput.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"

function TaskInput({ addNewTask }) {
    const [value, setValue] = useState("");

    function clickHandler() {
        const text = value.trim();
        if (text !== "") {
            addNewTask(text);
        }
        setValue("");
    }

    return (
        <div className="input-container">
            <label
                htmlFor="input-field"
                className={`label ${value !== "" ? "hidden" : ""}`}
            >
                Write new task...
            </label>
            <input
                type="text"
                id="input-field"
                className="input-field"
                value={value}
                onInput={(e) => setValue(e.target.value)}
                maxLength={90}
            />
            <button className="add-btn" onClick={clickHandler}>
                Add
                <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: "13px" }} />
            </button>
        </div>
    )
}

export default TaskInput