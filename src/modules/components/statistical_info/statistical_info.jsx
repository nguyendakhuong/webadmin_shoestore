import React, { useEffect, useState } from 'react';
import './statistical_info.scss';

const StatisticalInfo = () => {
    const [data, setData] = useState({
        order: 0,
        account: 0,
        product: 0,
        revenue: 0,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
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
    }, []);
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
                        <div className="content">
                            {data.revenue}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatisticalInfo;
