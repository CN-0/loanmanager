import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        textAlign:"center"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const UserForm = props => {
    const formik2 = useFormik({
        initialValues: {
            email:props.data.email,
            username:props.data.username,
            password:"",
            user_type:props.data.user_type
        },
        onSubmit: (values) => {
            props.submit(props.data.id,values)
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required().email(),
            username:Yup.string().required().max(50),
            password: Yup.string(),
            user_type:Yup.string().required()
        })
    });

    const classes = useStyles();
    return (
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
            Change
          </Button>
        </form>
    )
}

export default UserForm
