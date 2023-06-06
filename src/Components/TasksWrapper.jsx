import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TasksControls from "./TasksControls";
import AddTaskModal from "./AddTaskModal";
import Swal from "sweetalert2";

export default function TasksWrapper() {
  const [dataParsed, setDataParsed] = useState([
    { id: 0, taskname: "Hello", assignee: "World", done: false },
    { id: 1, taskname: "Hello2", assignee: "World2", done: true },
  ]);
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("");

  const tasksCount = dataParsed.length;
  const completedTasksCount = dataParsed.filter((task) => task.done).length;

  const LOCALSTORAGE_KEY = "Tasks";

  function syncLocalStorage() {
    const dataStringified = parseData(dataParsed);
    localStorage.setItem("Tasks", dataStringified);
  }

  function showSuccessPopup() {
    Swal.fire("Good job!", "You clicked the button!", "success");
  }

  const parseData = (data) => {
    return JSON.stringify(data);
  };

  function getDataFromLocalStorage() {
    try {
      const jsonFormatData = localStorage.getItem(LOCALSTORAGE_KEY);
      const todos = JSON.parse(jsonFormatData) || [];
      setDataParsed(todos);
    } catch {
      return [];
    }
  }

  function onAddClick(taskname, assignee) {
    const dataObject = {
      id: dataParsed.length,
      done: false,
      taskname,
      assignee,
    };

    const updatedData = [...dataParsed, dataObject];
    const localStorageData = parseData(updatedData);

    setDataParsed(updatedData);
    localStorage.setItem(LOCALSTORAGE_KEY, localStorageData);
    showSuccessPopup();
  }

  function onComplete(id) {
    console.log(id);
    const updatedData = dataParsed.map((element) => {
      if (element.id === id) {
        return { ...element, done: true };
      }
      return element;
    });

    setDataParsed(updatedData);
    syncLocalStorage();

    showSuccessPopup();
  }

  function onDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      const updatedData = dataParsed.filter((element) => element.id !== id);
      const updatedDataWithIDs = updatedData.map((element, index) => ({
        ...element,
        id: index,
      }));

      setDataParsed(updatedDataWithIDs);
      syncLocalStorage();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    });
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <>
      <h1 className="title">ToDo List React</h1>
      <div className="tasks-container">
        <div className="tasks-table">
          <TasksControls
            setToggle={setToggle}
            setToken={setToken}
            tasksCount={tasksCount}
            completedTasksCount={completedTasksCount}
            toggle={toggle}
            token={token}
          />
          <TaskList
            dataParsed={dataParsed}
            toggle={toggle}
            token={token}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        </div>
      </div>
      <AddTaskModal onAddClick={onAddClick} />
    </>
  );
}
