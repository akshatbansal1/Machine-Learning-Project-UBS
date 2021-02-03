import React from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import SimpleSelect from './FormControl';
import Select from '@material-ui/core/Select';
import './AppJ.css';
import TextFeild from './textfield';
import Button from '@material-ui/core/Button';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        TEMG T6
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
    height: 240,
  },
  fixedBoxHeight: {
    height: 90,
  },
}));
function NewPortfolio() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedBoxHeightPaper = clsx(classes.paper, classes.fixedBoxHeight);
  const [add, setAdd] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  function added(){
    if(name=='') alert('Please input company name');
    else setAdd(true);
  }
  var activate = false;
  function Option() {
    var choice;
    
    if(add==true){
      activate = true;
      choice = <Button variant="outlined" color="secondary" onClick={() => {
        AddPortfolio();
      }}> Add to my portfolio </Button>
    }
    return choice;
  }
  

  /*JSON.stringify({
          country_code: 'USA',
          state_code: 'NY',
          has_domain: true,
          percentage_of_male_founder: 1,
          percentage_of_female_founder: 0,
          num_FAANG_exp_founder: 0,
          num_completed_degrees_from_top_500_schools: 1,
          num_incomplete_degrees_from_top_500_schools: 0,
          PreSeries_num_top_500_investors: 0,
          RoundA_num_top_500_investors: 0,
          RoundB_num_top_500_investors: 0,
          RoundC_num_top_500_investors: 0,
          PreSeries_investor_count: 0,
          RoundA_investor_count: 1,
          RoundB_investor_count: 1,
          RoundC_investor_count: 1,
          PreSeries_post_money_valuation_usd_augmented: 0,
          RoundA_post_money_valuation_usd_augmented: 5443379.976628,
          RoundB_post_money_valuation_usd_augmented: 6629616.084504,
          RoundC_post_money_valuation_usd_augmented: 14230616.082968,
          PreSeries_num_ea_org: 0,
          RoundA_num_ea_org: 0,
          RoundB_num_ea_org: 0,
          RoundC_num_ea_org: 0,
          "is_category_Artificial Intelligence":0,
          "is_category_Data and Analytics": 1,
          "is_category_Financial Services": 0,
          "is_category_Lending and Investments": 0,
          is_category_Payments: 0,
          is_category_Platforms: 0,
          "is_category_Privacy and Security": 0,
          PreSeries_from_founded_binned: 5,
          RoundA_from_founded_binned: 0,
          RoundB_from_founded_binned: 0,
          RoundC_from_founded_binned: 0,
        }),*/
  const [is_AI, setIs_AI] = React.useState(0);
  const [is_DA, setIs_DA] = React.useState(0);
  const [is_FS, setIs_FS] = React.useState(0);
  const [is_LI, setIs_LI] = React.useState(0);
  const [is_PA, setIs_PA] = React.useState(0);
  const [is_PL, setIs_PL] = React.useState(0);
  const [is_PS, setIs_PS] = React.useState(0);
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('USA');
  const [continent, setContinent] = React.useState('Asia')
  const [domain, setDomain] = React.useState(NaN);
  const [maleFounder, setMaleFounder]= React.useState(0);
  const [femaleFounder, setFemaleFounder]= React.useState(0);
  const [FAANG, setFAANG] = React.useState(0);
  const [completeTop500, setCompleteTop500] = React.useState(0);
  const [incompleteTop500, setIncompleteTop500] = React.useState(0);
  const [preSeries_num_top_500_investors, setPreSeries_num_top_500_investors] = React.useState(0);
  const [roundA_num_top_500_investors, setRoundA_num_top_500_investors] = React.useState(0);
  const [roundB_num_top_500_investors, setRoundB_num_top_500_investors] = React.useState(0);
  const [roundC_num_top_500_investors, setRoundC_num_top_500_investors] = React.useState(0);
  const [preSeries_investor_count, setPreSeries_investor_count] = React.useState(0);
  const [roundA_investor_count, setRoundA_investor_count] = React.useState(0);
  const [roundB_investor_count, setRoundB_investor_count] = React.useState(0);
  const [roundC_investor_count, setRoundC_investor_count] = React.useState(0);
  const [preSeries_post_money_valuation_usd_augmented, setPreSeries_post_money_valuation_usd_augmented] = React.useState(0);
  const [roundA_post_money_valuation_usd_augmented, setRoundA_post_money_valuation_usd_augmented] = React.useState(0);
  const [roundB_post_money_valuation_usd_augmented, setRoundB_post_money_valuation_usd_augmented] = React.useState(0);
  const [roundC_post_money_valuation_usd_augmented, setRoundC_post_money_valuation_usd_augmented] = React.useState(0);
  const [preSeries_num_ea_org, setPreSeries_num_ea_org] = React.useState(0);
  const [roundA_num_ea_org, setRoundA_num_ea_org] = React.useState(0);
  const [roundB_num_ea_org, setRoundB_num_ea_org] = React.useState(0);
  const [roundC_num_ea_org, setRoundC_num_ea_org] = React.useState(0);
  const [preSeries_from_founded_binned, setPreSeries_from_founded_binned] = React.useState(0);
  const [roundA_from_founded_binned, setRoundA_from_founded_binned] = React.useState(0);
  const [roundB_from_founded_binned, setRoundB_from_founded_binned] = React.useState(0);
  const [roundC_from_founded_binned, setRoundC_from_founded_binned] = React.useState(0);
  const [total_funding, setTotalfunding] = React.useState(0);
  const [latest_round, setLatestRound] = React.useState(NaN);
  let formData = new FormData();
  {formData.append('country_code', country);
  formData.append('state_code','NY');
  formData.append('has_domain', true);
  formData.append('percentage_of_male_founder', 1-parseFloat(femaleFounder));
  formData.append('percentage_of_female_founder',parseFloat(femaleFounder));
  formData.append('num_FAANG_exp_founder',parseInt(FAANG));
  formData.append('num_completed_degrees_from_top_500_schools',parseInt(completeTop500));
  formData.append('num_incomplete_degrees_from_top_500_schools',parseInt(incompleteTop500));
  formData.append('PreSeries_num_top_500_investors', parseInt(preSeries_num_top_500_investors));
  formData.append('RoundA_num_top_500_investors',parseInt(roundA_num_top_500_investors));
  formData.append('RoundB_num_top_500_investors',parseInt(roundB_num_top_500_investors));
  formData.append('RoundC_num_top_500_investors',parseInt(roundC_num_top_500_investors));
  formData.append('PreSeries_investor_count',parseInt(setPreSeries_investor_count));
  formData.append('RoundA_investor_count',parseInt(roundA_investor_count));
  formData.append('RoundB_investor_count',parseInt(roundB_investor_count));
  formData.append('RoundC_investor_count',parseInt(roundC_investor_count));
  formData.append('PreSeries_post_money_valuation_usd_augmented', parseFloat(preSeries_post_money_valuation_usd_augmented) );
  formData.append('RoundA_post_money_valuation_usd_augmented', parseFloat(roundA_post_money_valuation_usd_augmented));
  formData.append('RoundB_post_money_valuation_usd_augmented', parseFloat(roundB_post_money_valuation_usd_augmented));
  formData.append('RoundC_post_money_valuation_usd_augmented', parseFloat(roundC_post_money_valuation_usd_augmented));
  formData.append('PreSeries_num_ea_org',parseInt(setPreSeries_num_ea_org))
  formData.append('RoundA_num_ea_org',parseInt(roundA_num_ea_org))
  formData.append('RoundB_num_ea_org',parseInt(roundB_num_ea_org))
  formData.append('RoundC_num_ea_org',parseInt(roundC_num_ea_org))
  formData.append('is_category_Artificial Intelligence', is_AI=="true"? parseInt(1):parseInt(0))
  formData.append('is_category_Data and Analytics', is_DA=="true"? parseInt(1):parseInt(0))
  formData.append('is_category_Financial Services', is_FS=="true"? parseInt(1):parseInt(0))
  formData.append('is_category_Lending and Investments',is_LI=="true"? parseInt(1):parseInt(0))
  formData.append('is_category_Payments',is_PA=="true"? parseInt(1):parseInt(0))
  formData.append('is_category_Platforms',is_PL=="true"? parseInt(1):parseInt(0))
  formData.append('is_category_Privacy and Security',is_PS=="true"? parseInt(1):parseInt(0))
  formData.append('PreSeries_from_founded_binned',preSeries_from_founded_binned)
  formData.append('RoundA_from_founded_binned',roundA_from_founded_binned)
  formData.append('RoundB_from_founded_binned',roundB_from_founded_binned)
  formData.append('RoundC_from_founded_binned',roundC_from_founded_binned)}
  console.log(((is_AI=="true"?"Artificial Intelligence ":"")+(is_DA=="true"?"Data and Analytics ":"")+(is_FS=="true"?"Financial Services ":"")+(is_LI?"Lending and Investments ":"")+(is_PA?"Payments ":"")+(is_PL?"Platforms ":"")+(is_PS?"Privacy and Security ":"")))
  function AddPortfolio(){
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uuid: 0,
        name: name,
        "Category List": ((is_AI=="true"?"Artificial Intelligence ":"")+(is_DA=="true"?"Data and Analytics ":"")+(is_FS=="true"?"Financial Services ":"")+(is_LI=="true"?"Lending and Investments ":"")+(is_PA=="true"?"Payments ":"")+(is_PL=="true"?"Platforms ":"")+(is_PS=="true"?"Privacy and Security ":"")),
        country_code_original: country,
        country_continent_name: continent,
        total_funding_usd: total_funding,
        latest_round: latest_round,
        VGR : roi.category=="0 - 10%"?"0 - 10":roi.category=="<0%"?"<0":roi.category==">10%"?">10":roi.category,
        "is_category_Artificial Intelligence":is_AI=="true"?"1":"0",
        "is_category_Data and Analytics":is_DA=="true"? "1":"0",
        "is_category_Financial Services":is_FS=="true"? "1":"0",
        "is_category_Lending and Investments":is_LI=="true"? "1":"0",
        "is_category_Payments":is_PA=="true"? "1":"0",
        "is_category_Platforms":is_PL=="true"? "1":"0",
        "is_category_Privacy and Security":is_PS=="true"? "1":"0"
      })
    }
    console.log(options.body)
    if(activate==true) fetch("/Myportfolio", options).then(res => res.json()).then(data => setSuccess(true));
    console.log(success);
  }
  function Option2(){
    var choice; 
    if(add==true){
      choice = <Typography component="h1" variant="h5" color="primary" gutterBottom>
                  The expected VGR of company {name} is {roi.category} ({Math.round(roi.confidence*100)}% confidence)
                </Typography>
    }
    return choice;
  }
  function Option3(){
    var choice;
    if(success==true){
      choice = <p style={{ color: 'red' }}>Added</p>
    }
    return choice;
  }
  const [roi, setRoi] = React.useState(0);
  useEffect(() => {
      fetch('/model/single_pred', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json',
            },
        }).then(r => r.json())
      .then(data => setRoi(data))
  }, []);
  console.log(roi.category);
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
                    Customized company prediction
                </Typography>
                <p>Please fill in the known features(The more data is input, the better the accuracy)</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Country Code" set={setCountry} choice1="USA" choice2="CHN" choice3="GBR" choice4="CAN" choice5="IND" choice6="Others" num={6}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Country continent name" set={setContinent} choice1="USA" choice2="Asia" choice3="Europe" choice4="Americas" choice5="Others" num={5}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
               <SimpleSelect title="Is type Artificial Intelligence?" set={setIs_AI} choice1="true" choice2="false" num={2}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Is type Data & Analytics?" set={setIs_DA} choice1="true" choice2="false" num={2}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Is type Financial Services?" set={setIs_FS} choice1="true" choice2="false" num={2}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Is type Lending & Investments?" set={setIs_LI} choice1="true" choice2="false" num={2}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Is type Payments?" set={setIs_PA} choice1="true" choice2="false" num={2}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Is type Platforms?" set={setIs_PL} choice1="true" choice2="false" num={2}/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <SimpleSelect title="Is type Privacy & Security?" set={setIs_PS} choice1="true" choice2="false" num={2}/>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
                <TextFeild title="Company name" set={setName} category=" String"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <TextFeild title="number FAANG founder" set={setFAANG} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Female founder(%)" set={setFemaleFounder} category=" number 0-1"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
             <TextFeild title="number Top 500 completed degree staff" set={setCompleteTop500} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="number Top 500 incompleted degree staff" set={setIncompleteTop500} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="PreSeries number of Top 500 company investors" set={setPreSeries_num_top_500_investors} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round A number of Top 500 company investors" set={setRoundA_num_top_500_investors} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round B number of Top 500 company investors" set={setRoundB_num_top_500_investors} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round C number of Top 500 company investors" set={setRoundC_num_top_500_investors} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Preseries investor count" set={setPreSeries_investor_count} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round A investor count" set={setRoundA_investor_count} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round B investor count" set={setRoundB_investor_count} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round C investor count" set={setRoundC_investor_count} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="PreSeries post money valuation(usd)" set={setPreSeries_post_money_valuation_usd_augmented} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round A post money valuation(usd)" set={setRoundA_post_money_valuation_usd_augmented} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round B post money valuation(usd)" set={setRoundB_post_money_valuation_usd_augmented} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round C post money valuation(usd)" set={setRoundC_post_money_valuation_usd_augmented} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Number of years of Preseries" set={setPreSeries_from_founded_binned} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Number of years to reach round A" set={setRoundA_from_founded_binned} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Number of years to reach round B" set={setRoundB_from_founded_binned} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Number of years reach round C" set={setRoundC_from_founded_binned} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Preseries number of big event" set={setPreSeries_num_ea_org} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round A number of big event" set={setRoundA_num_ea_org} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round B number of big event" set={setRoundB_num_ea_org} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <TextFeild title="Round C number of big event" set={setRoundC_num_ea_org} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
            <TextFeild title="Total funding" set={setTotalfunding} category=" integer"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
            <TextFeild title="Latest funding round" set={setLatestRound} category=" string"/>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
            <Button variant="outlined" 
            color="primary"
            onClick={() => {
              added();
            }}>
              Evaluate this company
            </Button>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {Option()}
            </Grid>
            <Grid item xs={12}>
              <Paper className={fixedBoxHeightPaper}>
                {Option2()}
                {Option3()}
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

export default NewPortfolio;