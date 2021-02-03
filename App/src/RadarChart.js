import React, {Component, useState, useEffect} from 'react';
import ReactApexChart from "react-apexcharts";


class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        status: 0,
        series: [{
            name: 'Regions',
              data: [97, 96, 126, 95, 99], //processed data
            }],
            series2: [{
                name: 'Categories',
                data: [104 ,95 ,110 ,121 ,116 ,114 ,91], //processed data
              }
      ],
        options1: {
          chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1
            }
          },
          /*title: {
            text: 'Average VGR in specific region (in percentage)'
          },*/
          stroke: {
            width: 2
          },
          fill: {
            opacity: 0.1
          },
          markers: {
            size: 0
          },
          xaxis: {
            categories: ['USA', 'Europe', 'Asia', 'Americas', 'Others']
          }
        },
        options2: {
            chart: {
              height: 350,
              type: 'radar',
              dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
              }
            },
            /*title: {
              text: 'Average VGR in specific category (in percentage)'
            },*/
            stroke: {
              width: 2
            },
            fill: {
              opacity: 0.1
            },
            markers: {
              size: 0
            },
            xaxis: {
              categories: ['Artificial Intelligence', 'Data and Analytics', 'Financial Services', 'Lending and Investments', 'Payments', 'Platforms', 'Privacy and Security']
            }
          },
      };
    }
    render() {
      return (
        

  <div id="chart">
<ReactApexChart  onClick={() => {console.log(this.state.status)
    this.state.status===0 ? this.setState({ status : 1}):this.setState({status:0})}} options={this.state.status? this.state.options1:this.state.options2} 
    series={this.state.status? this.state.series:this.state.series2} type="radar" height={350} />
</div>
);
}
}

export default ApexChart;
//https://apexcharts.com/react-chart-demos/radar-charts/radar-multiple-series/