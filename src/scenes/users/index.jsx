import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

import "./styles.css";
import axios from "axios";
import api from "api";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateNewRow = (values) => {
    userData.push(values);
    api.post("/auth/signup", values).then((res) => console.log(res));
    setUserData([...userData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      userData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      api.put("/user/update", values).then((res) => console.log(res));
      setUserData([...userData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if(window.confirm(`Do you want to delete ${row.getValue("firstName")}`)){
      //send api delete request here, then refetch or update local table data for re-render
      api
        .delete(`/user/delete/${row.getValue("id")}`)
        .then((res) => console.log(res));
      userData.splice(row.index, 1);
      setUserData([...userData]);
      } 
    },
    [userData]
  );

  useEffect(() => {
    api
      .get("/user/all")
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(userData);

  let columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "User ID",
        size: 200,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "role", //normal accessorKey
        header: "Role",
        size: 20,
      },
      {
        accessorKey: "username",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "password",
        header: "Password",
        size: 0,
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
          editingMode="modal"
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Account
            </Button>
          )}
        />
        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </div>
    </div>
  );
};

export default Users;
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map(
              (column) =>
                column.accessorKey !== "id" && (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                )
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
