import React, { useState } from "react";
import { Button, HR, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import api from "./axiosBase";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/user/signup", formData);

      if (response.data.success) {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("Login error: No response from server");
      } else {
        setError("Login error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-xl py-3 pt-5 rounded-lg mt-16 bg-slate-100">
      <h3 className="text-2xl font-bold text-center">Sign Up</h3>
      <HR className="my-2" />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="px-5 pt-5 pb-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="******"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mx-auto mt-5">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <p className="px-5 text-center">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
