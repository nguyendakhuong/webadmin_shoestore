import React, { useState, useEffect } from 'react';
import './ordermanagenment.scss';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import OrderDetail from '../components/modal/modalOder/modalOder'


const OrderManagenment = (order) => {
    const [confirmedOrderId, setConfirmedOrderId] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [data, setData] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleConfirmOrder = () => {
        const token = APP_LOCAL.getTokenStorage();
        if (!token) {
            ToastApp.error('Không có token.');
            return;
        }

        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`http://localhost:3001/order/configOrder/${order.id}`, requestOptions)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.status === 200) {
                    setData(data.data);
                } else {
                    ToastApp.error('Lỗi: ' + data.message);
                }
            })
            .catch(e => {
                console.log(e);
                ToastApp.error('Lỗi khi gửi yêu cầu.');
            });
    };


    const handleCancelOrder = (id) => {
        setConfirmedOrderId(null);
    };

    const handleRowClick = (order) => {
        setSelectedOrder(order.id);
    };

    const getOrder = async () => {
        const token = APP_LOCAL.getTokenStorage();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`http://localhost:3001/order/getOrder`, requestOptions)
            .then(res => {
                return res.json();
            }).then(data => {
                if (data.status === 200) {
                    setData(data.data);
                } else {
                    ToastApp.error('Lỗi: ' + data.message);
                }
            }).catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getOrder();
        setReloadData(false);

    }, [reloadData]);

    return (
        <div>
            {selectedOrder ? (

                <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            ) : (

                <div>
                    <table className="header-table">
                        <thead>
                            <tr>
                                <th colSpan="10">
                                    <div className="purple-line"></div>
                                    <span>Danh sách đơn hàng</span>
                                </th>
                            </tr>
                        </thead>
                    </table>

                    <div className="discount-table-container">
                        <table className="discount-table">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>ID người dùng</th>
                                    <th>Số tiền phải trả</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? data.map((order, index) => (
                                    <tr key={order.id} onClick={() => handleRowClick(order)}>
                                        <td>{order.id}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.total}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            {confirmedOrderId === order.id ? (
                                                <>Đã xác nhận</>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleConfirmOrder(order.id)}>Xác nhận</button>
                                                    <button onClick={() => handleCancelOrder(order.id)}>Hủy</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )) : "Đang tải dữ liệu"}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagenment;
