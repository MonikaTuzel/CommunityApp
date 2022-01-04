import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import DataTableUsers from '../Components/DataTableUsers';
import { makeStyles } from '@mui/styles';
import UsersTableData from '../Components/UsersTableData';


const useStyles = makeStyles({
    btn: {
       
       backgroundColor: 'purple',
       
    }
})

export default function Contacts() {
    const classes = useStyles()

        return(
            <Container>
                <Typography 
                variant='h3' 
                color='textSecondary'
                component='h2'
                align="center"
                gutterBottom>
                Lista użytkowników
                </Typography>
                               
               <UsersTableData  />

            </Container>
        )
    }






// import React,{Component} from 'react';
// import {variables} from '../Variables.js';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// // import './Style/User.css';
// import { maxHeight } from '@mui/system';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import Button from '@mui/material/Button';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import DataTableUsers from '../Components/DataTableUsers';

  
// export class Users extends Component{
    
//     constructor(props){
//         super(props);

//         this.state={
//             users:[],
//             modalTitle:"",
//             shortUserName:"",
//             fullName:"",

//             // usersWithoutFilter:[],
//             // UserName:"",
//             // roleName:"",
//             // shortName:"",

//             // UserNameFilter:"",
//             // UserRoleFilter:"",
//             // usersWithoutFilter:[],

//         }
//     }

//     refreshList(){
//         fetch(variables.API_URL+'users')
//         .then(response=>response.json())
//         .then(data=>{
//             this.setState({users:data, usersWithoutFilter:data});
//         });
//     }

//     componentDidMount(){
//         this.refreshList();
//     }






//     // FilterFn(){
//     //     var UserNameFilter = this.state.UserNameFilter;
        
//     //     var UserRoleFilter = this.state.UserRoleFilter;


//     //     var filteredData=this.state.usersWithoutFilter.filter(
//     //         function(el){
//     //             return 
//     //             el.UserName.toString().toLowerCase().includes(
//     //                 UserNameFilter.toString().trim().toLowerCase()
//     //             )&&
//     //             el.roleName.toString().toLowerCase().includes(
//     //                 UserRoleFilter.toString().trim().toLowerCase()
//     //             )
//     //         }
//     //     );

//     //     this.setState({users:filteredData});
//     // }

//     // changeUserNameFilter = (e)=>{
//     //     this.state.UserNameFilter=e.target.value;
//     //     this.FilterFn();
//     // }
//     // changeUserRoleFilter = (e)=>{
//     //     this.state.UserRoleFilter=e.target.value;
//     //     this.FilterFn();
//     // }

   
//     // sortResult(prop,asc){
//     //     var sortedData=this.state.usersWithoutFilter.sort(function(a,b){
//     //         if(asc){
//     //             return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
//     //         }
//     //         else{
//     //             return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
//     //         }
//     //     });

//     //     this.setState({users:sortedData});
//     // }

    

//     changeShortUserName =(e)=>{
//         this.setState({shortUserName:e.target.value});
//     }
//     changeFullUserName =(e)=>{
//         this.setState({fullName:e.target.value});
//     }

  

//     editClick(us){
//         this.setState({
//             modalTitle:"Edytuj szkołę",
//             ShortName: us.shortName,
//             FullName:us.fullName,
//             StudentScore:us.studentScore,
//             Phone:us.phone,
//             Email:us.email,
//         });
//     }

//     addClick(us){
//         this.setState({
//             modalTitle:"Dodaj nową szkołę",
//             RoleId:us.roleId,
//             ShortName: us.shortName,
//             FullName:us.fullName,
//             StudentScore:us.studentScore,
//             Phone:us.phone,
//             Email:us.email,
//             Password:us.password,            
//         });
//     }
    

//     render(){
//         const {
//             users,
//             modalTitle,
//             shortUserName,
//             fullName,
//             }=this.state;


//         return(
        
//             <div className='bur'>
//                 <h3>Strona użytkowników</h3>
//                 <p>Lista wszystkich użytkowników</p>        
                
//                 {/* <Button className='but' variant="contained" disableElevation
//                     data-bs-toggle="modal"
//                     data-bs-target="#exampleModal"
//                     onClick={() => this.addClick()}>
//                     <PersonAddAltIcon sx={{ fontSize: 35 }} />
//                 </Button> */}
               
//                     <DataTableUsers  />
//                 <div className='blok'>




//                     {/* <div className="input-group mb-3 lok">
//                         <input type="text" className="form-control"
//                             value={shortName}
//                             onChange={this.changeUserName}
//                             placeholder="Szukaj po nazwie szkoły" />
//                     </div>      
//                     <div className="input-group mb-3 lok">
//                         <input type="text" className="form-control"
//                             value={UserName}
//                             onChange={this.changeUserName}
//                             placeholder="Szukaj po skróconej nazwie szkoły" />
//                     </div>  

