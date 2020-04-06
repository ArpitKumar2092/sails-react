import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField , TextareaAutosize, Button } from '@material-ui/core';
import ImageUploader from 'react-images-upload'
import { UploadImage , addNews , updateNews , getNews} from "../services/news";
import * as notification  from "../utility/notification";
import {  useParams } from "react-router-dom";
import { baseURL } from "../config";


const useStyles = makeStyles(theme => ({
  root: {
    width:'80%',
    margin: '0 auto',
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
        backgroundColor: '#FFF'
    },
    '& .textAera' :{
      margin: theme.spacing(1),
        width:'100%'
      }
  },
  imageDD:{
    width:'80% !important'
  }
}));

const getImageUrl = (image) => {
  let img = false;
  try {
      img = image[0].fd;
  } catch (E) { }
  if (!img) {
      return (false);
  } else {
      return `${baseURL}/images/${img}`;
  }
}

export default function MultilineTextFields() {

  let { id } = useParams();
  const classes = useStyles();
  const [ picture , setPicture ] = React.useState('');
  const [ pictureBackup , setPictureBackup ] = React.useState('');
  const [ pictureData , setPictureData ] = React.useState('');
  const [ title , setTitle ] = React.useState(''); 
  const [ description , setDescription ] = React.useState(''); 

  useEffect(()=>{
    if(id){
      getNews(id).then( data => {
        setTitle(data.title);
        setDescription(data.description);
        setPicture(getImageUrl(data.image));
        setPictureBackup(getImageUrl(data.image));
      });
    }
  },[])
  
  const onDrop = picture => {
    setPicture(URL.createObjectURL(picture[0]));
    setPictureData( picture[0] );
  };

  const onSubmit = ( e ) =>{
    e.preventDefault(); 
    if(id && id >0) {
      if(pictureData !== ''){
      UploadImage(pictureData , id  ).then(data => 
          updateNews({
            title,
            description,
            image: data.id,
          } , id).then( createNewsResponse =>{
            notification.Success('News Saved Succesfully');
          })
        );
      }else{
        updateNews({
          title,
          description,
        } , id).then( createNewsResponse =>{
          notification.Success('News Saved Succesfully');
        })
      }  
  
}else{
  UploadImage(pictureData).then(data => 
      addNews({
        title,
        description,
        image: data.id,
      }).then( createNewsResponse =>{
        notification.Success('News Saved Succesfully');
      })
    );
} 
    // UploadImage(pictureData).then(data => 
    //   createNews({
    //     title,
    //     description,
    //     image: data.id,
    //   }).then( createNewsResponse =>{
    //     notification.Success('News Saved Succesfully');
    //   })
    // );
  }
  
  return (
    <div className={classes.root}>
    <form  noValidate autoComplete="off" onSubmit = {onSubmit}>
        <div style={{width:'100%',display:'flex' , justifyContent:'center'}}>
      {picture === ''?  <ImageUploader
          withIcon={true}
          buttonText='Choose images'
          onChange={onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          className={classes.imageDD}
        />:<img src={picture}  style={{maxHeight:'200px'}}/>}
       
        </div>
        <div style={{width:'100%',display:'flex' , justifyContent:'center',marginTop:'20px'}}>
        {id>0 && picture !== '' ?  <Button variant="contained" size="small" color="primary" onClick={e=>setPicture('')}>Edit</Button>:null}
        {id>0 && picture === '' ?  <Button variant="contained" size="small" color="primary" onClick={e=>{setPicture(pictureBackup);setPictureData('')}}>Cancel</Button>:null}
        </div>
      <div>
        <TextField
          id="filled-select-currency"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant="filled"
        >
        </TextField>

      </div>
      <div>
      <TextareaAutosize
        className="textAera"  
        aria-label="minimum height" 
        rowsMin={12} 
        placeholder="News Details"
        value={description}
        onChange={e => setDescription(e.target.value)} />
      </div>
      <div style={{width:'100%',display:'flex' , justifyContent:'center',marginTop:'20px'}}>
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </div>
    </form>
    </div>
  );
}


// import React from 'react'
// import Dropzone from 'react-dropzone'

// export default function MultilineTextFields() {
// return <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
//   {({getRootProps, getInputProps}) => (
//     <section>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//     </section>
//   )}
// </Dropzone>}