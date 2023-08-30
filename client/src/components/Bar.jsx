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
                    "#b5d3f1",
                ],
                borderColor: 'black',
                borderWidth: 2,
            }
        ]
    });

    return (
        <div className="BarGraph">
            <BarChart chartData={chartData} />
        </div>
    );
}