import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignIn = () => {
        const signInData = {
            email: email,
            password: password,
        };

        axios.post("http://localhost:3001/auth/login", signInData)
        .then(result => {
            localStorage.setItem("access_token", result.data?.access_token);
            navigate('/users');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="md:container md:mx-auto">
        <h4 className="text-2xl font-bold text-center">LogIn Page</h4>
      <div className="bg-gray-500 text-blue" style={{border: '5px solid black'}}>
          <div className="m-4">
          <label>Email:</label>
          <input
           type="email"
           onChange={(e)=> setEmail(e.target.value)}
           ></input>
          </div>
          
          <div className="m-4">
          <label>Password:</label>
          <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          ></input>
          </div>

          <div className="m-4 font-bold text-3xl text-center">
              <button 
              className="bg-blue-500 hover:bg-green-700 text-white font-bold px-2 ml-2 mr-2 rounded" 
              onClick={handleSignIn}>
                  LogIn
              </button>
          </div>
          </div>
    </div>
    )
}