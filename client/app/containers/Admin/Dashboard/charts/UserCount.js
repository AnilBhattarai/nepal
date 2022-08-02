import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

const UserCount = props => {
  const { data } = props;

  const lineData =
    data && data.length > 0
      ? data.map(function chart(each) {
          return {
            x: `${each._id}-${each.month}-${each.day}`,
            y: each.amt,
          };
        })
      : [];

  const chartData = [
    { id: 'Users', color: 'hsl(130, 70%, 50%)', data: lineData },
  ];

  return (
    <>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 7 days',
          // tickRotation: -90,
          legend: 'Dates',
          legendOffset: 36,
          orient: 'bottom',
          legendPosition: 'middle',
        }}
        // axisBottom={{
        //   orient: 'bottom',
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'Date',
        //   legendOffset: 36,
        //   legendPosition: 'middle',
        // }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Users',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        enableGridX={false}
        colors={{ scheme: 'paired' }}
        enablePoints={false}
        useMesh={true}
        legends={[]}
      />
    </>
  );
};

export default UserCount;
