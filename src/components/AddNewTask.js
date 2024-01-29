import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function AddNewTask({ id, addTask, setAddTask }) {
  const [taskData, setTaskData] = useState({
    title: null,
    description: null,
    deadline: null,
    status: "todo",
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskId = uuidv4();
    try {
      set(ref(db, "users/" + id + "/task/" + taskId), taskData);
      alert("Task added successfully");
      setAddTask(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="m-6 text-start">
      <form onSubmit={handleAddTask}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
            name="title"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Description"
            rows="3"
            name="description"
            required
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3 d-flex justify-content-start">
          <div className="mb-3 col-3 me-3">
            <label htmlFor="Deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              className="form-control"
              name="deadline"
              required
              onChange={handleChange}
              min={getCurrentDate()}
            />
          </div>
          <div className="mb-3 col-3 me-3">
            <label htmlFor="inputState" className="form-label">
              Status
            </label>
            <select
              type="select"
              id="inputState"
              className="form-select"
              onChange={handleChange}
              name="status"
            >
              <option value="todo">To Do</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="mb-3 col-3 me-3">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewTask;
