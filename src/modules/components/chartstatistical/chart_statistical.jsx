import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const dataByProduct = {
    product1: [
        { month: 'January', quantity: 30 },
        { month: 'February', quantity: 40 },
        { month: 'March', quantity: 50 },
        { month: 'April', quantity: 35 },
        { month: 'May', quantity: 45 },
        { month: 'June', quantity: 55 },
        { month: 'July', quantity: 60 },
        { month: 'August', quantity: 70 },
        { month: 'September', quantity: 80 },
        { month: 'October', quantity: 90 },
        { month: 'November', quantity: 100 },
        { month: 'December', quantity: 110 },
    ],
    product2: [
        { month: 'January', quantity: 25 },
        { month: 'February', quantity: 35 },
        { month: 'March', quantity: 45 },
        { month: 'April', quantity: 40 },
        { month: 'May', quantity: 50 },
        { month: 'June', quantity: 60 },
        { month: 'July', quantity: 70 },
        { month: 'August', quantity: 80 },
        { month: 'September', quantity: 90 },
        { month: 'October', quantity: 100 },
        { month: 'November', quantity: 20 },
        { month: 'December', quantity: 10 },
    ],
};

const MyBarChart = () => {
    const [selectedProduct, setSelectedProduct] = useState('product1');
    const [selectedYear, setSelectedYear] = useState('');

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const selectedProductData = dataByProduct[selectedProduct];

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ marginLeft: '180px', marginRight: '10px' }}>
                    <label htmlFor="product" style={{ marginRight: '20px' }}>Chọn sản phẩm:</label>
                    <select id="product" value={selectedProduct} onChange={handleProductChange} style={{ width: '300px', padding: '5px' }}>
                        <option value="product1">Sản phẩm 1</option>
                        <option value="product2">Sản phẩm 2</option>
                        {/* Thêm các option cho các sản phẩm khác */}
                    </select>
                </div>
                <div>
                    <label htmlFor="year" >Chọn năm:</label>
                    <select id="year" value={selectedYear} onChange={handleYearChange} style={{ width: '200px', padding: '5px' }}>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        {/* Thêm các option cho các năm khác */}
                    </select>
                </div>
            </div>
            <div style={{ width: '840px', height: '460px', margin: '0 auto' }}>
                <ResponsiveBar
                    data={selectedProductData}
                    keys={['quantity']}
                    indexBy="month"
                    margin={{ top: 50, right: 130, bottom: 45, left: 55 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Số lượng đơn hàng',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </div>
    );
};

export default MyBarChart;
