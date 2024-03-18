// statistical_info.jsx
import React, { useState } from 'react';
import './statistical_info.scss';

const StatisticalInfo = ({ onClose, data }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = () => {

        console.log('Từ ngày:', startDate);
        console.log('Đến ngày:', endDate);
    };

    return (
        <div className="modal-overlay_info">
            <div className="modal-content_info">
                <h2>Chi tiết thống kê</h2>
                <div className="time-selector">
                    <input type="date" value={startDate} onChange={handleStartDateChange} />
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                    <button onClick={handleSubmit}>Áp dụng</button>
                </div>
                <div className="grid-container_info">
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum'>Tổng số đơn hàng</div>
                        <div className="content">

                        </div>
                    </div>
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum1'>Số lượng tài khoản</div>
                        <div className="content">

                        </div>
                    </div>
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum2'>Số lượng sản phẩm</div>
                        <div className="content">

                        </div>
                    </div>
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum3'>Doanh thu </div>
                        <div className="content">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatisticalInfo;
