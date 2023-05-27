import React from "react";
export default function Task({ name, assignee, onComplete, onDelete, isDone }) {
  return (
    <>
      <div className="taskDiv d-flex justify-content-between">
        <div>
          <p>{name}</p>
          <p>{assignee}</p>
        </div>

        <div>
          <button
            onClick={onDelete}
            type="button"
            className="btn btn-danger d-block mb-2"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>

          {!isDone ? (
            <button
              onClick={onComplete}
              type="button"
              className="btn btn-success"
            >
              <i className="fa-solid fa-check"></i>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
