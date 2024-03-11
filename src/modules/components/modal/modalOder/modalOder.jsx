import React, { useEffect, useState, useRef } from 'react';
import './modalOder.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';

const ModalOder = ({ order, onClose, isOpen }) => {
    const [data, setData] = useState(null);

    const dialogRef = useRef();

    useEffect(() => {
        if (isOpen) {
            getOderInfo();
        }
    }, [isOpen]);

    const getOderInfo = async () => {
        const token = APP_LOCAL.getTokenStorage();
        try {
            const response = await fetch(`http://localhost:3001/order/verifyOrder/${order.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.status === 200) {
                setData(data.data);

            } else {
                onClose();
                ToastApp.warning(data.message);
            }
        } catch (e) {
            ToastApp.error("Lỗi: " + e);
        }
    };

    const handleClickOutside = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            onClose();
        }
    };

    return (
        isOpen && (
            <div className="dialog-overlay" onClick={handleClickOutside}>
                <div className="dialog" ref={dialogRef}>
                    <h2>Thông tin chi đơn hàng</h2>
                    {data ? (
                        <>
                            <div className="dialog-content">


                                <div className="info-container">

                                    <p><strong>Id:</strong> {data.id}</p>

                                    <p><strong>Số lượng:</strong> {data.quantity}</p>
                                    <p><strong>Deletedat:</strong> {data.deletedAt}</p>
                                    <p><strong>createdAt:</strong> {data.createdAt}</p>
                                    <p><strong>updatedAt:</strong> {data.updatedAt}</p>
                                    <p><strong>Sản phẩm:</strong> {data.OrderId}</p>
                                    <p><strong>Sản phẩm:</strong> {data.productId}</p>
                                </div>
                            </div>

                        </>
                    ) : "Đang tải dữ liệu"}

                </div>
            </div>
        )
    );
};

export default ModalOder;
