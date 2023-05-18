import React from 'react'

export default function Modal({addToLocalStorage}) {
    return (
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Add Task
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="taskname"
                            />
                            <label for="floatingInput">Task Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="assignee"
                            />
                            <label for="floatingInput">Assignee</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                var taskname = document.getElementById("taskname").value;
                                var assignee = document.getElementById("assignee").value;
                                addToLocalStorage(taskname, assignee);
                            }}
                        >
                            Add 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
