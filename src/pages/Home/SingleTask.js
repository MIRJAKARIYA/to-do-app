import React from "react";

const SingleTask = ({userTask,index}) => {
    const {task, description} = userTask;
  return (
    <tr className="hover">
      <th>{index+1}</th>
      <td>{task}</td>
      <td>{description}</td>
      <td>Blue</td>
    </tr>
  );
};

export default SingleTask;
