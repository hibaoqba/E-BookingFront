import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    // Extract keys and values from data object
    const keys = Object.keys(data);
    const values = Object.values(data);

    // Calculate total value
    const total = values.reduce((acc, curr) => acc + curr.value, 0);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: keys.map((key, index) => ({
            value: (values[index].value / total) * 100,
            name: key,
            itemStyle: {
              color: values[index].color // Set color for each slice
            }
          }))
        }
      ]
    };

    myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '400px', height: '400px' }} />;
};

export default PieChart;
