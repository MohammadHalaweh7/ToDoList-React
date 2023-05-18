import React from "react";
export default function Task({
  id,
  name,
  assignee,
  setItemDone,
  deleteTask,
  doneAttribute,
}) {
  return (
    <>
      <div className="taskDiv d-flex justify-content-between">
        <div>
          <p>{name}</p>
          <p>{assignee}</p>
        </div>

        <div>
          <button onClick={deleteTask} type="button" className="btn btn-danger d-block mb-2">
            <i class="fa-solid fa-trash-can"></i>
          </button>

          {doneAttribute ? ("") : (<button onClick={setItemDone} type="button" className="btn btn-success">
              <i class="fa-solid fa-check"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
