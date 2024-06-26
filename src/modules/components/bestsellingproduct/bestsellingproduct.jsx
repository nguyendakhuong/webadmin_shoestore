
import React, { useEffect, useState } from 'react';
import './BestSellingProducts.scss';
import { useTranslation } from 'react-i18next';
const BestSellingProducts = () => {

    const [t, i18n] = useTranslation();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = '';
                if (startDate && endDate) {
                    url = 'http://localhost:3001/statistical';
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ startDate, endDate })
                    });
                    const data = await response.json();
                    if (data.status === 200) {
                        setData(data.data);
                    }
                } else {
                    url = 'http://localhost:3001/topProduct';
                    const response = await fetch(url, {
                        method: 'GET'
                    });
                    const data = await response.json();
                    if (data.status === 200) {
                        setData(data.data);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [startDate, endDate]);
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    return (
        <div className="best-selling-container">
            <h2>{t('top5Products')}</h2>
            <div className="date-filter">
                <label htmlFor="start-date" className="date-label">{t('from')}:</label>
                <input type="date" id="start-date" value={startDate} name='startDate' onChange={handleStartDateChange} />
                <label htmlFor="end-date" className="date-label">{t('to')}:</label>
                <input type="date" id="end-date" value={endDate} name='startDate' onChange={handleEndDateChange} />
            </div>
            <div className="product-grid">
                {data ? (
                    data.map((product, index) => (
                        <div key={product.id} className={`product-item-bestsell top-${index + 1}`}>
                            <div className="background-color" />
                            <div className="top-info">
                                <div className="top-number">{index + 1}</div>
                                <div className="product-info_bestsell">{product.productName}</div>
                                <div className="product-info_bestsell">{t('numberOfOrders')}:{product.totalQuantity}</div>
                            </div>
                        </div>
                    ))) : `${t('loading')}`}
            </div>
        </div>
    );
};

export default BestSellingProducts;
