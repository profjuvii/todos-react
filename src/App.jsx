import { useState, useEffect, useRef } from "react";

import TaskInput from "./components/TaskInput";
import Tasks from "./components/Tasks";
import { TasksContext } from "./contexts/TasksContext";

function App() {
  const [tasks, setTasks] = useState([]);
  const nextIdRef = useRef({ next: 0, free: [] });
  const taskOps = { markAsDone, deleteTask };

  function getNextId() {
    const { free } = nextIdRef.current;
    return free.length > 0
      ? nextIdRef.current.free.shift()
      : nextIdRef.current.next++;
  }

  function saveTasks(updatedTasks) {
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
    localStorage.setItem("index", JSON.stringify(nextIdRef.current));
    return updatedTasks;
  }

  function addNewTask(text) {
    setTasks((prevTasks) => {
      const newTask = {
        id: getNextId(),
        isDone: false,
        text: text,
        timestamp: new Date(),
      };

      const index = prevTasks.findIndex((task) => !task.isDone);

      const updatedTasks = [...prevTasks];
      if (index === -1) {
        updatedTasks.push(newTask);
      } else {
        updatedTasks.splice(index, 0, newTask);
      }

      return saveTasks(updatedTasks);
    });
  }

  function markAsDone(id) {
    setTasks((prevTasks) => {
      const indexById = prevTasks.findIndex((task) => task.id === id);

      const updatedTasks = [...prevTasks];
      let [markedTask] = updatedTasks.splice(indexById, 1);
      markedTask = { ...markedTask, isDone: !markedTask.isDone };

      if (markedTask.isDone) {
        updatedTasks.unshift(markedTask);
        return saveTasks(updatedTasks);
      }

      const indexIsNotDone = updatedTasks.findIndex((task) => !task.isDone);
      if (indexIsNotDone === -1) {
        updatedTasks.push(markedTask);
      } else {
        updatedTasks.splice(indexIsNotDone, 0, markedTask);
      }

      return saveTasks(updatedTasks);
    });
  }

  function deleteTask(id) {
    setTasks((prevTasks) =>
      saveTasks([...prevTasks].filter((task) => task.id !== id))
    );
    nextIdRef.current.free.push(id);
  }

  useEffect(() => {
    const index = localStorage.getItem("index");
    if (index !== null) {
      nextIdRef.current = JSON.parse(index);
    }

    const todos = localStorage.getItem("todos");
    if (todos !== null) {
      setTasks(JSON.parse(todos));
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TasksContext.Provider value={taskOps}>
        <Tasks tasks={tasks} />
      </TasksContext.Provider>
      <TaskInput addNewTask={addNewTask} />
    </div>
  );
}

export default App;
