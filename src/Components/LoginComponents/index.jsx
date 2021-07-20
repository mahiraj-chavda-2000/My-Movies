import React, { useState } from "react";

import {
  MainWraper,
  HeaderStyle,
  Styledform,
  InputStyle,
  Button,
  ParaStyled,
} from "../../StyledComponents/RegisterStyled";

const LoginPage = () => {
  const [records, setRecords] = useState([]);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const validation = (name, value) => {
    switch (name) {
      case "email":
        if (!value) {
          return "Email is required";
        } else {
          return " ";
        }
      case "password":
        if (!value) {
          return "Password is required";
        } else {
          return " ";
        }
      default: {
        return " ";
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};
    Object.keys(userDetails).forEach((name) => {
      const error = validation(name, userDetails[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return true;
    }
    console.log("Submitted");
  };

  return (
    <MainWraper>
      <Styledform>
        <HeaderStyle>Login</HeaderStyle>

        <InputStyle
          type="email"
          value={userDetails.email || ""}
          onChange={handleChange}
          name="email"
          placeholder="Email Address"
        />
        <ParaStyled>{errors.email}</ParaStyled>

        <InputStyle
          type="password"
          value={userDetails.password || ""}
          onChange={handleChange}
          name="password"
          id="password"
          placeholder="Password"
        />
        <ParaStyled>{errors.password}</ParaStyled>

        <Button type="submit" onClick={handleSubmit} > Submit </Button>
      </Styledform>
    </MainWraper>
  );
};

export default LoginPage;
