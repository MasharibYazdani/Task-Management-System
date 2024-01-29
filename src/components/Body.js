import { useEffect, useState } from "react";
import React from "react";
import AddNewTask from "./AddNewTask";
import { child, get, ref, remove } from "firebase/database";
import { db } from "../firebase";
import Edit from "./Edit";
import { useParams } from "react-router-dom";

function Body() {
  const [addTask, setAddTask] = useState(false);
  const [dataList, setDataList] = useState([]);

  const [taskEditClick, setTaskEditClick] = useState(null);

  const [filteredStatus, setFilteredStatus] = useState("all");

  const { id } = useParams();

  useEffect(() => {
    getTaskList();
  }, [dataList]);

  const getTaskList = () => {
    get(child(ref(db), "users/" + id + "/task"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const tasks = snapshot.val();

          // Filter tasks based on the selected status
          const filteredTasks =
            filteredStatus === "all"
              ? tasks
              : Object.fromEntries(
                  Object.entries(tasks).filter(
                    ([taskId, task]) => task.status === filteredStatus
                  )
                );

          setDataList(filteredTasks);
        } else {
          console.log("No data available");
          setDataList([]);
        }
      })
      .catch((error) => {
        console.error(error + "man");
      });
  };

  const handleAddTask = () => {
    setAddTask(!addTask);
  };

  const handleEditClick = (index) => {
    setTaskEditClick(taskEditClick === index ? null : index);
  };

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      remove(ref(db, `users/${id}/task/${taskId}`))
        .then(() => {
          console.log("Task deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    }
  };

  const handleStatus = (status) => {
    if (status === "todo") {
      return "danger";
    } else if (status === "completed") {
      return "info";
    }

    return "secondary";
  };

  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-md-4 text-start">
          <div>
            <button className="btn btn-primary" onClick={handleAddTask}>
              {" "}
              Add New Task +{" "}
            </button>
          </div>
        </div>

        <div className="col-md-4 text-start d-flex justify-content-around ">
          <div className=" border rounded p-2 align-self-center bg-primary">
            <label htmlFor="inputState" className="form-label text-white">
              Filter By Status :
            </label>
          </div>
          <div>
            <select
              type="select"
              id="inputState"
              className="form-select"
              name="status"
              onChange={(e) => setFilteredStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {addTask && (
          <AddNewTask id={id} addTask={addTask} setAddTask={setAddTask} />
        )}
      </div>

      {dataList.length === 0 ? (
        <div className="fw-bold mt-3">
          No task assigned! Please add your task{" "}
        </div>
      ) : (
        Object.keys(dataList).map((taskId, index) => {
          const task = dataList[taskId];
          return (
            <div key={taskId}>
              <div className="row mt-3  shadow-lg p-3 rounded">
                <div className="col-sm fw-bold">{task.title} </div>
                <div
                  className={`col-sm text-bg-${handleStatus(
                    task.status
                  )} rounded p-1 text-center text-white`}
                >
                  {task.status
                    ? task.status.charAt(0).toUpperCase() +
                      task.status.substring(1)
                    : ""}
                </div>
                <div className="col-sm text-center">{task.deadline}</div>

                <div className="col-sm text-center">
                  <button
                    className="btn btn-success"
                    onClick={() => handleEditClick(index)}
                  >
                    View & Edit Task
                  </button>
                </div>
                <div className="col-sm text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(taskId)}
                  >
                    Delete
                  </button>
                </div>
                {taskEditClick === index && (
                  <Edit
                    id={id}
                    taskId={taskId} // pass the task data to the EditTasks component
                    setClick={() => setTaskEditClick(null)}
                  />
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Body;
