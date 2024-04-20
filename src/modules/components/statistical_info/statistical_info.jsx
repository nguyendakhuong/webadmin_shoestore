import React, { useEffect, useState } from 'react';
import './statistical_info.scss';
import { useTranslation } from 'react-i18next';

const StatisticalInfo = () => {
    const [t, i18n] = useTranslation();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState({
        order: 0,
        account: null,
        totalRevenue: 0
    });

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        const response = async () => {
            try {
                if (startDate && endDate) {

                    const response = await fetch('http://localhost:3001/detailStatisticalDate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ startDate, endDate })
                    });
                    const data = await response.json();
                    if (data.status === 200) {
                        setData((prevData) => ({
                            ...prevData,
                            order: data.data.totalOrders,
                            totalRevenue: data.data.totalRevenue,
                            account: data.data.user
                        }));
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
        response();
    }, [startDate, endDate])
    return (
        <div className="modal-overlay_info">
            <div className="modal-content_info">
                <h2>{t('statisticalDetails')}</h2>
                <div className="time-selector">
                    <label htmlFor="start-date" className="date-label">{t('from')}:</label>
                    <input type="date" id="start-date" value={startDate} name='startDate' onChange={handleStartDateChange} />
                    <label htmlFor="end-date" className="date-label">{t('to')}:</label>
                    <input type="date" id="end-date" value={endDate} name='startDate' onChange={handleEndDateChange} />
                </div>
                <div className="grid-container_info">
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum'>{t('totalNumberOfOrders')}</div>
                        <div className="context-statistical">
                            {data.order}
                        </div>
                    </div>
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum2'><text>{t('purchaseUserAccount')}</text></div>
                        <div className="context-statistical-account">
                            {Array.isArray(data.account) && data.account.length > 0 ? (
                                <div className="account-container-statistical">
                                    {data.account.map((item, index) => (
                                        <div className="account-item-statistical" key={index}>
                                            <div className="account-info-statistical">
                                                <p><strong>{t('account')}:</strong> {item.email}</p>
                                                <p><strong>{t('numberOfProductsPurchased')}:</strong> {item.totalQuantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>{t('noData')}</p>
                            )}
                        </div>
                    </div>




                    <div className="grid-item_info">
                        <div className='grid-item_info-colum3'>{t('revenue')}</div>
                        <div className="context-statistical">
                            {data.totalRevenue} đ

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatisticalInfo;
