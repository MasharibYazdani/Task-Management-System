import { child, get, ref, set } from "firebase/database";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function Edit({ id, taskId }) {
  const [taskData, setTaskData] = useState([
    {
      title: null,
      description: null,
      deadline: null,
      status: null,
    },
  ]);

  console.log("Data" + taskData);
  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = () => {
    get(child(ref(db), `users/${id}/task/${taskId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTaskData(snapshot.val());
          console.log("last" + snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    try {
      set(ref(db, "users/" + id + "/task/" + taskId), taskData);
      alert("Task Updated successfully");
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
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            required
            onChange={handleChange}
            value={taskData.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="Description"
            rows="3"
            name="description"
            required
            onChange={handleChange}
            value={taskData.description}
          ></textarea>
        </div>

        <div className="mb-3 d-flex justify-content-start">
          <div className="mb-3 col-3 me-3">
            <label htmlFor="Deadline2" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              required
              onChange={handleChange}
              min={getCurrentDate()}
              value={taskData.deadline}
            />
          </div>

          <div class="mb-3 col-3 me-3">
            <label for="inputState" class="form-label">
              Status
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={handleChange}
              name="status"
              value={taskData.status}
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

export default Edit;
