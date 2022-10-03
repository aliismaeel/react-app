import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const usersData = () =>{
    axios
    .get("http://localhost:3001/users")
    .then((result) => {
      console.log(result.data);
      setUsers(result.data);
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => {
      usersData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editUser/${id}`)
  }

  const handleLogOut = () => {
      localStorage.removeItem("access_token");
      navigate('/login');
  }

  const handleDelete =(id) => {
      axios.delete(`http://localhost:3001/users/${id}`)
      .then(result => {
          console.log(result);
      })
      .catch(error => {
          console.log(error);
      });
      usersData();
  }

  return (
    <div className="md:container md:mx-auto">
        <div>
            <h4 className="text-left font-bold text-center">Admin Page</h4>
        </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      FirstName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      LastName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      UserRole
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      UserEmail
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      UserAction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user._id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.firstName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.lastName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.userRole}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                        <button 
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        type="button"
                        data-modal-toggle="popup-modal"
                        onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">

      <button
       className="bg-green-500 font-bold rounded p-2"
       onClick={handleLogOut}
       >LogOut</button>
      </div>

    </div>
  );
};

export default User;
