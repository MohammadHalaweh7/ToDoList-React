import React from "react";
import Task from "./Task";

export default function Tasks({ tasks, onComplete, onDelete, toggle, token }) {
  const filteredTasks = tasks.filter(
    (task) =>
      task.done === toggle &&
      (token
        ? task.taskname?.toLowerCase().includes(token.toLowerCase())
        : true)
  );

  return (
    <>
      {filteredTasks.map((task) => (
        <Task
          {...task}
          onComplete={onComplete}
          onDelete={onDelete}
          toggle={toggle}
        />
      ))}
    </>
  );
}
