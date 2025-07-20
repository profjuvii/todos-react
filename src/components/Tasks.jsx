import "../styles/Tasks.css";

import Task from "./Task";

function Tasks({ tasks }) {
  return (
    <div className="task-container">
      <h1 className="logo">Tasks</h1>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(({ id, isDone, text }) => (
            <Task key={id} id={id} isDone={isDone}>
              {text}
            </Task>
          ))
        ) : (
          <p style={{ padding: "12px", color: "var(--gray-light)" }}>
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
}

export default Tasks;
