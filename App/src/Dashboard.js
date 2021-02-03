import React from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
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
import BarLineChart from './BarLineChart';
import HeatMap from './HeatMap';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import TopCompany from './TopList';
import RadarChart from './RadarChart';
//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


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
  fixedHeight2: {
    height: 400,
  },
  fixedBoxHeight: {
    height: 120,
  },
  button: {
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
    marginLeft: 4,
    //alignContent: 'center',
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
const dashDataInit = {
  heatmap: {
    data: [],
    title: "Success: Category vs Region",
  },
  barline: []
}

const filterOptions = [
  'Pre-Series +',
  'Round A +',
  'Round B +',
  'Round C +',
  'Round D +',
  'IPO/Acquisition',
];

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const fixedBoxHeightPaper = clsx(classes.paper, classes.fixedBoxHeight);
  //const [currentTime, setCurrentTime] = useState(0);
  const [companyName, setCompanyName] = useState("Nyop");
  //const [companyData,setCompanyData] = useState(companyDataInit);
  const [dashData, setDashData] = useState(dashDataInit);

  const [switchState, setSwitchState] = useState(false);
  const [menuAnchor,setMenuAnchor] = useState(null);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(3);
  const [initialData, setInitialData] = useState([{}]);

  const handleMenuItemClick = (event, index) => {
    setSelectedMenuIndex(index);
    setMenuAnchor(null);
  };

  useEffect(()=> {
    fetch('/database').then(
      response =>response.json()
    ).then(data => setInitialData(data))
  }, []);
  //const url='/company/5';
  //var desc = "f";

  //useEffect(() => {fetch('/time').then(res=>res.json()).then(data => {setCurrentTime(data.time);});},[]);
  useEffect(() => {
    fetch('/dashboard', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: (switchState) ? 1 : 0,
        round: selectedMenuIndex,
      })
    }).then(res=>res.json()).then(data => {setDashData(data);});},[selectedMenuIndex,switchState]);
    console.log(dashData);
  //useEffect(() => {fetch(url).then(res=>res.json()).then(data => {setCompanyName(data.name);});},[]);
  //useEffect(() => {fetch(url).then(res=>res.json()).then(data => {setCompanyData(data);});},[]);
  //fetch(url).then(res=>res.json()).then(data => {desc=data.description;});

  let heatmapData = dashData.heatmap.data[0]===undefined ? [] : dashData.heatmap.data[0]
  
  //var Graphdata;
  //var Graphdata[5];

  /*for (let index = 0; index < companyData.listData[0].length; index++) {
    //const element = array[index];
    Graphdata[index] = createGraphDataField(companyData.graphData[0][index],companyData.graphData[1][index]);
    console.log(Graphdata[index]);
  }*/
  console.log(dashData);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <TopCompany data={initialData}/>
              </Paper>
            </Grid>
            {/*
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Deposits title = {companyData.name}/>
              </Paper>
            </Grid> */}
            <Grid item xs={12} md={9} lg={9}>
              <Paper className={fixedHeightPaper}>
                {/*<BarLineChart title= {dashData.heatmap.title} data={companyData.graphData} yLabelText="Valuation($M)" y2LabelText="ROI(%)" />*/}
                <HeatMap data={heatmapData} title ="Successful Startups: Region vs Category" filter={selectedMenuIndex}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Title>Filter</Title>
                <Grid container spacing={1} alignItems="center" alignContent="center">
                  {/*<Grid xs={12}><Button className={classes.button} variant="contained" color="secondary" fullWidth={true}>Pre-series+</Button></Grid>
                  <Grid xs={12} md={6} lg={6}><Button className={classes.button} variant="contained" color="secondary">Series A+</Button></Grid>
                  <Grid xs={12} md={6} lg={6}><Button className={classes.button} variant="contained" color="secondary">Series B+</Button></Grid>
                  <Grid xs={12} md={6} lg={6}><Button className={classes.button} variant="contained" color="secondary">Series C+</Button></Grid>
                  <Grid xs={12} md={6} lg={6}><Button className={classes.button} variant="contained" color="secondary">Series D+</Button></Grid>*/}
                  <Grid item xs={12}>
                    <List component="nav" aria-label="Device settings">
                      <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="Filter success criteria"
                        onClick={(event)=>{setMenuAnchor(event.currentTarget)}}
                      >
                        <ListItemText primary="Filter success criteria" secondary={filterOptions[selectedMenuIndex]} />
                      </ListItem>
                    </List>
                    <Menu
                      id="lock-menu"
                      anchorEl={menuAnchor}
                      keepMounted
                      open={Boolean(menuAnchor)}
                      onClose={()=>{setMenuAnchor(null)}}
                    >
                      {filterOptions.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 0}
                          selected={index === selectedMenuIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                  <Grid item xs={12} md={6} lg={12}>
                    {/*<Switch
                      size="medium"
                      checked={switchState}
                      onChange={(event) => {setSwitchState(event.target.checked);}}
                      name="Model"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />*/}
                  </Grid>
                  <Grid item xs={12} md={6} lg={12}>
                    <Typography component="p" variant="h6">Model estimation</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper2}>
                <Title>Average all-time VGR by Region/Category</Title>
                <RadarChart />{/*<BarLineChart title= "Valuation increase over time  " data={companyData.graphData} yLabelText="Valuation($M)" y2LabelText="ROI(%)" />*/}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper2}>
                <BarLineChart title= {[["Success of Companies by Region"],["Success of Companies by Category"]]} data={dashData.barline} yLabelText="% Successful companies" y2LabelText="Average age for success (years)" />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                {/*<BarLineChart title= {dashData.heatmap.title} data={companyData.graphData} yLabelText="Valuation($M)" y2LabelText="ROI(%)" />*/}
                <HeatMap data={heatmapData} title ="Feature Importance Rank at each Stage" stat={1}/>
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