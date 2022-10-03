import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../Schemas";

const Registration = () => {
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [selectedRole, setSelectedRole] = useState("user");

  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    userRole: "user",
  };

  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
        const signUpData = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                  userRole: values.selectedRole,
                };
                axios
                  .post("http://localhost:3001/users/create", signUpData, config)
                  .then((result) => {
                    console.log(result);
                    console.log("data successfully added");
                  })
                  .catch((error) => {
                    console.log(error);
                    if (
                      error.response?.data.statusCode === 401 ||
                      error.response?.data.statusCode === 403
                    ) {
                      alert("you are not a super admin or you are not logged in");
                    }
                  });
        action.resetForm();
      console.log(values);
    },
  });

  

  //   const handleSignup = () => {
  //     const signUpData = {
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       email: values.email,
  //       password: values.password,
  //       userRole: values.selectedRole,
  //     };
  //     console.log(signUpData);
  //     axios
  //       .post("http://localhost:3001/users/create", signUpData, config)
  //       .then((result) => {
  //         console.log(result);
  //         console.log("data successfully added");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         if (
  //           error.response?.data.statusCode === 401 ||
  //           error.response?.data.statusCode === 403
  //         ) {
  //           alert("you are not a super admin or you are not logged in");
  //         }
  //       });
  //   };
  return (
    <div className="md:container md:mx-auto">
      <h4 className="text-2xl font-bold text-center">SignUp Page</h4>
      <form className="text-center" onSubmit={handleSubmit}>
        <div
          className="bg-gray-500 text-blue"
          style={{ border: "5px solid black" }}
        >
          <div className="m-4">
            <label htmlFor="firstName">FirstName:</label>
          </div>
          <div className="m-4">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              //   onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <p>{errors.firstName}</p>
          </div>

          <div className="m-4">
            <label htmlFor="latName">LastName:</label>
          </div>
          <div className="m-4">
            <input
              id="lastName"
              name="lastName"
              value={values.lastName}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              //   onChange={(e) => setLastName(e.target.value)}
            ></input>
            <p>{errors.lastName}</p>
          </div>
          <div className="m-4">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="m-4">
            <input
            id="password"
              name="password"
              value={values.password}
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              //   onChange={(e) => setPassword(e.target.value)}
            ></input>
            <p>{errors.password}</p>
          </div>
          <div className="m-4">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="m-4">
            <input
            id="email"
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              //   onChange={(e) => setEmail(e.target.value)}
            ></input>
            <p>{errors.email}</p>
          </div>

          <div className="m-4">
            <label htmlFor="userRole">Select One Role:</label>
            <select
              id="userRole"
              name="userRole"
              value={values.userRole}
              onChange={handleChange}
              onBlur={handleBlur}
              //   onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
            </select>
          </div>

          <div className="m-4 font-bold text-right">
            <button
              className="bg-green-500 hover:bg-green-700 font-bold px-2 ml-2 mr-2 rounded"
              //   onClick={handleSignup}
              type="submit"
              onSubmit={handleSubmit}
            >
              SignUp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
