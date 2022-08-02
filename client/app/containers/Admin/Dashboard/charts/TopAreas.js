import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';

const TopAreas = props => {
  const { data } = props;

  const lineData =
    data && data.length > 0
      ? data.map(function chart(each) {
          return {
            area: `${each.area}`,
            properties: each.amt,
            propertiesColor: '#38bcb2',
          };
        })
      : [];

  /**
   * Returns a tick element that wraps text for the given number of lines and adds an ellipsis if the text can't fit. This can be passed to the renderTick method.
   */
  const HorizontalTick = ({ textAnchor, textBaseline, value, x, y }) => {
    const MAX_LINE_LENGTH = 14;
    const MAX_LINES = 2;
    const LENGTH_OF_ELLIPSIS = 3;
    const TRIM_LENGTH = MAX_LINE_LENGTH * MAX_LINES - LENGTH_OF_ELLIPSIS;
    const trimWordsOverLength = new RegExp(`^(.{${TRIM_LENGTH}}[^\\w]*).*`);
    const groupWordsByLength = new RegExp(
      `([^\\s].{0,${MAX_LINE_LENGTH}}(?=[\\s\\W]|$))`,
      'gm',
    );
    const splitValues = value
      .replace(trimWordsOverLength, '$1...')
      .match(groupWordsByLength)
      .slice(0, 2)
      .map((val, i) => (
        <tspan
          key={val}
          dy={12 * i}
          x={-10}
          style={{ fontFamily: 'sans-serif', fontSize: '11px' }}
        >
          {val}
        </tspan>
      ));
    return (
      <g transform={`translate(${x},${y})`}>
        <text alignmentBaseline={textBaseline} textAnchor={textAnchor}>
          {splitValues}
        </text>
      </g>
    );
  };

  return (
    <>
      <ResponsiveBar
        layout="horizontal"
        data={lineData}
        keys={['properties']}
        indexBy="area"
        margin={{ top: 50, right: 20, bottom: 50, left: 100 }}
        padding={0.3}
        colors={{ scheme: 'paired' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        // fill={[
        //   {
        //     match: {
        //       id: 'properties',
        //     },
        //     id: 'dots',
        //   },
        // ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Properties',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
          renderTick: HorizontalTick,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[]}
        animate={false}
        motionStiffness={90}
        motionDamping={15}
      />
    </>
  );
};

export default TopAreas;
