
import React, { useState } from 'react';
import './BestSellingProducts.scss';

const BestSellingProducts = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const bestSellingProducts = [
        { id: 1, name: 'Sản phẩm A', date: '2024-03-01' },
        { id: 2, name: 'Sản phẩm B', date: '2024-03-03' },
        { id: 3, name: 'Sản phẩm C', date: '2024-03-05' },
        { id: 4, name: 'Sản phẩm D', date: '2024-03-07' },
        { id: 5, name: 'Sản phẩm E', date: '2024-03-09' },
    ];

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filterProductsByDate = () => {
        if (startDate && endDate) {
            const filteredProducts = bestSellingProducts.filter(product => {
                return product.date >= startDate && product.date <= endDate;
            });
            return filteredProducts;
        } else {
            return bestSellingProducts;
        }
    };

    const filteredProducts = filterProductsByDate();

    return (
        <div className="best-selling-container">
            <h2>Top 5 sản phẩm bán chạy</h2>
            <div className="date-filter">
                <label htmlFor="start-date" className="date-label">Từ:</label>
                <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
                <label htmlFor="end-date" className="date-label">Đến:</label>
                <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
            </div>
            <div className="product-grid">
                {filteredProducts.map((product, index) => (
                    <div key={product.id} className={`product-item-bestsell top-${index + 1}`}>
                        <div className="background-color" />
                        <div className="top-info">
                            <div className="top-number">{index + 1}</div>
                            <div className="product-info_bestsell">{product.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellingProducts;
