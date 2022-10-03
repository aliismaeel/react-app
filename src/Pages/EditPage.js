import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((result) => {
        console.log(result);
        setUserData(result.data);
        console.log(result.data.userRole);
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setPassword(result.data.password);
        setEmail(result.data.email);
        setSelectedRole(result.data.userRole);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const handleSave = () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userRole: selectedRole
    };
    axios
      .patch(`http://localhost:3001/users/${id}`, body)
      .then((result) => {
        console.log(result);
        console.log("updated successfully");
        navigate('/users')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const access_token = localStorage.getItem("access_token");
  // const config = {
  //     headers: {
  //         Authorization: `Bearer ${access_token}`
  //     }
  // };

  // const handleSignup = () => {
  //     const signUpData = {
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //         password: password,
  //         userRole: selectedRole
  //     };

  //     axios.post("http://localhost:3001/users/create", signUpData, config)
  //     .then(result => {
  //         console.log(result);
  //         console.log("data successfully added")
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     })
  // }
  return (
    <div className="md:container md:mx-auto">
      <h4 className="text-2xl font-bold text-center">Edit Page</h4>
      <div
        className="bg-gray-500 text-blue"
        style={{ border: "5px solid black" }}
      >
        <div className="m-4">
          <label>FirstName:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>

        <div className="m-4">
          <label>LastName:</label>
          <input
            value={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>

        <div className="m-4">
          <label>Password:</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="m-4">
          <label>Email:</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="m-4">
          <label>Select One Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value || null)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </div>

        <div className="m-4 text-center">
        <button className="bg-green-500 hover:bg-green-700 font-bold px-2 ml-2 mr-2 rounded" onClick={handleSave}>Save</button>
        <button className="bg-red-500 hover:bg-blue-700 font-bold px-2 ml-2 mr-2 rounded"  onClick={() => navigate('/users')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
