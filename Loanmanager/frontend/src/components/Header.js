import React,{useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {Context as DataContext} from '../context/dataContext'

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  primaryBar: {
    zIndex: 0,
    padding: 12,
  },
  secondaryBar: {
    zIndex: 0,
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { state: {user_type, token, tab},logout, changeTab } = useContext(DataContext);
  const { classes } = props;

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.primaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {user_type==="C"?"User":user_type==="A"?"Agent":"Admin"} Panel
              </Typography>
            </Grid>
            <Grid item>
              <Button className={classes.button} onClick={()=>logout(token)} variant="outlined" color="inherit" size="large">
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        {user_type==="C"?(<Tabs value={tab} textColor="inherit">
          <Tab textColor="inherit" onClick={()=>changeTab(0)} label="My Account" />
            <Tab textColor="inherit" onClick={()=>changeTab(1)} label="My Loans" />
          </Tabs>):(<Tabs value={tab} textColor="inherit">
          <Tab textColor="inherit" onClick={()=>changeTab(0)} label="Users" />
            <Tab textColor="inherit" onClick={()=>changeTab(1)} label="Loans" />
          </Tabs>)}
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);