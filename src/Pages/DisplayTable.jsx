
import React from "react";
import TableData from "../Components/NewRegister/TableData";
import { useSelector } from "react-redux";

const DisplayTable = () => {
  const users = useSelector((state) => state);
  return (
    <div className="my-3">
      {users.map((user) => {
        return <TableData key={user.id} user={user} />;
      })}
    </div>
  );
};

export default DisplayTable;
