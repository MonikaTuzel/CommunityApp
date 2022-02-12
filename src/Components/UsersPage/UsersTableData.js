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
import React, { useState, useEffect } from 'react'
import { variables } from '../../Variables.js';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, Typography } from '@mui/material';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PopupNewUser from './PopupNewUser';
import PopupEditUser from './PopupEditUser';
import PopupInfoUser from './PopupInfoUser';


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
        {/* <TextField
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
        /> */}
        <div>
          <GridToolbarFilterButton />
        </div>
      </Typography>
      <div>
        <Button sx={{ borderRadius: '55px' }} type="submit" color="secondary" variant="contained"
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

  const [openPopupEditUser, setOpenPopupEditUser] = useState(false)
  const [openPoupInfoUser, setOpenPoupInfoUser] = useState(false)
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'shortName', headerName: 'Nazwa Szkoły', width: 130 },
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
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<InfoOutlinedIcon />}
            label="Info"
            color="inherit"
            onClick={async () => {
              await getInfo(params.id).then(() => {
                setOpenPoupInfoUser(true);
              })
            }}
          />,
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={async () => {
              await getInfo(params.id).then(() => {
                setOpenPopupEditUser(true);
              })
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
            color="inherit"
          />,

        ];
      },
    },
  ];

  const [tableData, setTableData] = useState([])
  const [user, setUser] = useState()
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(tableData.rows);
  const [dataTown, setDataTown] = useState()

  // const requestSearch = (searchValue) => {
  //   setSearchText(searchValue);
  //   const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
  //   const filteredRows = tableData.rows.filter((row) => {
  //     return Object.keys(row).some((field) => {
  //       return searchRegex.test(row[field].toString());
  //     });
  //   });
  //   setRows(filteredRows);
  // };
  
  useEffect(() => {
    setRows(tableData.rows);
  }, [tableData.rows]);

  function refreshPage() {
    window.location.reload();
}

  const getInfo = async (id) => {
    let element = tableData.find(el => el.id == id)
    setUser(element)
    console.log(element, "elementUser");

    await fetch(variables.API_URL_ADRESS +`/${id}`)
    .then((data) => data.json())
    .then((data) => setDataTown(data));

    console.log(dataTown, "elementTown");
  }    

  const deleteUser = React.useCallback(
    (id) => () => {

      const options = {
        method: 'DELETE',
  
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      fetch(variables.API_URL_USERS + `/${id}`, options).then(() => {
        setTimeout(() => {
          setTableData((prevRows) => prevRows.filter((row) => row.id !== id));
        });
      }).then(refreshPage)
    },
    [],
  );

  useEffect(() => {
    fetch(variables.API_URL_USERS)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, []);

  return (
    <Box sx={{
      boxShadow: 4,
      bgcolor: 'background.paper',
      height: 500,
      width: 1
    }}>
      <PopupEditUser
        openPopupEditUser={openPopupEditUser}
        setOpenPopupEditUser={setOpenPopupEditUser}
        user={user}>
      </PopupEditUser>

      <PopupInfoUser
        openPoupInfoUser={openPoupInfoUser}
        setOpenPoupInfoUser={setOpenPoupInfoUser}
        user={user}
        dataTown = {dataTown}
       >
      </PopupInfoUser>

      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        rows={tableData}
        columns={columns}
        // componentsProps={{
        //   toolbar: {
        //     value: searchText,
        //     onChange: (event) => requestSearch(event.target.value),
        //     clearSearch: () => requestSearch(''),
        //   },
        // }}
      />
    </Box>

  );
}
