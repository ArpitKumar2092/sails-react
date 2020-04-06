
import React , { useState , useEffect } from 'react';

 import   NewsCard  from "../component/newsPreview";
 import AddIcon from '@material-ui/icons/Add';
 import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as newsActions from '../services/news';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#fde7e7',
    height:'100%'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  addbutton:{
    position:'fixed',
    right:'10px',
    bottom:'30px',
  }
}));

export default function News() {
  const classes = useStyles();
  const [ newsList , setNewsList ] = useState([]);
  useEffect(()=>{
    newsActions.getNews().then( data => {console.log(data);setNewsList([...data]);} );
  } , [])

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
            {
              newsList.length === 0 ?
              ( <h4>No News To Show</h4> )
            : 
              (
                newsList.map(news=><Grid spacing={2}>
                    <NewsCard {...news}/>
                  </Grid>
                )
              )
            }            
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" href="/create" className={classes.addbutton}>
            <AddIcon />
         </Fab>
    </Grid>

  );
}
