import React, {useState, useEffect} from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import LaunchIcon from '@mui/icons-material/Launch';
import Header from "../../components/Header";
import { actionColumn } from "../actionColumn";

const Rescue = () => {
//Api call
  const [pets, setPets] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5050/rescue/')
    .then(response => setPets(response.data))
    .catch(err => console.error(err));
    }, [])
    const rescues = pets.map((pet) => pet)
  
    //theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "images",
      headerName: "Pet Type",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        for(let img of params.row.images){
        return(
          <div className="img">
            <img className="cellImg"src={img.url} alt="Adopt Pet"/>
            {params.row.petType}
          </div>
        )
      }
    }
    },
    {
      field: "location",
      headerName: "location",
      flex:1
    },
    {
      field: "desc",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "fname",
      headerName: "Rescuer",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "condition",
      headerName: "Condition",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <CheckIcon />}
            {access === "manager" && <LoopIcon />}
            {access === "user" && <LaunchIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="RESCUE" subtitle="Managing the Rescued Pets" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
        checkboxSelection 
        getRowId={(row) => row._id} 
        rows={rescues} 
        columns={columns.concat(actionColumn)}
        components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Rescue;
