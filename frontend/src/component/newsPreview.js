import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { baseURL } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 200,
    margin:10,
    '& p':{
      maxHeight:100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

const getImageUrl = ( image ) => {
  let img = false;
  try{
     img = image[0].fd;
  }catch(E){}
  if(!img){
    return("https://dummyimage.com/600x400/000/fff");
  }else{
    return `${baseURL}/images/${img}`;
  }
}

export default function NewsPreviewCard({ title , createdBy , createdAt , image , description , id }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const date = new Date(createdAt).toLocaleDateString();
  const name  = (createdBy[0].name).toUpperCase();
  const url  = getImageUrl( image );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <CardMedia
        className={classes.media}
        image={url}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        { description }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={`news/${id}`}>
          Read More...
        </Button>
      </CardActions>
    </Card>
  );
}
