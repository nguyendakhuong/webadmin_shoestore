import React from 'react';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';


const StatisticalChart = () => {
    React.useEffect(() => {
        // Đảm bảo sử dụng adapter cho Node.js nếu bạn muốn render biểu đồ trên server-side
        Chart.register(BarController, LinearScale, CategoryScale, BarElement);


        // Dữ liệu biểu đồ doanh thu (ví dụ)
        const data = {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
                {
                    label: 'Doanh thu',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [65, 59, 80, 81, 56, 55, 12, 66, 12, 33, 10, 5]
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        const ctx = document.getElementById('myChart22').getContext('2d');
        new Chart(ctx, config);
    }, []);

    return (
        <div>
            <h2>Biểu đồ doanh thu</h2>
            <canvas id="myChart22" width="400" height="280"></canvas>
        </div>
    );
}

export default StatisticalChart;
