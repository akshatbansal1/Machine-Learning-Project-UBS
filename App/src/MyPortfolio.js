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
import Title from './Title';
import SCList from './SCList';
import Header from './Header';
//import Piechart from './Piechart';
import HeatMap from './HeatMap';
import ReactApexChart from "react-apexcharts";
import TextFeild from './textfield';
import DeleteIcon from '@material-ui/icons/Delete';


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
    //overflow: 'auto',
    paddingLeft: 200,
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    //overflow: 'auto',
    flexDirection: 'column',
    height: 240,
  },
  paper2: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 240,
  },
  fixedHeight: {
    height: 200,
  },
  fixedBoxHeight: {
    height: 100,
  },
}));

function createGraphDataField(time, amount) {
    return { time, amount };
  }
  
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

const init2 = {
  title: "",
  heatdata: []
}

export default function MyPortfolio(props) {
  
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

  const [heat,setHeat] = useState(init2);
  const url='/company/5';
  const [initialData, setInitialData] = useState([{}]);
      useEffect(()=> {
        fetch('/portfolio').then(
          response =>response.json()
        ).then(data => setInitialData(data))
      }, []);
  var total_funding = 0;
  var company_added = 0;
  var num_AI = 0;
  var num_DA = 0;
  var num_FS = 0;
  var num_LI = 0;
  var num_PA = 0;
  var num_PL = 0;
  var num_PS = 0;
  var num_USA = 0;
  var num_GBR = 0;
  var num_CHN = 0;
  var num_CAN =0;
  var num_OTH = 0;
  initialData.map((row, index) => {
    total_funding += parseInt(row.total_funding_usd);
    company_added += 1;
    if(row["is_category_Artificial Intelligence"]=="1") num_AI += 1;
    if(row["is_category_Data and Analytics"]=="1") num_DA+=1;
    if(row["is_category_Financial Services"]=="1") num_FS += 1;
    if(row["is_category_Lending and Investments"]=="1") num_LI+=1;
    if(row["is_category_Payments"]=="1") num_PA += 1;
    if(row["is_category_Platforms"]=="1") num_PL+=1;
    if(row["is_category_Privacy and Security"]=="1") num_PS+=1;
    if(row.country_continent_name=="USA") num_USA+=1;
    if(row.country_continent_name=="Europe") num_GBR+=1;
    if(row.country_continent_name=="Asia") num_CAN+=1;
    if(row.country_continent_name=="Americas") num_CHN+=1;
    if(row.country_continent_name=="Others") num_OTH+=1;
  })
  
  let label2_pass = ["United States of America","Europe","Asia","Americas","Others"];
  let num_pass = [num_AI,num_DA,num_FS,num_LI,num_PA,num_PL,num_PS];
  let label_pass = ["Artificial Intelligence","Data and Analytics","Financial Services","Lending and Investments","Payments","Platforms","Privacy and Security"];
  let num_pass2 = [num_USA,num_GBR,num_CAN,num_CHN,num_OTH];
  console.log(num_pass2)
  useEffect(() => {fetch('/time').then(res=>res.json()).then(data => {setCurrentTime(data.time);});},[]);
  useEffect(() => {fetch('/').then(res=>res.json()).then(data => {setHeat(data);});},[]);
  useEffect(() => {fetch(url).then(res=>res.json()).then(data => {setCompanyName(data.name);});},[]);
  useEffect(() => {fetch(url).then(res=>res.json()).then(data => {setCompanyData(data);});},[]);
  let state = {
    
    series: num_pass2,
    options: {
      labels: label2_pass,
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
      },
      title: {
        text: 'Portfolio Region Proportion'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };
  let state2 = {
    
    series: num_pass,
    options: {
      labels: label_pass,
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
      },
      title: {
        text: 'Portfolio Category Proportion'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };
  const [name, setName] = React.useState();
  function delete_one(){
    
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/*<Grid item xs={12}><Header Title="Test"/></Grid>*/} 
            <Grid item xs={12}>
              <Paper className={fixedBoxHeightPaper}>
                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                    My Portfolio
                </Typography>
                <p>Please add a company to track from the search feature or the company list.</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <Paper className={fixedBoxHeightPaper}>
                <Deposits title = "Company Added" data = {company_added}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedBoxHeightPaper}>
                <Deposits title = "Total Funding" data = {"$"+Math.round(total_funding/1000000)+"M"}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <SCList uuid={companyData.uuid} data={initialData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
              </div>

              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <div id="chart">
                <ReactApexChart options={state2.options} series={state2.series} type="donut" width={380} />
              </div>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            
            {/* Recent Orders */}
            
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}