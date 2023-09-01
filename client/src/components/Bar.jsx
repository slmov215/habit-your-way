import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import { Data } from '../utils/Data';
import BarChart from './BarChart'

Chart.register(CategoryScale);

export default function BarGraph() {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.day),
        datasets: [
            {
                label: 'User Activities',
                data: Data.map((data) => data.count),
                backgroundColor: [
                    "#B9B4C7",
                ],
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    });

    return (
        <div className="BarGraph">
            <BarChart chartData={chartData} />
        </div>
    );
}