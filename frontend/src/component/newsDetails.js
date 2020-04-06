import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { baseURL } from "../config";
import { getUserID } from "../utility/authTokenHandler";
import { deleteNews } from "../services/news";
import { useHistory } from "react-router-dom";
import * as notification from "../utility/notification";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    media: {
        height: '200px',
      },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const getImageUrl = (image) => {
    let img = false;
    try {
        img = image[0].fd;
    } catch (E) { }
    if (!img) {
        return ("https://dummyimage.com/600x400/000/fff");
    } else {
        return `${baseURL}/images/${img}`;
    }
}

export default function NewsDetailCard(props) {
    const classes = useStyles();
    const history = useHistory();

    const [expanded, setExpanded] = React.useState(false);
    try {
        const { title, createdBy, createdAt, image, description, id } = props;
        const date = new Date(createdAt).toLocaleDateString();
        const name = (createdBy[0].name).toUpperCase();
        const url = getImageUrl(image);

        const handleDelete = async () => {

            const { status } = await deleteNews(id);
            
            notification.Success('News deleted succesfully');
            
            if(status){
                history.push("/watch-news");
            }
        }

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {name.split('').shift()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={`Reported By ${name} on ${date}`}
                />
                <div style={{width:'100%', margin:'0 auto'}}>
                   <center> <img className={classes.media} src={url} /></center>
                </div>
                    
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {getUserID() == createdBy[0].id ? 
                    <Button variant="contained" color="primary" href={`/update/${id}`}>
                        Edit
                     </Button>
                     :null}

                    {getUserID() == createdBy[0].id ? 
                    <Button variant="contained" color="primary" onClick={ handleDelete }>
                        Delete
                     </Button>
                     :null}
                </CardActions>
            </Card>
        );
    } catch (e) {
        return (<div>Loading ...</div>)
    }
}
