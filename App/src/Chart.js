import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Title from './Title';
import PropTypes from 'prop-types';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('2016', 150),
  createData('2017', 300),
  createData('2018', 600),
  createData('Test', undefined),
];

export default function Chart(props) {
  const theme = useTheme();
  let graphData = (props.data!==undefined) ? props.data : data;

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <BarChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {props.yLabelText}
            </Label>
          </YAxis>
          <Bar dataKey="amount" fill= {theme.palette.primary.main} />
          {/*<Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />*/}
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

Chart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  yLabelText: PropTypes.string,
}