import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const DashboardChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const option = {
      dataset: {
        source: [
          ['month', 'score', 'amount', 'product'],
          ['January', 89.3, 58212, 'Matcha Latte'],
          ['February', 57.1, 78254, 'Milk Tea'],
          ['March', 74.4, 41032, 'Cheese Cocoa'],
          ['April', 50.1, 12755, 'Cheese Brownie'],
          ['May', 89.7, 20145, 'Matcha Cocoa'],
          ['June', 68.1, 79146, 'Tea'],
          ['July', 19.6, 91852, 'Orange Juice'],
          ['August', 10.6, 101852, 'Lemon Juice'],
          ['September', 32.7, 20112, 'Walnut Brownie']
        ]
      },
      grid: { containLabel: true },
      xAxis: { name: 'amount' },
      yAxis: { type: 'category', name: 'Month' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['High Score', 'Low Score'],
        // Map the score column to color
        dimension: 1,
        inRange: {
          color: ['#65B581', '#FFCE34', '#FD665F']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: 'amount',
            // Map the "product" column to Y axis
            y: 'product'
          }
        }
      ]
    };

    option && myChart.setOption(option);

    // Clean up
    return () => {
      myChart.dispose();
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return <div id="main" style={{ width: '100%', height: '400px' }}></div>;
};

export default DashboardChart;
