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
    };
    const fetchOrderData = async () => {
        try {
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

    useEffect(() => {
        fetchOrderData();
    }, []);


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Chi tiết đơn hàng</h2>
                {data ? (
                    <div className="modal-content">
                        <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                        <p><strong>ID người dùng:</strong> {order.userId}</p>
                        <p><strong>Tổng tiền:</strong> {order.total}</p>
                        <p><strong>Số điện thoại:</strong> {order.phone}</p>
                        <p><strong>Địa chỉ:</strong> {order.address}</p>
                        <p><strong>Trạng thái:</strong> {statusLabels[order.status]}</p>

                        <div>
                            {data.map((item, index) => (
                                <div key={index}>
                                    <p><strong>Tên sản phẩm :</strong> {item.name}</p>
                                    <p><strong>Số lượng đơn hàng:</strong> {item.quantity} </p>
                                    <p><img src={item.image} alt='' /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
};

export default ModalOder;
