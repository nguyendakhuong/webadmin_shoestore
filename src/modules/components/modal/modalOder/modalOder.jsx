import React, { useEffect, useState } from 'react';
import './modalOder.scss';
import ToastApp from '../../../../lib/notification/Toast';

const ModalOder = ({ order, onClose }) => {
    const [data, setData] = useState([]);
    const statusLabels = {
        createOrder: "Đang chờ xác nhận",
        delivering: "Đang giao hàng",
        configOrder: "Đã nhận hàng",
        cancelOrder: "Đơn hàng đã bị hủy",
        PaidCreateOrder: "Đơn hàng đã thanh toán và chờ xác nhận",
        paidDelivering: "Đơn hàng đã thanh toán và đang giao hàng",
        PaidCancelOrder: "Đơn hàng đã thanh toán và đã hủy",
        payment: "Đơn hàng đã thanh toán nhưng có lỗi",
        PaymentAndCancel: "Đơn hàng đã thanh toán nhưng có lỗi và đã hủy"
    };
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const fetchOrderData = async () => {
        try {
            if (!order || !order.OrdersProducts) {
                return; // Nếu không có order hoặc OrdersProducts, không thực hiện gì cả
            }
            const productIds = order.OrdersProducts.map(item => item.productId);
            const response = await fetch(`http://localhost:3001/api/getProductsId/?id=${productIds.join(',')}`);
            const responseData = await response.json();
            if (responseData.status === 200) {
                const productData = responseData.data;
                const updatedData = order.OrdersProducts.map(item => {
                    const product = productData.find(p => p.id === item.productId);
                    if (product) {
                        return {
                            productId: item.productId,
                            name: product.name,
                            image: product.imageProduct,
                            quantity: item.quantity
                        };
                    }
                    return null;
                });
                setData(updatedData.filter(item => item !== null));
            } else {
                ToastApp.error('Lỗi: ' + responseData.message);
            }
        } catch (error) {
            console.log(error);
            ToastApp.error('Lỗi khi gửi yêu cầu');
        }
    };
    const updatedAtDate = new Date(order.updatedAt);
    const formattedUpdatedAt = `${updatedAtDate.getUTCDate() < 10 ? '0' + updatedAtDate.getUTCDate() :
        updatedAtDate.getUTCDate()}-${updatedAtDate.getUTCMonth() + 1 < 10 ? '0' + (updatedAtDate.getUTCMonth() + 1) :
            updatedAtDate.getUTCMonth() + 1}-${updatedAtDate.getUTCFullYear()}`;


    useEffect(() => {
        fetchOrderData();
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Chi tiết đơn hàng</h2>
                {data ? (
                    <>
                        <div className="modal1-content">
                            <div className='left-content'>
                                {data.map((item, index) => (
                                    <div key={index} className="item-container">
                                        <img src={item.image} alt='' />
                                        <div className="info">
                                            <p><strong>{item.name}</strong></p>
                                            <p>x<strong>{item.quantity}</strong></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='right-content'>
                                <p className="order-info"><strong>Mã đơn hàng:</strong> {order.id}</p>
                                <p className="order-info"><strong>ID người dùng:</strong> {order.userId}</p>
                                <p className="order-info"><strong>Số điện thoại:</strong> {order.phone}</p>
                                <p className="order-info"><strong>Địa chỉ:</strong> {order.address}</p>
                                <p className="order-info"><strong>Thời gian:</strong> {formattedUpdatedAt}</p>
                                <p className="order-info"><strong>Trạng thái:</strong> {statusLabels[order.status]}</p>
                                <hr className="order-divider" />
                            </div>
                        </div>
                        <div className="footer">
                            <p className="order-info1"><strong>Tổng tiền:</strong> {formatter.format(order.total)}</p>
                        </div>
                    </>
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
};

export default ModalOder;