//                     <div>                        
//                         <Autocomplete   
//                             id="combo-box-demo"
//                             options={users}
//                             getOptionLabel={(option) => option.roleName}
//                             sx={{ width: 300 }}
//                             onChange={this.changeUserRole}
//                             renderInput={(params) => (<TextField {...params} label="Rola" />)}
//                          />                          
//                     </div> */}
                    
//                 </div>
                
//                     <div className='table' >




                    
//                     {/* <TableContainer sx={{ maxHeight: 480 }} >
//                         <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="simple"  >
//                             <TableHead>
//                                 <TableRow>                                
//                                     <TableCell>Nazwa szkoły
                                        
//                                         </TableCell>                                 
//                                     <TableCell align="right">Nazwa
//                                         <button type="button" className="btn btn-light"
//                                             onClick={() => this.sortResult('fullName', true)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
//                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
//                                                 </svg>
//                                             </button>
//                                             <button type="button" className="btn btn-light"
//                                             onClick={() => this.sortResult('fullName', false)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
//                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
//                                                 </svg>
//                                             </button>
//                                     </TableCell>
//                                     <TableCell align="right" >Ilość uczniów
//                                     <button type="button" className="btn btn-light"
//                                             onClick={() => this.sortResult('studentScore', true)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
//                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
//                                                 </svg>
//                                             </button>
//                                         <button type="button" className="btn btn-light"
//                                             onClick={() => this.sortResult('studentScore', false)}>
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
//                                                 <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
//                                             </svg>
//                                         </button>
//                                     </TableCell>
//                                     <TableCell align="center">Telefon</TableCell>
//                                     <TableCell align="center">Email</TableCell>
//                                     <TableCell align="center">Rola
//                                     <button type="button" className="btn btn-light"
//                                             onClick={() => this.sortResult('roleName', true)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
//                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
//                                                 </svg>
//                                             </button>
//                                     </TableCell>
//                                     <TableCell align="center">Opcje</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {users.map((us) => (
//                                     <TableRow
//                                         key={us.fullName}
//                                         sx={'&:last-child td, &:last-child th'}
//                                     >
//                                         <TableCell component="th" scope="row">
//                                             {us.fullName}
//                                         </TableCell>
//                                         <TableCell align="right">{us.shortName}</TableCell>
//                                         <TableCell align="center">{us.studentScore}</TableCell>
//                                         <TableCell align="center">{us.phone}</TableCell>
//                                         <TableCell align="center">{us.email}</TableCell>
//                                         <TableCell align="center">{us.roleName}</TableCell>
//                                         <TableCell align="right">
//                                             <button type="button"
//                                                 className="btn btn-light mr-1"
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#exampleModal"
//                                                 onClick={() => this.editClick(us)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                                     <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
//                                                 </svg>
//                                             </button>

//                                             <button type="button"
//                                                 className="btn btn-light mr-1"
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#exampleModal"
//                                                 onClick={() => this.infoClick(us)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
//                                                     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                                                     <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
//                                                 </svg>
//                                             </button>

//                                             <button type="button"
//                                                 className="btn btn-light mr-1"
//                                                 onClick={() => this.deleteClick(us.fullName)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
//                                                     <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
//                                                 </svg>
//                                             </button>

                                            
//                                         </TableCell>
            
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer> */}
//                 </div>
//                 <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
//                     <div className="modal-dialog modal-lg modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">{modalTitle}</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
//                                 ></button>
//                             </div>

//                             <div className="modal-body">
//                                 <div className="input-group mb-3">
//                                     <span className="input-group-text">Nazwa szkoły</span>
//                                     <input type="text" className="form-control"
//                                         value={fullName}
//                                         onChange={this.changeFullUserName} />
//                                         <span className="input-group-text">Skrócona nazwa szkoły</span>
//                                     <input type="text" className="form-control"
//                                         value={shortUserName}
//                                         onChange={this.changeShortUserName} />
//                                 </div>

//                                 {/* {fullName == "" ?
//                                     <button type="button"
//                                         className="btn btn-primary float-start"
//                                         onClick={() => this.createClick()}
//                                     >Create</button>
//                                     : null} */}

//                                     <button type="button"
//                                         className="btn btn-primary float-start"
//                                         onClick={() => this.updateClick()}
//                                     >Update</button>
//                                     : null

//                             </div>

//                         </div>
//                     </div>
//                 </div>


//             </div>
           

            
//         )
//     }
// }