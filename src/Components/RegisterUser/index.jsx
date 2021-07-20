import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import {v1 as uuid} from 'uuid'
import { nanoid } from "nanoid";
import "./style.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import {
  MainWraper,
  HeaderStyle,
  Styledform,
  InputStyle,
  Button,
  ParaStyled,
} from "../../StyledComponents/RegisterStyled";

import { addUser } from "../../Redux/actions";
const Forms = () => {
  //states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  let dispatch = useDispatch()

  //Extra fuctions

  //handel Edit
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //save edit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
      password: editFormData.password,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  //edit click function
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      password: contact.password,
    };

    setEditFormData(formValues);
  };

  //cancel function
  const handleCancelClick = () => {
    setEditContactId(null);
  };

  //delete function
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  //submit function
  const handeSubmit = (e) => {
    e.preventDefault();
    let emaill = email;
    let userNamee = username;
    let mobilenoo = phone;
    let passwordd = password;
    let cpasswordd = cpassword;
    let formIsValid = true;
    let error = "";

    if (!cpasswordd) {
      error = "Please confirm password!!";
      document.getElementById("epass2").innerHTML = error;
      formIsValid = false;
    } else if (passwordd !== cpasswordd) {
      error = "Password are not same!!";
      document.getElementById("epass2").innerHTML = error;
      formIsValid = false;
    } else {
      error = "";
      document.getElementById("epass2").innerHTML = error;
    }
    //password
    if (!passwordd) {
      error = "Please enter password!!";
      document.getElementById("epass").innerHTML = error;
      formIsValid = false;
    } else if (passwordd.length < 7) {
      error = "Enter 7 or more characters!";
      document.getElementById("epass").innerHTML = error;
      formIsValid = false;
    } else {
      error = "";
      document.getElementById("epass").innerHTML = error;
    }
    //phone
    if (!mobilenoo) {
      error = "Please enter Mobile no!!";
      document.getElementById("ephone").innerHTML = error;
      formIsValid = false;
    } else if (typeof mobilenoo !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);

      if (!pattern.test(mobilenoo)) {
        formIsValid = false;
        error = "Please enter only number in mobile no.";
        document.getElementById("ephone").innerHTML = error;
      } else if (mobilenoo.length != 10) {
        formIsValid = false;
        error = "Please enter valid phone number.";
        document.getElementById("ephone").innerHTML = error;
      } else {
        error = "";
        document.getElementById("ephone").innerHTML = error;
      }
    } else {
      error = "";
      document.getElementById("ephone").innerHTML = error;
    }

    //username
    if (!userNamee) {
      error = "Please enter Username";
      document.getElementById("ename").innerHTML = error;
      formIsValid = false;
    } else if (userNamee.length < 4) {
      error = "Please enter Valid Username";
      document.getElementById("ename").innerHTML = error;
      formIsValid = false;
    } else {
      error = "";
      document.getElementById("ename").innerHTML = error;
    }
    //email
    if (!emaill) {
      error = "Please enter email";
      document.getElementById("eemail").innerHTML = error;
      formIsValid = false;
    } else if (emaill.length < 5) {
      error = "Please enter valid email";
      document.getElementById("eemail").innerHTML = error;
      formIsValid = false;
    } else if (typeof emaill !== "undefined") {
      // if (typeof emaill !== 'undefined') {
      let lastAtPos = emaill.lastIndexOf("@");
      let lastDotPos = emaill.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          emaill.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          emaill.length - lastDotPos > 2
        )
      ) {
        error = "Email is not valid";
        document.getElementById("eemail").innerHTML = error;
        formIsValid = false;
      } else {
        error = "";
        document.getElementById("eemail").innerHTML = error;
      }
      // }
    } else {
      error = "";
      document.getElementById("eemail").innerHTML = error;
    }
    //form submitting
    if (formIsValid === true) {
      error = "";
      dispatch(addUser({
         id: uuid(),
        fullName: username,
        phoneNumber: phone,
        email: email,
        password: password,
      }))
      const newContact = {
        id: nanoid(),
        fullName: username,
        phoneNumber: phone,
        email: email,
        password: password,
      };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setCpassword("");
    }
  };

  //render form
  const DisplayForm = () => {
    return (
      <MainWraper>
        <Styledform>
          <HeaderStyle>Create an account</HeaderStyle>

          <InputStyle
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            placeholder="Username"
          />

          <ParaStyled id="ename"></ParaStyled>
          <InputStyle
            type={"email"}
            autoComplete={"off"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            id={"email"}
            placeholder={"Email Address"}
          />
          <ParaStyled id="eemail" className="error-msg"></ParaStyled>

          <InputStyle
            type={"text"}
            autoComplete={"off"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name={"phone"}
            id={"phone"}
            placeholder={"Mobile Number"}
          />
          <ParaStyled id="ephone"></ParaStyled>

          <InputStyle
            type={"password"}
            autoComplete={"off"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={"password"}
            id={"password"}
            placeholder={"Password"}
          />
          <ParaStyled id="epass"></ParaStyled>

          <InputStyle
            type={"password"}
            autoComplete={"off"}
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            name={"cpassword"}
            id={"cpassword"}
            placeholder={"Confirm Password"}
          />
          <ParaStyled id="epass2" ></ParaStyled>
          <Button primary type="submit"  onClick={handeSubmit} > Submit </Button>
        </Styledform>
      </MainWraper>
    );
  };

  //render table
  const DisplayTable = () => {
    return (
      <>
        {/* table for displaying data */}
        <div className="table-responsive">
          <form onSubmit={handleEditFormSubmit}>
            <table className="table table-sm table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col"> Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <Fragment>
                    {editContactId === contact.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        contact={contact}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </>
    );
  };

  return (
    <>
      {DisplayForm()}
      {DisplayTable()}
    </>
  );
};

export default Forms;
