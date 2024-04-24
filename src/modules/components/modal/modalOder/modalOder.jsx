import React, { useEffect, useState } from 'react';
import './modalOder.scss';
import ToastApp from '../../../../lib/notification/Toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ModalOder = ({ order, onClose }) => {
    const [data, setData] = useState([]);
    const [t, i18n] = useTranslation();
    const navigation = useNavigate()
    const statusLabels = {
        createOrder: `${t('createOrder')}`,
        delivering: `${t('delivering')}`,
        configOrder: `${t('configOrder')}`,
        cancelOrder: `${t('orderCancel')}`,
        PaidCreateOrder: `${t('paidCreateOrder')}`,
        paidDelivering: `${t('paidDelivering')}`,
        PaidCancelOrder: `${t('PaidCancelOrder')}`,
        payment: `${t('payment')}`,
        PaymentAndCancel: `${t('PaymentAndCancel')}`
    };

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const fetchOrderData = async () => {
        try {
            if (!order || !order.OrdersProducts) {
                return;
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
                ToastApp.error('Error: ' + responseData.message);
            }
        } catch (error) {
            console.log(error);
            // ToastApp.error('Lỗi khi gửi yêu cầu');
        }
    };
    const handlerDeleteOder = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/order/deleteOrder/${id}`, {
                method: "GET",
            });
            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('' + data.message)
                onClose()
            } else {
                ToastApp.error('Error: ' + data.message);
            }
        } catch (e) {
            console.log("Error:" + e)
        }
    }
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
                <h2>{t('orderDetails')}</h2>
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
                                <p className="order-info"><strong>{t('orderCode')}:</strong> {order.id}</p>
                                <p className="order-info"><strong>{t('userCode')}:</strong> {order.userId}</p>
                                <p className="order-info"><strong>{t('phone')}:</strong> {order.phone}</p>
                                <p className="order-info"><strong>{t('address')}:</strong> {order.address}</p>
                                <p className="order-info"><strong>{t('time')}:</strong> {formattedUpdatedAt}</p>
                                <p className="order-info"><strong>{t('status')}:</strong> {statusLabels[order.status]}</p>
                                <hr className="order-divider" />

                                {(order.status === "cancelOrder" || order.status === "PaidCancelOrder") && (
                                    <div className='divCancelOrder'>
                                        <button className='btnCancelOrder' onClick={() => handlerDeleteOder(order.id)}>{t('deleteOrder')}</button>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="footer">
                            <p className="order-info1"><strong>{t('total')}:</strong> {formatter.format(order.total)}</p>
                        </div>
                    </>
                ) : (
                    <p>{t('loading')}</p>
                )}
            </div>
        </div>
    );
};

export default ModalOder;
