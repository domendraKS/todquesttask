import React, { useEffect, useState } from "react";
import { Button, HR, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import api from "./axiosBase";
import { useDispatch, useSelector } from "react-redux";
import { signinSuccess } from "../redux/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/signin");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/user/signin", formData);

      if (response.data.success) {
        dispatch(signinSuccess(response.data.user));
        navigate("/");
        return;
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("Sign-In error: No response from server");
      } else {
        setError("Sign-In error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto shadow-xl py-3 pt-5 rounded-lg mt-16 bg-slate-100">
      <h3 className="text-2xl font-bold text-center">Sign In</h3>
      <HR className="my-2" />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="px-5 pt-5 pb-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-2">
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
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
