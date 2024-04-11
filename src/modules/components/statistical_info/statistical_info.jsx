import React, { useEffect, useState } from 'react';
import './statistical_info.scss';

const StatisticalInfo = () => {

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
    console.log(data)
    return (
        <div className="modal-overlay_info">
            <div className="modal-content_info">
                <h2>Chi tiết thống kê</h2>
                <div className="time-selector">
                    <label htmlFor="start-date" className="date-label">Từ:</label>
                    <input type="date" id="start-date" value={startDate} name='startDate' onChange={handleStartDateChange} />
                    <label htmlFor="end-date" className="date-label">Đến:</label>
                    <input type="date" id="end-date" value={endDate} name='startDate' onChange={handleEndDateChange} />
                </div>
                <div className="grid-container_info">
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum'>Tổng số đơn hàng</div>
                        <div className="content">
                            {data.order}
                        </div>
                    </div>


                    <div className="grid-item_info">
                        <div className='grid-item_info-colum3'>Doanh thu </div>
                        <div className="content-revenue">
                            {data.totalRevenue} đ
                            {Array.isArray(data.account) ? (
                                <div>
                                    {data.account.map((item, index) => (
                                        <div key={index}>
                                            <p>Account: {item.email}</p>
                                            <p>Số lượng sản phẩm đã mua: {item.totalQuantity}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Không có dữ liệu</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatisticalInfo;
