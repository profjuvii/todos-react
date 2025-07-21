import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

import "../styles/Task.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ id, isDone, children }) {
  const { markAsDone, deleteTask } = useContext(TasksContext);

  return (
    <div id={id} className={`task ${isDone ? "done" : ""}`}>
      <button className="checkbox" onClick={() => markAsDone(id)}>
        {isDone ? (
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
        ) : (
          ""
        )}
      </button>

      <p className="text">{children}</p>

      <button className="del-btn" onClick={() => deleteTask(id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default Task;
