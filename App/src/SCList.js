import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
// Generate Order Data
/*function createData(uuid, name, type, region, valuation, ROI ) {
  return { uuid, name, type, region, valuation, ROI };
}*/

//get data from backend
/*const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];*/

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 240,
  }
}));

export default function 
SCList(props) {
  const classes = useStyles();

  let LinkFunction = (props.LinkFunction!==undefined) ? (props.LinkFunction) : (preventDefault);
  let TableSize = (props.tableSize!==undefined) ? (props.tableSize) : ("small");
  const rows = props.data;
  //const [rows,setRows] = useState(props.data);
  //console.log(props.uuid);
  //console.log(rows[2].uuid);
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size={TableSize}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Region</TableCell>
            <TableCell align="right">Total Funding(Million USD)</TableCell>
            <TableCell align="right">Latest funding round</TableCell>
            <TableCell align="right">Expected VGR</TableCell>         
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.uuid} selected={row.uuid===props.uuid}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row["Category List"]}</TableCell>
              <TableCell>{row.country_code_original=="Others"? row.country_continent_name:row.country_code_original}</TableCell>
              <TableCell align="right">{parseFloat(row.total_funding_usd)/1000000}</TableCell>
              <TableCell align="right">{row.latest_round}</TableCell>
              <TableCell align="right">{row["VGR"]!=""? row["VGR"] :""}</TableCell>
              <TableCell align="right"><DeleteIcon onClick = {() => {
                  fetch('/delete/'+row["_id"], {method:'DELETE'})
              }}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          {props.LinkText}
        </Link>
      </div>
    </React.Fragment>
  );
}

SCList.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
  colNames: PropTypes.array,
  tableSize: PropTypes.string,
  LinkText: PropTypes.string,
  LinkFunction: PropTypes.func,
  listData: PropTypes.object,
}