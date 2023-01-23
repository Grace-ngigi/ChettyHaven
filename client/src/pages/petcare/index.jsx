import React, {useState, useEffect} from "react";
import axios from "axios";import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { actionColumn } from "../actionColumn";

const Petcare = () => {
  //Api call
  const [pets, setPets] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5050/petcare/')
    .then(response => setPets(response.data))
    .catch(err => console.error(err));
    }, [])
    const petcares = pets.map((pet) => pet)

    //theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName:"Action",
  //     width: 200,
  //     renderCell: () => {
  //       return(
  //         <div className="cellAction">
  //           <div className="viewButton">View</div>
  //           <div className="editButton">Edit</div>
  //         </div>
  //       )
  //     }
  //   }
  // ]

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "petType",
      headerName: "Species",
      flex: 1,
    },
    {
      field: "images",
      headerName: "Pet Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        for(let img of params.row.images){
        return(
          <div className="img">
            <img className="cellImg"src={img.url} alt="Adopt Pet"/>
            {params.row.petName}
          </div>
        )
      }
    }
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
    },
    {
      field: "need",
      headerName: "Special Need",
      flex: 1,
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="PETCARE"
        subtitle="List of pets in petcare"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          rows={petcares}
          columns={columns.concat(actionColumn)}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Petcare;
