import React, {useState, useEffect} from 'react'
import {variables} from '../Variables.js';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//import './DataTableUsers.css';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';


import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';



function EditToolbar(props) {
    const { apiRef } = props;
  
    const handleClick = () => {
      const id = id();
      apiRef.current.updateRows([{ id, isNew: true }]);
      apiRef.current.setRowMode(id, 'edit');
      // Wait for the grid to render with the new row
      setTimeout(() => {
        apiRef.current.scrollToIndexes({
          rowIndex: apiRef.current.getRowsCount() - 1,
        });
  
        apiRef.current.setCellFocus(id, 'name');
      });
    };
  
    return (
      <GridToolbarContainer>
        
      </GridToolbarContainer>
    );
  }
  
  EditToolbar.propTypes = {
    apiRef: PropTypes.shape({
      current: PropTypes.object.isRequired,
    }).isRequired,
  };
  
  export default function FullFeaturedCrudGrid() {
    const apiRef = useGridApiRef();
  
    const handleRowEditStart = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleRowEditStop = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleCellFocusOut = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleEditClick = (id) => (event) => {
      event.stopPropagation();
      apiRef.current.setRowMode(id, 'edit');
    };
  
    const handleSaveClick = (id) => (event) => {
      event.stopPropagation();
      apiRef.current.commitRowChange(id);
      apiRef.current.setRowMode(id, 'view');
  
      const row = apiRef.current.getRow(id);
      apiRef.current.updateRows([{ ...row, isNew: false }]);
    };
  
    const handleDeleteClick = (id) => (event) => {
      event.stopPropagation();
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };
  
    const handleCancelClick = (id) => (event) => {
      event.stopPropagation();
      apiRef.current.setRowMode(id, 'view');
  
      const row = apiRef.current.getRow(id);
      if (row.isNew) {
        apiRef.current.updateRows([{ id, _action: 'delete' }]);
      }
    };
    
const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'shortName', headerName: 'Nazwa Szkoły', width: 130},
    { field: 'fullName', headerName: 'Nazwa', width: 250 },
    { field: 'studentScore', headerName: 'Uczniowie', width: 100 },
    { field: 'phone', headerName: 'Telefon', width: 120 },
    { field: 'email', headerName: 'E-mail', width: 170 },
    { field: 'roleName', headerName: 'Rola', width: 90 },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Opcje',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = apiRef.current.getRowMode(id) === 'edit';
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
                color="primary"
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];         

  const [tableData, setTableData] = useState([])

 useEffect(() => {
    fetch(variables.API_URL+'users')
    .then((data) => data.json())
    .then((data) => setTableData(data))
 })

  return (
    <div style={{height: 450, width: 1100}}>
          <div className='addIcon'>
               <Button type="submit" color="secondary" variant="contained"
                    onClick={() => this.addClick()}>
                    <PersonAddAlt1OutlinedIcon sx={{ fontSize: 25 }}/>                    
                      Dodaj nową szkołę
                </Button>
          </div>
      

      
      <DataGridPro
          rows={tableData}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onCellFocusOut={handleCellFocusOut}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}          
          />          
    </div>
  )

  }
  

  
