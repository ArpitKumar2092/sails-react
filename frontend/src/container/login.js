import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Container, Grid, TextField, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  * as actions from '../services/auth';
import { get as getToken } from "../utility/authTokenHandler";

const loginStyle = makeStyles(theme =>{
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
    const classes = loginStyle();
    const [ email , setEmail ] = useState('arpitkumar2092@gmail.com');
    const [ password , setPassword ] = useState('12345');
    const history = useHistory();
     
    const handleSubmit = async () => {
        const  status = await actions.Login({
            email,
            password
        });

        if(status){
            window.setInterval(function(){
                if(getToken() !== ''){
                    history.push("/watch-news");
                }
                console.log('111');
            }, 1000);
            
        }
    }

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Grid container justify="center" className={classes.root}>
                        <Grid item >
                            <Paper>
                                <form noValidate autoComplete="off"  className={classes.form}>
                                    <div></div>
                                    <TextField 
                                      
                                        className={classes.textField}
                                        label="Email" 
                                        variant="outlined" 
                                        id="standard-basic"  
                                        value={email} 
                                        onChange={e=>{setEmail(e.target.value)}} 
                                    />
                                    <TextField 
                                        className={classes.textField}
                                        label="Password" 
                                        variant="outlined" 
                                        id="filled-basic" 
                                        value={password}  
                                        onChange={e=>{setPassword(e.target.value)}}
                                        type="password"
                                    />
                                    <div>
                                    <Button variant="contained" color="primary"  onClick={handleSubmit}  className={classes.button}>
                                        Login
                                    </Button>
                                    </div>
                                    <div>
                                        <a href="/signup">Signup</a>
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

