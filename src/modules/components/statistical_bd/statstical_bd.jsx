import React, { useState } from 'react';
import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';

const StatisticalChart = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [yearlyData, setYearlyData] = useState({}); // Lưu trữ dữ liệu thống kê hàng năm

    React.useEffect(() => {
        Chart.register(BarController, LinearScale, CategoryScale, BarElement);
        // Simulate fetching data from API based on the selected year
        const fetchData = async () => {
            // Giả sử bạn có một hàm fetchData từ API trả về dữ liệu thống kê doanh thu theo năm
            try {
                const response = await fetchData(selectedYear);
                setYearlyData(response.data); // Cập nhật dữ liệu cho năm đã chọn
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedYear]);

    React.useEffect(() => {
        renderChart();
    }, [yearlyData]);

    const renderChart = () => {
        const data = {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
                {
                    label: `Doanh thu năm ${selectedYear}`,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: yearlyData // Sử dụng dữ liệu thống kê hàng năm cho biểu đồ
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
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <div>
            <h2>Biểu đồ doanh thu</h2>
            <div>
                <label>Chọn năm:</label>
                <select value={selectedYear} onChange={handleYearChange}>
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>

                </select>
            </div>
            <canvas id="myChart22" width="400" height="280"></canvas>
        </div>
    );
};

export default StatisticalChart;
