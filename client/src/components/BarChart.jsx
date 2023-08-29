import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles/BarChart.css';

const BarChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Activities Done This Week</h2>
            <div className='chart'>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            },
                        },
                        indexAxis: 'y',
                        maxBarThickness: '30',
                    }}
                />
            </div>
        </div>
    );
};

export default BarChart;