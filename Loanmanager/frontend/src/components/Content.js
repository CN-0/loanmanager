import React,{useContext,useEffect, useState} from 'react';
import {Context as DataContext} from '../context/dataContext'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EnhancedTable from '../components/Table'
import * as classes from './Content.css'
import DataDialog from './DataDialog'
import UserForm from './UserForm'
import AddLoan from './AddLoan'

const userColumns  = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'user_type', numeric: false, disablePadding: false, label: 'Usertype' },
  { id: 'details', numeric: false, disablePadding: false, label: 'Details' },
  { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' }
];


const loanColumns = [
  { id: 'id',numeric:false,disablePadding:true, label: 'ID' },
  { id: 'username',numeric:false,disablePadding:true, label: 'Username' },
  { id: 'user_id',numeric:false,disablePadding:true, label: 'User ID' },
  { id: 'principal',numeric:false,disablePadding:true, label: 'Principal' },
  { id: 'interest_rates',numeric:false,disablePadding:true, label: 'Interest Rate / Year' },
  { id: 'tenure',numeric:false,disablePadding:true, label: 'Tenure' },
  { id: 'emi',numeric:false,disablePadding:true, label: 'EMI' },
  { id: 'total_interest',numeric:false,disablePadding:true, label: 'Total Interest' },
  { id: 'status',numeric:false,disablePadding:true, label: 'Status' },
  { id: 'details', numeric: false, disablePadding: false, label: 'Details' }
];

const editColumn = { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' }

function Content(props) {
  const { state: {user_type, username, email, id, tab, loans, token, users},userLoan,getUsers,getLoans,editUsers,addLoans,updateLoans,updateStatus } = useContext(DataContext);
  const [dataDialogData, setDataDialogData] = useState(null)
  const [editDialogData, setEditDialogData] = useState(null)
  const [openAddLoan, setOpenAddLoan]=useState(false)
  const [editLoanData, setEditLoanData]=useState(null)

  useEffect(()=>{
    if(user_type==="C"){
      userLoan(token)
    }else{
      getUsers(token)
      getLoans(token)
    }
  },[])

  const handleView = data =>{
    if(tab===0){
      setDataDialogData({...data})  
    }else{
      let user = {...data.user}
      delete data.user
      setDataDialogData({userid:user.id,username:user.username,email:user.email,usertype:user.user_type,...data})
    }
  }

  const handleEdit = (data) =>{
    if(tab===0){
      setEditDialogData({...data})  
    }else{
      setEditLoanData({...data})
      setOpenAddLoan(true)
    }
  }

  const formSumitted = (sid,values) =>{
    if(openAddLoan){
      if(user_type==="A"){
        if(sid==="addloan"){
          addLoans(token,{...values},[...loans])
          setOpenAddLoan(false)
        }else{
          updateLoans(token,{...values},[...loans],sid)        
          setOpenAddLoan(false)
          setEditLoanData(null)
        }
      }else{
        updateStatus(token,{...values},[...loans],sid)
          setEditLoanData(null)        
          setOpenAddLoan(false)
      }
    }else{
      editUsers(sid,{...values},token,[...users])
      setEditDialogData(null)
    }
  } 

  let content

  if(tab===0){
    if(user_type ==="C"){
      content = (<div className={classes.contentWrapper}>
        <Typography color="textPrimary" className={classes.text}>
          ID : {id}
        </Typography>
        <Typography color="textPrimary" className={classes.text}>
          Username : {username}
        </Typography>
        <Typography color="textPrimary" className={classes.text}>
          Email : {email}
        </Typography>
        <Typography color="textPrimary" className={classes.text}>
          Usertype : Customer
        </Typography>
      </div>)
    }else{
      content = (<EnhancedTable rows={users} columns={userColumns} user_type={user_type} tab={tab} viewed={handleView} edit={handleEdit} name={"User"} />)
    }
  }else{
    if(user_type==="C"){
      content = (<EnhancedTable rows={loans} columns={loanColumns} viewed={handleView} addLoan={()=>setOpenAddLoan(true)} tab={tab} edit={handleEdit} user_type={user_type}  name={"Loan"} />)
    }else{
      content = (<EnhancedTable rows={loans} columns={[...loanColumns,{...editColumn}]} viewed={handleView} addLoan={()=>setOpenAddLoan(true)} tab={tab} edit={handleEdit} user_type={user_type}  name={"Loan"} />)
    }
  }

  return (
    <Paper className={classes.paper}>      
      {content}
      <DataDialog open={dataDialogData!==null} data={dataDialogData} tab={tab}  handleClose={()=>setDataDialogData(null)}>
      {dataDialogData?Object.keys(dataDialogData).map(key=>{
       return (<div style={{margin:"0px 80px 8px",fontSize:"18px"}} key={key}>{key}<span style={{margin:"0px 10px"}}>:</span>{dataDialogData[key]}</div>)
      }):null}
      </DataDialog>
    <DataDialog open={editDialogData!==null} tab={tab}  handleClose={()=>setEditDialogData(null)}>{editDialogData?<UserForm data={editDialogData} submit={formSumitted} />:null}</DataDialog>
    <DataDialog open={openAddLoan} tab={tab}  handleClose={()=>setOpenAddLoan(false)}><AddLoan data={editLoanData} user_type={user_type} submit={formSumitted} /></DataDialog>
    </Paper>
  );
}

export default Content;