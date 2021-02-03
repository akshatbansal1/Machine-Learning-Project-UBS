import React from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
import Deposits from './Deposits1';
import Orders from './Orders';
import Title from './Title';
import SCList from './SCList2';
import BarLineChart from './BarLineChart';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 240,
  },
  fixedHeight: {
    height: 240,
  },
  fixedBoxHeight: {
    height: 120,
  },
}));

function createGraphDataField(time, amount) {
    return { time, amount };
  }
  
/*var Graphdata = [
    createGraphDataField('2016', 150),
    createGraphDataField('2017', 300),
    createGraphDataField('2018', 600),
    createGraphDataField('Test', undefined),
  ];*/

const companyDataInit = {
  description : "",
  fundingRound : "",
  graphData: [],
  listData: [],
  name: "",
  roi: "",
  tFunding: "",
  uuid: ""
}

export default function Company(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedBoxHeightPaper = clsx(classes.paper, classes.fixedBoxHeight);
  const [currentTime, setCurrentTime] = useState(0);
  const [companyName, setCompanyName] = useState("Nyop");
  const [companyData,setCompanyData] = useState(companyDataInit);
  const [added,setAdded] = useState(false);
  const url='/company/'+props.match.params.id;
  var desc = "f";

  useEffect(() => {fetch('/time').then(res=>res.json()).then(data => {setCurrentTime(data.time);});},[]);
  useEffect(() => {fetch(url).then(res=>res.json()).then(data => {setCompanyName(data.name);});},[]);
  useEffect(() => {fetch(url).then(res=>res.json()).then(data => {setCompanyData(data);});},[]);
  //fetch(url).then(res=>res.json()).then(data => {desc=data.description;});

  const handleButtonClick = () => {
    console.log("Test");
    if (added) setAdded(false); else setAdded(true);
  }

  //var Graphdata;
  //var Graphdata[5];

  /*for (let index = 0; index < companyData.listData[0].length; index++) {
    //const element = array[index];
    Graphdata[index] = createGraphDataField(companyData.graphData[0][index],companyData.graphData[1][index]);
    console.log(Graphdata[index]);
  }*/
  //console.log(Graphdata);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Chart */}
            <Grid item xs={12} md={10} lg={10}>
              <Paper className={fixedBoxHeightPaper}>
                <Typography component="h1" variant="h4" color="black" gutterBottom>
                    {companyData.name}
                </Typography>
                {/*<p>{companyData.description} {/*({props.match.params.id})}</p>*/}
                <Link color="primary" href="#" onClick={()=>{window.open(companyData.cb_link, '_blank')}}>
                  Crunchbase Page
                </Link>
                <Link color="primary" href="#" onClick={()=>{window.open(companyData.dm_link, '_blank')}}>
                  { companyData.dm_link==="" ? "" : "Company Homepage"}
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
              <Paper className={fixedBoxHeightPaper}>
              <Button onClick={handleButtonClick} className={clsx(classes.button, classes.fixedBoxHeight)} variant={(added)?"contained":"outlined"} color="secondary" fullWidth={true}>{(added)?"Remove from My Portfolio":"Add to My Portfolio"}</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedBoxHeightPaper}>
                <Deposits title = "Total Funding" data = {"$"+companyData.tFunding+"M"}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedBoxHeightPaper}>
                <Deposits title = "Latest Funding Round" data = {companyData.fundingRound}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedBoxHeightPaper}>
                <Deposits title = "Expected VGR of Next Funding Round" data = {companyData.roi}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                {console.log(companyData.graphData)}
                <BarLineChart title= {[["Valuation increase over time"],["VGR between subsequent funding rounds"]]} data={[companyData.graphData,companyData.graphData]} yLabelText="Valuation($M)" y2LabelText="VGR(%)" />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <SCList uuid={companyData.uuid} data={companyData.listData} title="Companies with similar VGR"/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}