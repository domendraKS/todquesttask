import React from "react";
import { Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/userSlice";
import api from "./axiosBase";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //signout
  const handleSignout = async () => {
    try {
      const res = await api.post("/user/signout");

      if (!res.data.success) {
        console.log(data);
      } else {
        dispatch(signoutSuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Tasks
        </span>
      </Link>

      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <span className="border px-4 py-1 rounded-md shadow-md bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 hover:shadow-lg transition duration-300">
              {currentUser.name}{" "}
              <span className="ml-1 text-gray-600">&#9662;</span>
            </span>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">@{currentUser.name}</span>
            <span className="block text-sm font-medium truncate">
              @{currentUser.email}
            </span>
          </Dropdown.Header>

          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>Sign-out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to="/signin">
          <Button outline>Sign In</Button>
        </Link>
      )}
    </Navbar>
  );
};

export default Header;
