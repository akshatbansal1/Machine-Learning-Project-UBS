import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AndroidIcon from '@material-ui/icons/Android';
import StorageIcon from '@material-ui/icons/Storage';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import WebIcon from '@material-ui/icons/Web';
import SecurityIcon from '@material-ui/icons/Security';
import 'fontsource-roboto';
function createData(index, name, age, numberEmployee, numberOffice, size, probability, uuid, is_AI, is_DA, is_FS, is_LI, is_PA, is_PL, is_PS) {
  return {  index, name, age, numberEmployee, numberOffice, size, probability , uuid, is_AI, is_DA, is_FS, is_LI, is_PA, is_PL, is_PS };
}


function descendingComparator(a, b, orderBy) {
  if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
    return -1;
  }
  if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'age', numeric: false, disablePadding: false, label: 'Region' },
  { id: 'numberEmployee', numeric: false, disablePadding: false, label: 'Company category' },
  { id: 'numberOffice', numeric: false, disablePadding: false, label: 'latest funding round' },
  { id: 'size', numeric: false, disablePadding: false, label: 'Expected VGR' },
  { id: 'probability', numeric: true, disablePadding: false, label: 'Confidence(%)'},
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        <Typography className={classes.title} align="left" variant="h4" color="primary" id="tableTitle" component="div">
          Company List
        </Typography> 
        <AndroidIcon />
        <Typography variant="h8" component="h8">
           Artificial Intelligence
        </Typography>
        <StorageIcon />
        <Typography variant="h8" component="h8">
          Data and Analytics
        </Typography>
        <AccountBalanceIcon />
        <Typography variant="h8" component="h8">
          Financial Services
        </Typography>
        <AccountBalanceWalletIcon />
        <Typography variant="h8" component="h8">
        Lending and Investments
        </Typography>
        <PaymentIcon />
        <Typography variant="h8" component="h8">
        Payments
        </Typography>
        <WebIcon />
        <Typography variant="h8" component="h8">
        Platforms
        </Typography>
        <SecurityIcon />
        <Typography variant="h8" component="h8">
        Privacy and Security
        </Typography>  
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 900,
  },
  fixedHeight:{
    height: 800,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const handleRequestSort = (event, property) => {
    if(property=="size"||property=="probability"){
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }

  };
  const {data} = props;
  const rows = data.map(data => {
    return createData(data.index, data.name,  data.latest_round, data.company_category, data.country_continent_name == "Others"? data.country_code_original:data.country_continent_name, data["VGR_bin"] , data["Probability"], data.uuid, data.["is_category_Artificial Intelligence"],data.["is_category_Data and Analytics"],data.["is_category_Financial Services"],data.["is_category_Lending and Investments"],data.["is_category_Payments"],data.["is_category_Platforms"],data.["is_category_Privacy and Security"])
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function Option1(props) {
    var choice;
    if(props == "1"){
      choice = <AndroidIcon />
    }
    return choice;
  }
  function Option2(props) {
    var choice;
    if(props == "1"){
      choice = <StorageIcon />
    }
    return choice;
  }
  function Option3(props) {
    var choice;
    if(props == "1"){
      choice = <AccountBalanceIcon />
    }
    return choice;
  }
  function Option4(props) {
    var choice;
    if(props == "1"){
      choice = <AccountBalanceWalletIcon />
    }
    return choice;
  }
  function Option5(props) {
    var choice;
    if(props == "1"){
      choice = <PaymentIcon />
    }
    return choice;
  }
  function Option6(props) {
    var choice;
    if(props == "1"){
      choice = <WebIcon />
    }
    return choice;
  }
  function Option7(props) {
    var choice;
    if(props == "1"){
      choice = <SecurityIcon />
    }
    return choice;
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      onClick={() => {
                        window.location.pathname = "./company/" + row.uuid;
                      }}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.numberOffice}</TableCell>
                      <TableCell align="left">
                        {Option1(row.is_AI)}
                        {Option2(row.is_DA)}
                        {Option3(row.is_FS)}
                        {Option4(row.is_LI)}
                        {Option5(row.is_PA)}
                        {Option6(row.is_PL)}
                        {Option7(row.is_PS)}
                      </TableCell>
                      <TableCell align="left">{row.age}</TableCell>
                      <TableCell align="left">{row.size=="-1"?"":row.size=="0"?"<0"+"%":row.size=="1"?"0 - 10"+"%":row.size=="2"?">10%":""}</TableCell>
                      <TableCell align="center">{row.probability=="0"?"":Math.round(parseFloat(row.probability)*100)+"%"}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
