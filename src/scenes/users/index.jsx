import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

import "./styles.css";
import axios from "axios";

const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/getUsers")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(userData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "User ID",
        size: 200,
      },
      {
        accessorKey: "username",
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "role", //normal accessorKey
        header: "Role",
        size: 20,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
    ],
    []
  );
  return (
    <div className="users-container">
      <h1>All Users</h1>
      <div>
        <MaterialReactTable
          columns={columns}
          data={userData}
          enableHiding={false}
          enableClickToCopy={true}
          enableRowNumbers={true}
          // enableRowSelection={true}
          // getRowCanExpand={true}
        />
      </div>
    </div>
  );
};

export default Users;
