import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from 'prop-types';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  
  let LinkFunction = (props.LinkFunction!==undefined && props.LinkText!=="") ? (props.LinkFunction) : (preventDefault);
  
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h4">
        {props.data}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.data2}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={LinkFunction}>
          {props.LinkText}
        </Link>
      </div>
    </React.Fragment>
  );
}

Deposits.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string,
  data2: PropTypes.string,
  LinkText: PropTypes.string,
  LinkFunction: PropTypes.func,
}