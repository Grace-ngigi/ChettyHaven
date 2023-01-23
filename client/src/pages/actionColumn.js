  export const actionColumn = [
    {
      field: "action",
      headerName:"Action",
      width: 200,
      renderCell: () => {
        return(
          <div className="cellAction">
            <div className="viewButton">View</div>
            <div className="editButton">Edit</div>
          </div>
        )
      }
    }
  ]