import { variables } from '../../Variables.js';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridToolbarFilterButton,
  GridToolbar
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PopupNewTown from './PopupNewTown';
import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {

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
      <div>
        <GridToolbarFilterButton />       
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
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
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function QuickFilteringGrid() {
 
  const [openPopupTown, setOpenPopupTown] = useState(false)

  const [searchText, setSearchText] = React.useState('');

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

  const [tableData, setTableData] = useState([])
  const columns = [
    { field: 'province', headerName: 'Województwo', width: 120 },
    { field: 'commune', headerName: 'Gmina', width: 120 },
    { field: 'district', headerName: 'Powiat', width: 100 },
    { field: 'townName', headerName: 'Miasto', width: 100 },
    { field: 'code', headerName: 'Kod pocztowy', width: 120 },
    { field: 'street', headerName: 'Ulica', width: 100 },
    { field: 'number', headerName: 'Numer', width: 70 },
    { field: 'userName', headerName: 'Nazwa szkoły', width: 180 },
    { field: 'userEmail', headerName: 'E-mail', width: 160 },
  ];

  useEffect(() => {
    fetch(variables.API_URL_ADRESS_BROWSE)
      .then((data) => data.json())
      .then((data) => setTableData(data))
    },[]);

  React.useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  return (
    <Box sx={{
        boxShadow: 4,
        bgcolor: 'background.paper',
        height: 480,
        width: 1
      }}>
         <Button sx={{ borderRadius: '55px', m: 1}} 
         type="submit" color="secondary" variant="contained"
          onClick={() => setOpenPopupTown(true)}>
          <AddCircleOutlineOutlinedIcon sx={{ fontSize: 25, mr:1 }} />
          Miasto
        </Button>

        <PopupNewTown
          openPopupTown={openPopupTown}
          setOpenPopupTown={setOpenPopupTown}>
        </PopupNewTown>
      <DataGrid     
        components={{ Toolbar: GridToolbar }}
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
