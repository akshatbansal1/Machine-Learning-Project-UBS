import React from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import './AppJ.css';
import EnhancedTable from './ListOfCompany';
import './App.css';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter from './Filter';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingLeft: 200,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));




function CompanyList() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [pageTitle, setPageTitle] = useState("Error");
    const [currentTime, setCurrentTime] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    useEffect(() => {fetch('/time').then(res=>res.json()).then(data => {setCurrentTime(data.time);});},[]);
      const [initialData, setInitialData] = useState([{}]);
      useEffect(()=> {
        fetch('/database').then(
          response =>response.json()
        ).then(data => setInitialData(data))
      }, []);
      console.log(initialData);
    
    return (
      <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className="nevermind">
        <Filter choose={setSearchTerm} choose2={setSearchFilter}/>
        </div>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <EnhancedTable data = {initialData.filter((val) => {
                  if(searchFilter == ""){
                    return val
                  }
                  else if(searchFilter == "USA"||searchFilter == "Europe" ||searchFilter =="Americas" || searchFilter == "Asia" || searchFilter == "Others") {
                  if(val.country_continent_name.toLowerCase().includes(searchFilter.toLowerCase())){
                    return val
                  }
                }
                  else if(searchFilter == "A"||searchFilter == "B" ||searchFilter =="C" || searchFilter == "D" || searchFilter =="Acquired" || searchFilter =="IPO"){
                    if(val.latest_round.toLowerCase() == searchFilter.toLowerCase()) {
                      return val
                    }
                  }
                  else{
                    if(searchFilter == "Artificial Intelligence"){
                      if(val.["is_category_Artificial Intelligence"].toLowerCase().includes("1")){
                        return val
                      }
                    }
                    if(searchFilter == "Data and Analytics"){
                      if(val.["is_category_Data and Analytics"].toLowerCase().includes("1")){
                        return val
                      }
                    }
                    if(searchFilter == "Financial Services"){
                      if(val.["is_category_Financial Services"].toLowerCase().includes("1")){
                        return val
                      }
                    }
                    if(searchFilter == "Lending and Investments"){
                      if(val.["is_category_Lending and Investments"].toLowerCase().includes("1")){
                        return val
                      }
                    }
                    if(searchFilter == "Payments"){
                      if(val.["is_category_Payments"].toLowerCase().includes("1")){
                        return val
                      }
                    }
                    if(searchFilter == "Platforms"){
                      if(val.["is_category_Platforms"].toLowerCase().includes("1")){
                        return val
                      }
                    }
                    if(searchFilter == "Privacy and Security"){
                      if(val.["is_category_Privacy and Security"].toLowerCase().includes("1")){
                        return val
                      }
                    if(searchFilter == "Others"){
                      if(val.country_code_original.toLowerCase().includes("ARE","ARG","AUS","AUT","BEL","BGD","BGR","BHR","BLR","BMU","BRA","BRB","CHE","CHL","COL","CRI","CYM","CYP","CZE","DEU","DNK","EGY","ESP","EST","FIN","FRA","GHA","GIB","GRC","GTM","HKG","HRV","HUN","IDN","IRL","ISL","ISR","ITA","JOR","JPN","KAZ","KEN","KOR","LBN","LIE","LTU","LUX","LVA","MEX","MLI","MLT","MUS","MYS","NGA","NLD","NOR","NZL","PAK","PER","PHL","POL","PRI","PRT","ROM","RUS","SAU","SEN","SGP","SRB","SVK","SVN","SWE","TAN","TGO","THA","TTO","TUR","TWN","UGA","UKR","Unknown","URY","VEN","VNM","ZAF","ZMB")){
                        return val
                    }
                      }
                    }
                  }
                }).filter((val) => {
          if(searchTerm == ""){
            return val
          }
          else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
            console.log(val);
            return val
          }
        })}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default CompanyList;