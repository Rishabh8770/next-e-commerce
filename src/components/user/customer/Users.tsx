import React from "react";
import userData from "@/data/users.json";

const Users = () => {
    const handleEdit = () => {

    }
    const handleDelete = () => {

    }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white">
        <thead>
          <tr className="text-justify">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="py-6 px-4 border-b">{user.id}</td>
              <td className="py-6 px-4 border-b">
                {user.name}
              </td>
              <td className="py-6 px-4 border-b">
                {user.email}
              </td>
              
              <td className="py-6 px-4 border-b">
                <div className="flex space-x-2">
                  <button
                    className="px-2 py-1 bg-slate-400 rounded-md"
                    // onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded-md"
                    // onClick={(e) => handleDelete(e, product.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
