import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        textAlign:"center"
    },
    newform: {
      width: 400,
      marginTop: theme.spacing(1),
      textAlign:"center"
  },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddLoan = props => {
    const formik3 = useFormik({
        initialValues: {
            user:props.data?props.data.user.id:"",
            principal:props.data?props.data.principal:"",
            interest_rates:props.data?props.data.interest_rates:"",
            tenure:props.data?props.data.tenure:""
        },
        onSubmit: (values) => {
            if(props.data){
              props.submit(props.data.id,values)
            }else{
              props.submit("addloan",values)
            }
        },
        validationSchema: Yup.object().shape({
            user: Yup.number().required(),
            principal:Yup.number().required(),
            interest_rates: Yup.number().required(),
            tenure:Yup.number().required()
        })
    });

    const formik4 = useFormik({
      initialValues: {
          status:""
      },
      onSubmit: (values) => {
        props.submit(props.data.id,values)
      },
      validationSchema: Yup.object().shape({
          status: Yup.string().required()
      })
  });


  const classes = useStyles();

  if(props.user_type==="A"){
    return (
      <form className={classes.form}  onSubmit={formik3.handleSubmit}  autoComplete="off">
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="User Id"
            name="user"
            value={formik3.values.user}
            onChange={formik3.handleChange}
            error={formik3.touched.user && Boolean(formik3.errors.user)}
            helperText={formik3.touched.user && formik3.errors.user}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Principal Ammount"
            name="principal"
            value={formik3.values.principal}
            onChange={formik3.handleChange}
            error={formik3.touched.principal && Boolean(formik3.errors.principal)}
            helperText={formik3.touched.principal && formik3.errors.principal}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="interest_rates"
            label="Interest per Year"
            value={formik3.values.interest_rates}
            onChange={formik3.handleChange}
            error={formik3.touched.interest_rates && Boolean(formik3.errors.interest_rates)}
            helperText={formik3.touched.interest_rates && formik3.errors.interest_rates}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="tenure"
            label="Tenure (months)"
            value={formik3.values.tenure}
            onChange={formik3.handleChange}
            error={formik3.touched.tenure && Boolean(formik3.errors.tenure)}
            helperText={formik3.touched.tenure && formik3.errors.tenure}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Loan
          </Button>
        </form>
    )
  }else if(props.user_type==="M"){
    return(
      <form className={classes.newform}  onSubmit={formik4.handleSubmit}  autoComplete="off">
        <TextField
              variant="outlined"
              margin="normal"
              select
              fullWidth
              name="status"
              label="Loan Status"
              value={formik4.values.status}
              onChange={formik4.handleChange}
              error={formik4.touched.status && Boolean(formik4.errors.status)}
              helperText={formik4.touched.status && formik4.errors.status}
          >
              <MenuItem value="A">
                  Accept
              </MenuItem>
              <MenuItem value="R">
                 Reject
              </MenuItem>
          </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Loan
        </Button>
      </form>
    )
  }else{
    return(<h1>Wrong Page </h1>)
  }
}

export default AddLoan
