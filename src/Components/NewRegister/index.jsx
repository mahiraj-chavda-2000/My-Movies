import { v1 as uuid } from "uuid";
import React, { useState } from "react";
import {
  MainWraper,
  HeaderStyle,
  Styledform,
  InputStyle,
  Button,
  ParaStyled,
} from "../../StyledComponents/RegisterStyled";
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    conformPassword: "",
    name: "",
    contact: "",
  });
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });

    // validation(name, value);
  };
  const validation = (name, value) => {
    switch (name) {
      case "name":
        if (!value && value.trim().length <= 0) {
          return "Name is Required";
        } else if (value.trim().length < 4) {
          return "Invalid Username";
        } else {
          return "";
        }

      case "email":
        if (!value && value.trim().length <= 0) {
          return "Fill Email Field";
        } else if (typeof value !== "undefined") {
          let lastAtPos = value.lastIndexOf("@");
          let lastDotPos = value.lastIndexOf(".");
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              value.indexOf("@@") == -1 &&
              lastDotPos > 2 &&
              value.length - lastDotPos > 2
            )
          ) {
            return "Email is not valid";
          } else {
            return "";
          }
        } else {
          return "";
        }

      case "contact":
        if (!value) {
          return "Fill Mobileno";
        } else if (typeof value !== "undefined") {
          var pattern = new RegExp(/^[0-9\b]+$/);

          if (!pattern.test(value)) {
            return "Please enter only number in mobile no.";
          } else if (value.length != 10) {
            return "Please enter valid phone number.";
          } else {
            return "";
          }
        } else {
          return "";
        }

      case "password":
        if (!value && value.trim().length <= 0) {
          return "Fill Password!";
        } else if (value) {
          const mediumRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          );
          if (!mediumRegex.test(value)) {
            return "It should contain at least one upper case,one lower case ,one digit,one Special character,8 characters in length";
          } else {
            return "";
          }
        } else {
          return "";
        }

      case "conformPassword":
        if (userDetails.password !== value) {
          return "your value is not match!";
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
    const newRecord = { ...userDetails };
    setRecords({ ...records, newRecord });
    console.log(records);
  };
  return (
    <MainWraper>
      <Styledform>
        <HeaderStyle>Create an account</HeaderStyle>
        <InputStyle
          type="text"
          name="name"
          value={userDetails.name || ""}
          placeholder="Name"
          onChange={handleChange}
        />
        <ParaStyled>{errors.name}</ParaStyled>

        <InputStyle
          type="email"
          name="email"
          value={userDetails.email || ""}
          placeholder="Enter email"
          onChange={handleChange}
        />
        <ParaStyled>{errors.email}</ParaStyled>

        <InputStyle
          type="text"
          name="contact"
          value={userDetails.contact || ""}
          placeholder="Enter Mobile Number"
          onChange={handleChange}
        />
        <ParaStyled>{errors.contact}</ParaStyled>

        <InputStyle
          type="password"
          name="password"
          value={userDetails.password || ""}
          placeholder="Enter password"
          onChange={handleChange}
        />
        <ParaStyled>{errors.password}</ParaStyled>

        <InputStyle
          type="password"
          name="conformPassword"
          value={userDetails.conformPassword || ""}
          placeholder="Confirm password"
          onChange={handleChange}
        />
        <ParaStyled>{errors.conformPassword}</ParaStyled>
        <Button secondary type="submit" onClick={handleSubmit}>
          {" "}
          Register{" "}
        </Button>
      </Styledform>
    </MainWraper>
  );
};
export default Register;
