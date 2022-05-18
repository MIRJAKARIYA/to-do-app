import React from "react";

const SingleTask = ({userTask,index,handleDelete}) => {
    const {task, description,_id} = userTask;
  return (
    <tr className="hover">
      <th>{index+1}</th>
      <td>{task}</td>
      <td>{description}</td>
      <td>
          <button onClick={()=>handleDelete(_id)} className="btn btn-error btn-xs">delete</button>
      </td>
    </tr>
  );
};

export default SingleTask;
