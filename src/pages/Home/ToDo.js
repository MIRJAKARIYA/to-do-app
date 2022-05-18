import React from "react";

const ToDo = () => {
  return (
    <div className="mt-20">
      <div className=" max-w-[500px] mx-auto">
        <form>
          <div>
            <p className="text-yellow-600 text-lg font-semibold mb-2">Your Task:</p>
            <input
              type="text"
              placeholder="Enter Task"
              class="input input-bordered input-warning w-full"
            />
          </div>
          <div>
            <p className="text-yellow-600 text-lg font-semibold my-2">Short Description:</p>
            <textarea
              class="textarea textarea-warning w-full"
              placeholder="Enter Description"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="overflow-x-auto mt-10">
          <h1 className="text-center text-3xl mb-2 font-bold underline text-yellow-600">Your Tasks</h1>
        <table class="table w-full max-w-[800px] mx-auto">
          <thead>
            <tr class="hover">
              <th></th>
              <th>Task</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>

            <tr class="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>

            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDo;
