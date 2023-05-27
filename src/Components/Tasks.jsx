import React, { useEffect, useState } from "react";
import Task from "./Task";
import Swal from "sweetalert2";
import AddTaskModal from "./AddTaskModal";

export default function Tasks() {
  const [dataParsed, setDataParsed] = useState([]);
  const [isData, setIsData] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("");

  function showSuccessPopup() {
    Swal.fire("Good job!", "You clicked the button!", "success");
  }

  const parsingData = (data) => {
    return JSON.stringify(data);
  };

  function getDataFromLocalStorage() {
    const jsonFormatData = localStorage.getItem("Tasks");
    console.log(jsonFormatData);
    if (jsonFormatData) {
      const todos = JSON.parse(jsonFormatData);
      setDataParsed(todos);
      setIsData(true);
    }
  }

  function onAddClick(name, assignee) {
    let dataObject = {
      id: dataParsed.length,
      done: false,
      name,
      assignee,
    };

    const updatedData = [...dataParsed, dataObject];
    const localStorageData = parsingData(updatedData);

    setDataParsed(updatedData);
    localStorage.setItem("Tasks", localStorageData);
    showSuccessPopup();
  }

  function displayData() {
    return dataParsed
      .filter((task) => task.name.toLowerCase().includes(token))
      .map((element, id) => {
        return element.done === toggle ? (
          <div key={id}>
            <Task
              name={element.name}
              assignee={element.assignee}
              isDone={element.done}
              onComplete={() => onComplete(id)}
              onDelete={() => onDelete(id)}
            />
          </div>
        ) : (
          ""
        );
      });
  }

  function onComplete(id) {
    console.log(id);
    const updatedData = dataParsed.map((element) => {
      console.log(element.id);
      if (element.id === id) {
        return { ...element, done: true };
      }
      return element;
    });

    setDataParsed(updatedData);
    const localStorageData = parsingData(updatedData);
    localStorage.setItem("Tasks", localStorageData);
    showSuccessPopup();
    setIsData(false);
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
      if (result.isConfirmed) {
        dataParsed.find((element) => {
          if (dataParsed.indexOf(element) == id) {
            dataParsed.splice(id, 1);
          }
          setDataParsed(dataParsed);
          const localStorageData = parsingData(dataParsed);
          localStorage.setItem("Tasks", localStorageData);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
        setIsData(false);
      }
    });
  }

  function renderCounter() {
    // dataParsed.reduce((acc, cur) => {
    //   return 
    // })
    let donesCount = 0;
    let todoCount = 0;
    dataParsed.map((task) => {
      if (task.done == true) {
        donesCount++;
      } else {
        todoCount++;
      }
    });

    return (
      <>
        <b>
          TODO: {todoCount} &nbsp;Confirmed: {donesCount}
        </b>
      </>
    );
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, [isData]);

  return (
    <>
      <h1 className="title">ToDo List React</h1>
      <div className="tasks-container">
        <div className="tasks-table">
          <div className="controlBar">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="toggledBtn"
                onClick={(e) => {
                  console.log(e.target.checked);
                  setToggle(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="toggledBtn">
                Filter by completed tasks
              </label>
            </div>

            <div>
              <input
                onChange={(e) => {
                  setToken(e.target.value);
                }}
                type="text"
                placeholder="Search by task name... "
                className="form-control mt-5 mb-5"
              ></input>
            </div>

            <div>{renderCounter()}</div>

            <div>
              <button
                type="button"
                className="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="tasksTable">
            <div id="tasksTable" className="tasks-table-container">
              {displayData()}
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal onAddClick={onAddClick} />
    </>
  );
}
