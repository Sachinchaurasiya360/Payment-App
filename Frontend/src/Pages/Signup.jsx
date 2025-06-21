import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Signup({ formname }) {
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ContactNo, setContacNo] = useState("");
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-cyan-200 ">
      <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
        <h1 className="flex  justify-center text-2xl font-bold mb-2">
          {formname}
        </h1>
        <label htmlFor="" className="block w-full">
          First Name
        </label>
        <input
          type="text"
          placeholder="John"
          className="border border-gray-400 w-full rounded-md mb-2 p-2"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label htmlFor="" className="block">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Doe"
          className="border border-gray-400 w-full rounded-md mb-2 p-2"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label htmlFor="" className="block">
          Email
        </label>
        <input
          type="text"
          placeholder="example@gmail.com"
          className="border border-gray-400 w-full rounded-md mb-2 p-2"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="" className="block">
          Password
        </label>
        <input
          type="password"
          placeholder="**************"
          className=" border border-gray-400 w-full rounded-md mb-2 p-2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="" className="block">
          Contact No.
        </label>
        <input
          type="text"
          placeholder="+91 "
          className="border border-gray-400 w-full rounded-md mb-2 p-2"
          onChange={(e) => setContacNo(e.target.value)}
        />
        <button
          className="flex items-center justify-center border border-gray-400 w-full mt-2 rounded-md p-2 bg-blue-400 "
          onClick={() =>
            axios
              .post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username: Email,
                  password:Password,
                  FirstName,
                  LastName,
                  PhoneNo: ContactNo,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                console.log("Signup Successful", res.status);
                navigate("/login")
              })
              .catch((err) => {
                console.log("Caught some error", err);
              })
          }
        >
          Signup
        </button>
        <p
          className="flex justify-center mt-2 hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account
        </p>
      </div>
    </div>
  );
}
