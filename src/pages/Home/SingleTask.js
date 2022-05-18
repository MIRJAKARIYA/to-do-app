import React from "react";
import { AiFillDelete } from "react-icons/ai";

const SingleTask = ({ userTask, index, handleDelete, handleComplete }) => {
  const { task, description, _id, completed } = userTask;
  return (
    <tr className="hover">
      <th>{index + 1}</th>
      <td className={`${completed && "line-through"}`}>{task}</td>
      <td className={`${completed && "line-through"}`}>{description}</td>
      <td>
        <div className="flex items-center">
          {!completed && (
            <button
              onClick={() => handleComplete(_id,task)}
              className="btn mr-2 btn-success btn-xs"
            >
              complete
            </button>
          )}
          <button
            onClick={() => handleDelete(_id,task)}
            className={`text-3xl text-red-700 ${completed && "ml-[85px]"}`}
          >
            <AiFillDelete></AiFillDelete>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SingleTask;
