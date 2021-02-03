import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    props.set(event.target.value);
  };
  function Options3() {
    var choice;
    if(props.num > 2){
        choice = <MenuItem value={props.choice3}>{props.choice3}</MenuItem>
    }
    return choice;
  }
  function Options4() {
    var choice;
    if(props.num > 3){
        choice = <MenuItem value={props.choice4}>{props.choice4}</MenuItem>
    }
    return choice;
  }
  function Options5() {
    var choice;
    if(props.num > 4){
        choice = <MenuItem value={props.choice5}>{props.choice5}</MenuItem>
    }
    return choice;
  }
  function Options6() {
    var choice;
    if(props.num > 5){
        choice = <MenuItem value={props.choice6}>{props.choice6}</MenuItem>
    }
    return choice;
  }
  function Options7() {
    var choice;
    if(props.num > 6){
        choice = <MenuItem value={props.choice7}>{props.choice7}</MenuItem>
    }
    return choice;
  }
  return (
      <div>
        <Typography component="p" variant="h8">
        {props.title}
        </Typography>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={props.choice1}>{props.choice1}</MenuItem>
          <MenuItem value={props.choice2}>{props.choice2}</MenuItem>
          {Options3()}
          {Options4()}
          {Options5()}
          {Options6()}
          {Options7()}
        </Select>
      </FormControl>
      </div>
  );
}