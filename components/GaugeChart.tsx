
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface GaugeChartProps {
  value: number;
  unit: string;
  max: number;
  color: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, unit, max, color }) => {
  const data = [
    { name: 'value', value: value },
    { name: 'remaining', value: max - value },
  ];

  const formattedValue = unit === 'R$' ? (value/1000).toFixed(0) + 'k' : value.toFixed(2);
  const displayUnit = unit === 'R$' ? '' : unit;

  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="100%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="rgba(255, 255, 255, 0.1)" />
            <Label
              position="center"
              dy={-10}
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                fill: '#FFFFFF',
                fontFamily: 'sans-serif',
              }}
            >
              {formattedValue}
              <tspan fontSize="1.25rem" fill="#D1D5DB" >{displayUnit}</tspan>
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;
