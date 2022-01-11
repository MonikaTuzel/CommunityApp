import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
    DataGrid,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import React, {useState, useEffect} from 'react'
import {variables} from '../../Variables.js';
import {GridActionsCellItem} from '@mui/x-data-grid-pro';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, Typography } from '@mui/material';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PopupNewUser from './PopupNewUser';


function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  const [openPopup, setOpenPopup] = useState(false)


  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      
      <Typography sx={{
        display: 'flex',
        alignItems: 'center',
        direction: 'column',
        flexWrap: 'wrap',
      }}>      
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Wyszukaj..."
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
      <div>
        <GridToolbarFilterButton />
      </div>
      </Typography>
      <div>
        <Button sx={{ borderRadius: '55px'}} type="submit" color="secondary" variant="contained" 
          onClick={() => setOpenPopup(true)}>
          <PersonAddAlt1OutlinedIcon sx={{ fontSize: 25 }} />
          Dodaj nową szkołę
        </Button>
        <PopupNewUser
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
        </PopupNewUser>
      </div>
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function QuickFilteringGrid() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 80},
        { field: 'shortName', headerName: 'Nazwa Szkoły', width: 130},
        { field: 'fullName', headerName: 'Nazwa', width: 220 },
        { field: 'studentScore', headerName: 'Uczniowie', width: 100 },
        { field: 'phone', headerName: 'Telefon', width: 120 },
        { field: 'email', headerName: 'E-mail', width: 170 },
        { field: 'roleName', headerName: 'Rola', width: 90 },  
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Opcje',
            width: 130,
            cellClassName: 'actions',
            getActions: ({ id }) => {
            //   const isInEditMode = apiRef.current.getRowMode(id) === 'edit';
      
            //   if (isInEditMode) {
            //     return [
            //       <GridActionsCellItem
            //         icon={<SaveIcon />}
            //         label="Save"
            //         // onClick={handleSaveClick(id)}
            //         color="primary"
            //       />,
            //       <GridActionsCellItem
            //         icon={<CancelIcon />}
            //         label="Cancel"
            //         className="textPrimary"
            //         // onClick={handleCancelClick(id)}
            //         color="inherit"
            //       />,
            //     ];
            //   }
      
                return [
                    <GridActionsCellItem
                        icon={<InfoOutlinedIcon />}
                        label="Info"
                        //   onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<EditOutlinedIcon />}
                        label="Edit"
                        className="textPrimary"
                        //   onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteOutlineOutlinedIcon />}
                        label="Delete"
                        //   onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,

                ];
            },
          },      
        ];         
    
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch(variables.API_URL_USERS)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  })

  const [searchText, setSearchText] = useState('');

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = tableData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setTableData(filteredRows);
  };

  React.useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

    return (
        <Box sx={{
            boxShadow: 4,
            bgcolor: 'background.paper',
            height: 600,
            width: 1
        }}>
            <DataGrid
                components={{ Toolbar: QuickSearchToolbar }}
                rows={tableData}
                columns={columns} 
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
            />        
        </Box>
  );
}
