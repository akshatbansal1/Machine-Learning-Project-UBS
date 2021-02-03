import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Filter from './Filter';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

// Generate Order Data

function Data( name, country_code, index, expected_roi, probability) {
    return {  name, country_code, index, expected_roi, probability };
  }



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  const {data} = props;
  function compare(a,b){
    const compare1 = b["Probability"]=NaN? 0:b["Probability"];
    const compare2 = a["Probability"]=NaN? 0:a["Probability"];
    return parseFloat(compare1) - parseFloat(compare2);
  }
  console.log("abc".toLowerCase());
  data.sort(compare);
  function preventDefault(){
    window.location.pathname = 'companies'
  }
  const rows = data.slice(0,10).map((data,index) => {
    return Data( data.name, data.country_code, data.latest_round, data["VGR"], data["Probability"]);
  });
  console.log(rows);
  return (
    <React.Fragment>
      <Title>Top performing companies</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Stage</TableCell>
            <TableCell align="right">Expected VGR</TableCell>
            <TableCell align="right">Confidence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.country_code}</TableCell>   
              <TableCell >{row.index}</TableCell>
              <TableCell align="right">{row.expected_roi!=""?row.expected_roi+"%":""}</TableCell>
              <TableCell align="right">{Math.round(parseFloat(row.probability)*100) + "%"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more companies
        </Link>
      </div>
    </React.Fragment>
  );
}