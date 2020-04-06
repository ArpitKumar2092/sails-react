import React from 'react';
import * as newsActions from '../services/news';
import {  useParams } from "react-router-dom";
import DisplayNewsDetails from "../component/newsDetails";


export default function NewsDetailCard() {

  let { id } = useParams();
  const [newsdetails, setNewsdetails] = React.useState({});
  React.useEffect(()=>{
    newsActions.getNews(id).then( data => setNewsdetails(data));

  }, [])

  return (<DisplayNewsDetails {...newsdetails}/>);
}
