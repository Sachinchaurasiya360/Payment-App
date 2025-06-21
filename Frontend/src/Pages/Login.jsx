import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export function Login({formname}) {
  const navigate=useNavigate();

  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-cyan-200">
      <div className="p-10 bg-white rounded-xl shadow-md w-full max-w-md">
        <h1 className="flex items-center justify-center font-bold text-2xl">
          {formname}
        </h1>
        <label className="block">
          Email
          <input
            type="text"
            placeholder="example@gmail.com"
            className="border-1 border-black rounded-md w-full p-2 "
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="block pt-2">
          Password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="border border-black rounded-md w-full p-2"
          />
        </label>

        <button
          className="flex justify-center mt-3 border border-blue-400 w-full bg-blue-400 rounded-md pt-2 pb-2 "
          onClick={() => {
            axios
              .post(
                "http://localhost:3000/api/v1/user/login",
                {
                  username: Username,
                  password: Password,
                },
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log("Login Success:", res.data);
              })
              .catch((err) => {
                console.error("Login Error:", err);
                alert("Login failed. Check console for details.");
              });
          }}
        >
          {formname}
        </button>
        <p className="w-full flex justify-center hover:underline pt-1 " onClick={()=> navigate("/signup") }>
          Don't have account signup
        </p>
      </div>
    </div>
  );
}
