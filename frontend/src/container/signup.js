import React, { useState } from 'react'
import { Container, Grid, TextField, Paper, Button } from '@material-ui/core';
import  * as actions from '../services/auth';
import * as notification  from "../utility/notification";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


const signupStyle = makeStyles(theme =>{
    return ({
    root: {
      width :'400px',
      padding :' 30px 20px',
      margin:'10% auto',
      backgroundColor: '#9e9797'
    },
    textField :{
        margin:'10px 0',
        width: '94%',
    },
    form:{
        padding :'10px'
    },
    button:{
        margin:'10px 0',

    } 
  })});

export default function () {
    const classes = signupStyle();
    const history = useHistory();
    const [ email , setEmail ] = useState(false);
    const [ name , setName ] = useState(false);
    const [ password , setPassword ] = useState(false);
    const [ confirmPassword , setConfirmPassword ] = useState(false);

    const handleSubmit = async () => {

        if(password  !== confirmPassword ){
            return notification.Error('Confirm password did not matched');
        }

        if(!email || !name || !password || !confirmPassword){
            return notification.Error('Please fill all details');
        }

        const { status } = await actions.SignUp({
            email,
            password,
            name
        });

        if( status ){
            notification.Success('Saved Succesfully');
            history.push("/signin");
        }
    }

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" className={classes.root}>
                        <Grid item>
                            <Paper>
                                <form noValidate autoComplete="off"  className={classes.form}>
                                <TextField 
                                        className={classes.textField}
                                        label="Name" 
                                        variant="outlined" 
                                        id="standard-basic"  
                                        value={name?name:''} 
                                        onChange={e=>{setName(e.target.value)}} 
                                    />
                                    <TextField 
                                         className={classes.textField}
                                        label="Email" 
                                        variant="outlined" 
                                        id="standard-basic"  
                                        value={email?email:''} 
                                        onChange={e=>{setEmail(e.target.value)}} 
                                    />
                                    <TextField 
                                     className={classes.textField}
                                        label="Password" 
                                        variant="outlined" 
                                        id="filled-basic" 
                                        value={password?password:''}  
                                        onChange={e=>{setPassword(e.target.value)}}
                                        type="password"
                                    />
                                    <TextField 
                                     className={classes.textField}
                                        label="Confirm Password" 
                                        variant="outlined" 
                                        id="filled-basic" 
                                        value={confirmPassword?confirmPassword:''}  
                                        onChange={e=>{setConfirmPassword(e.target.value)}}
                                        type="password"
                                    />
                                    <div>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        Sign Up
                                    </Button>
                                    </div>
                                    <div>
                                        <a href="/signin">SignIn</a>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}