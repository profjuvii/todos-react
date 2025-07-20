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

      <FontAwesomeIcon
        icon={faTrash}
        className="del-btn"
        onClick={() => deleteTask(id)}
        style={{ fontSize: "18px", width: "20px", height: "24px" }}
      />
    </div>
  );
}

export default Task;
