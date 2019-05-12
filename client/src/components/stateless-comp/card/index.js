import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './index.css'


const styles = {
  card: {
    maxWidth: 345,
    marginTop: '5px',
    marginBottom: '5px',
    boxShadow: '0px 0px 52px -8px rgba(49,51,61,1)',
  },
  media: {
    height: 140
  },
};



function MediaCard(props) {
  const {classes} = props;
  return (
    <Card className={`${classes.card} zoom`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.item.image}
          title="Contemplative Reptile"
        />
        <CardContent className="content">
          <Typography gutterBottom style={{color: 'white'}}>
            {'easter egg '}
          </Typography>
          <Typography component="p" style={{fontSize: '17px'}}>
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>props.doneClick(props.item)} size="small" variant="contained" color="primary" style={{background: "#ff9b2fe3"}}>
          {props.item.status === 'To Do' ? 'Done' : 'Undo'}
        </Button>
        <Button onClick={()=>props.removeTask(props.item)} size="small"  color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
