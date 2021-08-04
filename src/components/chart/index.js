import React from 'react';
import {Line} from 'react-chartjs-2';



export default class Chart extends React.Component {
  render() {
    const state = {
      labels: this.props.label,
      datasets: [
        {
          label: this.props.chartName,
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: this.props.data
        }
      ]
    }

    return (
      <div>
        <h2><center>{this.props.chartName}</center></h2>
        <hr/>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text: this.props.chartName,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}