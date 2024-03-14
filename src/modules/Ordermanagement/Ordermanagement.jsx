import React, { useState, useEffect } from 'react';
import './ordermanagenment.scss';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import OrderDetail from '../components/modal/modalOder/modalOder';

const OrderManagenment = () => {
    const [confirmedOrderId, setConfirmedOrderId] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [data, setData] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getOrderStatus = async (orderId) => {
        const token = APP_LOCAL.getTokenStorage();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`http://localhost:3001/order/configOrder/${orderId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    const orderStatus = data.status;
                    console.log('Trạng thái của đơn hàng:', orderStatus);
                } else {
                    ToastApp.error('Lỗi: ' + data.message);
                }
            })
            .catch(e => {
                console.log(e);
                ToastApp.error('Lỗi khi gửi yêu cầu.');
            });
    };


    const handleCancelOrder = () => {
        setConfirmedOrderId(null);
    };

    const getOrder = async () => {
        const token = APP_LOCAL.getTokenStorage();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`http://localhost:3001/order/getOrder`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    setData(data.data);
                } else {
                    ToastApp.error('Lỗi: ' + data.message);
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getOrder();
        setReloadData(false);
    }, [reloadData]);

    const viewOrderDetail = (order) => {
        setSelectedOrder(order.id);
    };

    return (
        <div>
            {selectedOrder ? (
                <OrderDetail orderId={selectedOrder} onClose={() => setSelectedOrder(null)} />
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
                                    <tr key={order.id}>
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
                                                    <button onClick={() => getOrderStatus(order.id)}>Xác nhận</button>
                                                    <button onClick={() => handleCancelOrder(order.id)}>Hủy</button>
                                                    <button onClick={() => viewOrderDetail(order)}>Xem chi tiết</button>
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
