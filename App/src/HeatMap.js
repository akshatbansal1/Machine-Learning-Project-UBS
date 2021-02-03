import React, { Component } from "react";
import Chart from "react-apexcharts";
import ReactDOM from 'react-dom';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Title from './Title';
import PropTypes from 'prop-types';


{/*export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      
        series: this.props.data,
        options: {
          chart: {
            height: 450,
            type: 'heatmap',
          },
          dataLabels: {
            enabled: false
          },
          colors: this.props.colors,
          xaxis: {
            type: 'category',
            categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30']
          },
          title: {
            text: 'HeatMap Chart (Different color shades for each series)'
          },
          grid: {
            padding: {
              right: 20
            }
          }
        },
      
      
      };
    }
  
    render() {
      return (
        
  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={450} />
</div>
 );
}
}
const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ApexChart), domContainer);*/}

export default function HeatMap(props) {
    let stat = (props.stat!==undefined) ? props.stat : 0
    const theme = useTheme();
    //let graphData = (props.data!==undefined) ? props.data : data;
    let seriesH = [
        {
          name: "RoundX Evaluations",
          data: [
            {x: 'Pre-Series to A',y: -1}, 
            {x: 'A to B',y: -1}, 
            {x: 'B to C',y: -1}, 
            {x: 'C to D',y: -1}
          ]
        },
        {
          name: "Completed Degrees from Top 500 Schools",
          data: [
            {x: 'Pre-Series to A',y: -3}, 
            {x: 'A to B',y: -2}, 
            {x: 'B to C',y: -3}, 
            {x: 'C to D',y: -2}
          ]
        },
        {
          name: "RoundX Investor Count",
          data: [
            {x: 'Pre-Series to A',y: -2}, 
            {x: 'A to B',y: -4}, 
            {x: 'B to C',y: -6}, 
            {x: 'C to D',y: -8}
          ]
        },
        {
          name: "Time to reach RoundX",
          data: [
            {x: 'Pre-Series to A',y: -22}, 
            {x: 'A to B',y: -29}, 
            {x: 'B to C',y: -13}, 
            {x: 'C to D',y: -32},
          ]
        },
        {
          name: "Category: Financial Service",
          data: [
            {x: 'Pre-Series to A',y: -4}, 
            {x: 'A to B',y: -6}, 
            {x: 'B to C',y: -11}, 
            {x: 'C to D',y: -6}
          ]
        },
        {
          name: "Category: AI",
          data: [
            {x: 'Pre-Series to A',y: -11}, 
            {x: 'A to B',y: -17}, 
            {x: 'B to C',y: -14}, 
            {x: 'C to D',y: -23}
          ]
        },
        {
          name: "Category: Data & Analytics",
          data: [
            {x: 'Pre-Series to A',y: -7}, 
            {x: 'A to B',y: -12}, 
            {x: 'B to C',y: -13}, 
            {x: 'C to D',y: -18}
          ]
        },
        {
          name: "% Male Founders",
          data: [
            {x: 'Pre-Series to A',y: -6}, 
            {x: 'A to B',y: -9}, 
            {x: 'B to C',y: -18}, 
            {x: 'C to D',y: -19}
          ]
        },
        {
          name: "% Female Founders",
          data: [
            {x: 'Pre-Series to A',y: -17}, 
            {x: 'A to B',y: -10}, 
            {x: 'B to C',y: -15}, 
            {x: 'C to D',y: -16}
          ]
        },
        {
          name: "FAANG Experience",
          data: [
            {x: 'Pre-Series to A',y: -13}, 
            {x: 'A to B',y: -21}, 
            {x: 'B to C',y: -19}, 
            {x: 'C to D',y: -26}
          ]
        },
        {
          name: "Social Media Presence",
          data: [
            {x: 'Pre-Series to A',y: -8}, 
            {x: 'A to B',y: -8}, 
            {x: 'B to C',y: -10}, 
            {x: 'C to D',y: -13}
          ]
        }
      ];
    let series = (stat===1) ? seriesH :props.data;
    let options = {
        series: series,
        /*chart: {
        height: 200,
        type: 'heatmap',
        },
        dataLabels: {
        enabled: false
        },
        colors: theme.palette.primary.main,
        xaxis: {
        type: 'category',
        categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30']
        },
        grid: {
        padding: {
            right: 20
        }
        }*/
        plotOptions: {
          heatmap: {
            distributed: (stat==1)?false:true,
            shadeIntensity: 1,
            reverseNegativeShade: false,
            colorScale: {
              inverse: false
            }
          }
        }
    };
  
    return (
      <React.Fragment>
        <Title>{props.title}</Title>
       <Chart options={options} series={series} type="heatmap" height={200}/> 
      </React.Fragment>
    );
  }