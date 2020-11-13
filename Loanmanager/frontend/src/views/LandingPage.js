import React, {useContext, useState} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {Context as DataContext} from '../context/dataContext'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        textAlign:"center"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LandingPage =()=> {
    const {
        state: {token,loading, username},
        login,
        register
        } = useContext(DataContext);

    const [loginPage, setLoginPage] = useState(true)
        
    const formik = useFormik({
        initialValues: {
            username:"",
            password:""
        },
        onSubmit: (values) => {
            login(values)
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(),
            password: Yup.string().required()
        })
    });
    const formik2 = useFormik({
        initialValues: {
            email:"",
            username:"",
            password:"",
            user_type:""
        },
        onSubmit: (values) => {
            console.log(values)
            register(values)
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required().email(),
            username:Yup.string().required().max(50),
            password: Yup.string().required(),
            user_type:Yup.string().required()
        })
    });
  const classes = useStyles();

  let form = (
  <form className={classes.form}  onSubmit={formik.handleSubmit}  autoComplete="off">
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label="Username"
      name="username"
      value={formik.values.username}
      onChange={formik.handleChange}
      error={formik.touched.username && Boolean(formik.errors.username)}
      helperText={formik.touched.username && formik.errors.username}
    />
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      name="password"
      label="Password"
      type="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Sign In
    </Button>
    <Link onClick={()=>setLoginPage(false)}  variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
  </form>
  )

  if(!loginPage){
      form=(
        <form className={classes.form}  onSubmit={formik2.handleSubmit}  autoComplete="off">
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            value={formik2.values.email}
            onChange={formik2.handleChange}
            error={formik2.touched.email && Boolean(formik2.errors.email)}
            helperText={formik2.touched.email && formik2.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            value={formik2.values.username}
            onChange={formik2.handleChange}
            error={formik2.touched.username && Boolean(formik2.errors.username)}
            helperText={formik2.touched.username && formik2.errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formik2.values.password}
            onChange={formik2.handleChange}
            error={formik2.touched.password && Boolean(formik2.errors.password)}
            helperText={formik2.touched.password && formik2.errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            select
            fullWidth
            name="user_type"
            label="Select Usertype"
            value={formik2.values.user_type}
            onChange={formik2.handleChange}
            error={formik2.touched.user_type && Boolean(formik2.errors.user_type)}
            helperText={formik2.touched.user_type && formik2.errors.user_type}
        >
            <MenuItem value="C">
                Customer
            </MenuItem>
            <MenuItem value="A">
                Agent
            </MenuItem>
            <MenuItem value="M">
                Admin
            </MenuItem>
        </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link onClick={()=>setLoginPage(true)}  variant="body2">
                {"Already have an account? Sign In"}
              </Link>
        </form>
        )
  }

  return (
    <Grid container className={classes.main} component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {loginPage?"Sign in":"Sign up"}
            </Typography>
            {form}
        </div>
      </Grid>
    </Grid>
  );
}

export default LandingPage