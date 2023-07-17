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

const AllEvents = () => {
  const [eventData, setEventData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      eventData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      api.put("/event/update", values).then((res) => {
        toast.info("Event Updated!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // console.log(res);
      });
      setEventData([...eventData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (window.confirm(`Do you want to delete ${row.getValue("title")}`)) {
        //send api delete request here, then refetch or update local table data for re-render
        api.delete(`/event/delete/${row.getValue("id")}`).then((res) => {
          toast.error("Event Deleted!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // console.log(res);
        });
        eventData.splice(row.index, 1);
        setEventData([...eventData]);
      }
    },
    [eventData]
  );

  useEffect(() => {
    api
      .get("/event/all")
      .then((res) => setEventData(res.data))
      .catch((err) => console.log(err));
  }, []);

  let columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "location",
        header: "Location",
        size: 150,
      },
      {
        accessorKey: "startDate", //normal accessorKey
        header: "Start Date",
        size: 150,
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        size: 150,
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        size: 150,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        size: 150,
      },
    ],
    []
  );

  return (
    <div className="events-container">
      <h1>All Events</h1>
      <div>
        <MaterialReactTable
          columns={columns}
          data={eventData}
          enableHiding={false}
          initialState={{ columnVisibility: { password: false } }}
          enableClickToCopy={true}
          enableRowNumbers={true}
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
        />
      </div>
    </div>
  );
};

export default AllEvents;
