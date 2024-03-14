// modalOder.jsx
import React, { useEffect, useState } from 'react';
import './modalOder.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';

const ModalOder = ({ order, onClose }) => {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        const token = APP_LOCAL.getTokenStorage();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(`http://localhost:3001/order/verifyOrder/${order.id}`, requestOptions);
            const data = await response.json();
            if (data.status === 200) {
                setOrderData(data.data);
            } else {
                ToastApp.error('Lỗi: ' + data.message);
            }
        } catch (error) {
            console.log(error);
            ToastApp.error('Lỗi khi gửi yêu cầu');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Chi tiết đơn hàng</h2>
                {orderData ? (
                    <div className="modal-content">
                        <p><strong>Mã đơn hàng:</strong> {orderData.id}</p>
                        <p><strong>ID người dùng:</strong> {orderData.userId}</p>
                        <p><strong>Tổng tiền:</strong> {orderData.total}</p>
                        <p><strong>Số điện thoại:</strong> {orderData.phone}</p>
                        <p><strong>Địa chỉ:</strong> {orderData.address}</p>
                        <p><strong>Trạng thái:</strong> {orderData.status}</p>

                    </div>
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
};

export default ModalOder;
