import React from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import formula from './img/Formula.png';
import Title from './Title';
import FI_1 from './img/picture 1.jpeg';
import FI_2 from './img/picture 2.jpeg';
import FI_3 from './img/picture 3.jpeg';
import FI_4 from './img/picture 4.jpeg';



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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedBoxHeightPaper = clsx(classes.paper, classes.fixedBoxHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/*<Grid item xs={12}><Header Title="Test"/></Grid>*/} 
            <Grid item xs={12} >
              <Paper className={fixedBoxHeightPaper}>
                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                    Model description
                </Typography>
                <p>How we define VGR? What is feature importance in each stage?</p>
              </Paper>
            </Grid>
            <Grid item xs={9} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Title>Valuation Growth Rate (VGR)</Title>
                <img src={formula} alt="VGR formula"/>
              </Paper>
            </Grid>
            <Grid item xs={3} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Title>Why we use VGR</Title>
                <p style={{ color: 'red' }}>VGR is a metric capturing the annual rate of increase in valuation during a time frame t0 – t1. The higher the VGR, the more successful a company is during the timeframe. This indicator is used because it not only captures the growth, but also the time component of a company’s performance.</p>
              </Paper>
            </Grid>
            <Grid item xs={12} >
              <Paper className={fixedBoxHeightPaper}>
                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                    Feature importance
                </Typography>
                <p>Which feature plays dominant role in specific stage</p>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={12} lg={12}>
              <Title>Seed-stage gradient boosted classifier</Title>
                <img src={FI_1} alt="Feature importance 1"/>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Title>Early-stage gradient boosted classifier</Title>
                <img src={FI_2} alt="Feature importance 2"/>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Title>Mid-stage gradient boosted classifier</Title>
                <img src={FI_3} alt="Feature importance 3"/>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Title>Late-stage gradient boosted classifier</Title>
                <img src={FI_4} alt="Feature importance 4"/>
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