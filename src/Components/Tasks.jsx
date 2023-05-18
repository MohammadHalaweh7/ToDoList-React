import React, { useEffect, useState } from "react";
import Task from "./Task";
import Swal from "sweetalert2";
import Modal from "./Modal";

export default function Tasks() {
  const [dataParsed, setDataParsed] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [token, setToken] = useState("");

  console.log(token);

  function showSuccessPopup()
  {
    Swal.fire("Good job!", "You clicked the button!", "success");
  }


  function getDataFromLocalStorage() {
    const jsonFormatData = localStorage.getItem("Tasks");
    try {
      return JSON.parse(jsonFormatData) || [];
    } catch {
      return [];
    }
  }

  function addToLocalStorage(name, assignee) {
    let dataObject = {
      id: `${Math.random() * 1232}`,
      done: 0,
      name,
      assignee,
      
    };
    dataParsed.push(dataObject);
    setDataParsed(dataParsed);
    let localStorageData = JSON.stringify(dataParsed);
    localStorage.setItem("Tasks", localStorageData);
    showSuccessPopup();
    setTimeout(() => {
      window.location.reload();
    }, 1400);
  }

  function displayData() {
    return dataParsed
      .filter((task) => task.name.toLowerCase().includes(token))
      .map((element, key) => {
        return element.done == toggle ? (
          <Task
            id={key}
            name={element.name}
            assignee={element.assignee}
            doneAttribute={element.done}
            setItemDone={() => setItemDone(key)}
            deleteTask={() => deleteTask(key)}
          />
        ) : (
          ""
        );
      });
  }

  function setItemDone(id) {
    dataParsed.find((element) => {
      if (dataParsed.indexOf(element) == id) {
        dataParsed[id].done = 1;
      }
      setDataParsed(dataParsed);
      const localStorageData = JSON.stringify(dataParsed);
      localStorage.setItem("Tasks", localStorageData);
      showSuccessPopup();
      setTimeout(() => {
        window.location.reload();
      }, 1400);
    });
  }

  function deleteTask(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dataParsed.find((element) => {
          if (dataParsed.indexOf(element) == id) {
            dataParsed.splice(id, 1);
          }
          setDataParsed(dataParsed);
          let localStorageData = JSON.stringify(dataParsed);
          localStorage.setItem("Tasks", localStorageData);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");

          setTimeout(() => {
            window.location.reload();
          }, 1400);
        });
      }
    });
  }

  function renderCounter() {
    let donesCount = 0;
    let todoCount = 0;
    dataParsed.map((task) => {
      if (task.done == 1) {
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
    setDataParsed(getDataFromLocalStorage());
  }, []);

  return (
    <>
      <h1 className="title">ToDo List React</h1>
      <div className="tasks-container">

        <div className="tasks-table">

          <div className="controlBar">

            <div class="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="toggledBtn"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
              <label class="form-check-label" for="toggledBtn">
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
                class="form-control mt-5 mb-5"
              ></input>
            </div>

            <div>{renderCounter()}</div>

            <div>
              <button
                type="button"
                class="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-solid fa-plus"></i>
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

      <Modal addToLocalStorage={addToLocalStorage} />
    </>
  );
}
