import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deluser } from "../../Redux/actions";

const TableData = ({ user }) => {
  
  const dispatch = useDispatch();
  return (
    <div className="row mx-2">
      <div className="col">#{user.id.length > 1 ? user.id[2] : user.id}</div>
      <div className="col">{user.fullName}</div>
      <div className="col">{user.email}</div>
      <div className="col">{user.phoneNumber}</div>
      <div className="col">{user.password}</div>

      <button
        className="btn btn-danger"
        onClick={() => dispatch(deluser(user.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default TableData;
