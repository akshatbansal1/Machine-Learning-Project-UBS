import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import Title from './Title';
import PropTypes from 'prop-types';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('0', 150),
  createData('1', 0),
  createData('2', 0),
  createData('3', undefined),
];

export default function BarLineChart(props) {
  const theme = useTheme();
  const [type,setType] = useState(0);
  let graphData = (props.data!==undefined) ? props.data[type] : [];

  //let y2label = (props.data!==undefined) ? props.data : data;

  return (
    <React.Fragment>
      {console.log(props.data)}
      <Title>{props.title[type]}</Title>
      <ResponsiveContainer>
        <ComposedChart
          data={graphData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          onClick = {()=>{setType((type==0)?1:0)}}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} scale="band" />
          <YAxis yAxisId="left" stroke={theme.palette.primary.main}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.primary.main }}
            >
              {props.y2LabelText}
            </Label>
          </YAxis>
          <YAxis yAxisId="right" orientation="right" stroke={theme.palette.secondary.main}>
            <Label
              angle={270}
              position="right"
              style={{ textAnchor: 'middle', fill: theme.palette.secondary.main }}
            >
              {props.yLabelText}
            </Label>
          </YAxis>
          <Bar yAxisId="right" dataKey="val" fill= {theme.palette.secondary.main} />
          <Line yAxisId="left" type="monotone" dataKey="roi" stroke={theme.palette.primary.main} dot={true} />
        </ComposedChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

BarLineChart.propTypes = {
  title: PropTypes.array,
  data: PropTypes.array,
  yLabelText: PropTypes.string,
  y2LabelText: PropTypes.string,
}