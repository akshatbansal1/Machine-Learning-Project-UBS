import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function TextFieldSizes(props) {
    const classes = useStyles();
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
        <Typography component="p" variant="h8">
        {props.title}
        </Typography>
        <TextField
          id="outlined-size-small"
          variant="outlined"
          size="small"
          fullwidth
          placeholder={"Please input"+props.category}
          onChange={(event) => {
              props.set(event.target.value);
          }}
        />
        
      </div>
      </form>
  );
}