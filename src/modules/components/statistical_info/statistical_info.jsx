import React, { useEffect, useState } from 'react';
import './statistical_info.scss';

const StatisticalInfo = () => {
    const [data, setData] = useState({
        order: 0,
        account: 0,
        product: 0,
        revenue: 0,
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
                }
                const responseOrder = await fetch(`http://localhost:3001/getOrderCount`, {
                    method: "GET",
                });
                const orderData = await responseOrder.json();
                if (orderData.status === 200) {
                    setData((prevData) => ({ ...prevData, order: orderData.data }));
                }
            } catch (e) {
                console.log(e);
            }

            try {
                const responseAccount = await fetch(`http://localhost:3001/getAccountCount`, {
                    method: "GET",
                });
                const accountData = await responseAccount.json();
                if (accountData.status === 200) {
                    setData((prevData) => ({ ...prevData, account: accountData.data }));
                }
            } catch (e) {
                console.log(e);
            }

            try {
                const responseProduct = await fetch(`http://localhost:3001/getProductCount`, {
                    method: "GET",
                });
                const productData = await responseProduct.json();
                if (productData.status === 200) {
                    setData((prevData) => ({ ...prevData, product: productData.data }));
                }
            } catch (e) {
                console.log(e);
            }

            try {
                const responseRevenue = await fetch(`http://localhost:3001/getRevenue`, {
                    method: "GET",
                });
                const revenueData = await responseRevenue.json();
                if (revenueData.status === 200) {
                    setData((prevData) => ({ ...prevData, revenue: revenueData.data }));

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
                        <div className='grid-item_info-colum1'>Số lượng tài khoản</div>
                        <div className="content">
                            {data.account}
                        </div>
                    </div>
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum2'>Số lượng sản phẩm</div>
                        <div className="content">
                            {data.product}

                        </div>
                    </div>
                    <div className="grid-item_info">
                        <div className='grid-item_info-colum3'>Doanh thu </div>
                        <div className="content-revenue">
                            {data.revenue}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatisticalInfo;
