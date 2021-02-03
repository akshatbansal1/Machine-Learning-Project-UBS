import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import CompanyList from './CompanyList';
import { render } from 'react-dom';
import AndroidIcon from '@material-ui/icons/Android';
import StorageIcon from '@material-ui/icons/Storage';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import WebIcon from '@material-ui/icons/Web';
import SecurityIcon from '@material-ui/icons/Security';
import 'fontsource-roboto';
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [out, setOut] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange1 = (event) => {
    setOut(event.target.value);
    props.choose2(event.target.value);
  };
  function Options1(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Data and Analytics">Data and Analytics</option>;
    }
    if(props == "region") {
      choice = <option value="USA">USA</option>;
    }
    if(props == "round") {
      choice = <option value="A">Round A</option>
    }
    return choice;
  }
  function Options2(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Artificial Intelligence">Artificial Intelligence</option>;
    }
    if(props == "region") {
      choice = <option value="Europe">Europe</option>;
    }
    if(props == "round") {
      choice = <option value="B">Round B</option>
    }
    return choice;
  }
  function Options3(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Financial Services">Financial Services</option>;
    }
    if(props == "region") {
      choice = <option value="Americas">Americas</option>;
    }
    if(props == "round") {
      choice = <option value="C">Round C</option>
    }
    return choice;
  }
  function Options4(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Lending and Investments">Lending and Investments</option>;
    }
    if(props == "region") {
      choice = <option value="Asia">Asia</option>;
    }
    if(props == "round") {
      choice = <option value="D">Round D</option>
    }
    return choice;
  }
  function Options5(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Payments">Payments</option>;
    }
    if(props == "region") {
      choice = <option value="Others">Others</option>;
    }
    if(props == "round") {
      choice = <option value="Acquired">Acquired</option>
    }
    return choice;
  }
  function Options6(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Platforms">Platforms</option>;
    }
    if(props == "round") {
      choice = <option value="IPO">IPO</option>;
    }
    return choice;
  }
  function Options7(props) {
    var choice;
    if(props == "category"){
      choice = <option value="Privacy and Security">Privacy and Security</option>;
    }
    return choice;
  }
  
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox" ></InputLabel>
        <SearchIcon />
        <BootstrapInput 
        placeholder="Search for company"
         onChange={(event) => {
          props.choose(event.target.value);
        }}
        id="demo-customized-textbox" />
      </FormControl>
      
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Filter</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="region">Region</MenuItem>
          <MenuItem value="round">Recent Funding Round</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={out}
          onChange={
            handleChange1
          }
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          {Options1(age)}
          {Options2(age)}
          {Options3(age)}
          {Options4(age)}
          {Options5(age)}
          {Options6(age)}
          {Options7(age)}
        </NativeSelect>
      </FormControl>

    </div>
  );
}
