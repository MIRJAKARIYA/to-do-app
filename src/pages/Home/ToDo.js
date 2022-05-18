import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../firebase.init";

import SingleTask from "./SingleTask";

const ToDo = () => {
  const [reload, setReload] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth);

  //get users to do data

  useEffect(() => {
    fetch(`http://localhost:5000/todos?email=${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [reload, user]);

  //delete users to do data

  const handleDelete = (id,task) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
            toast.warning(`${task} task deleted`);
            setReload(!reload);
          }
      });
  };

  //add users task
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = e.target.taskName.value;
    const description = e.target.taskDescription.value;
    const email = user.email;
    const taskDetail = {
      task,
      description,
      email,
    };
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(taskDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          toast.success(`${task} task added successfully`);
          setReload(!reload);
        }
      });
      e.target.reset()
  };
  //update users task
  const handleComplete = (id,task) => {
    const isCompleted = { completed: true };
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(isCompleted),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
            toast.success(`${task} task added successfully`);
            setReload(!reload);
          }
      });
  };

  return (
    <>
      <div className="mt-20">
        <div className=" max-w-[500px] mx-auto">
          <form onSubmit={handleAddTask}>
            <div>
              <p className="text-white text-lg font-semibold mb-2">Task:</p>
              <input
                type="text"
                name="taskName"
                placeholder="Enter Task"
                className="input input-bordered input-warning w-full"
                required
              />
            </div>
            <div>
              <p className="text-white text-lg font-semibold my-2">
                Short Description:
              </p>
              <textarea
                name="taskDescription"
                className="textarea textarea-warning w-full"
                placeholder="Enter Description"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-warning mx-auto font-bold block mt-5"
            >
              ADD TASK
            </button>
          </form>
        </div>
        <div className="overflow-x-auto mt-10">
          <h1 className="text-center text-3xl mb-2 font-bold underline text-yellow-600">
            Your Tasks
          </h1>
          <table className="table w-full max-w-[800px] mx-auto">
            <thead>
              <tr className="hover">
                <th></th>
                <th>Task</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <SingleTask
                  key={task._id}
                  userTask={task}
                  index={index}
                  handleDelete={handleDelete}
                  handleComplete={handleComplete}
                ></SingleTask>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default ToDo;
