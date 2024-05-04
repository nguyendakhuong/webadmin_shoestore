import React, { useEffect, useState, useRef } from 'react';
import './modalProduct.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ModalProduct = ({ product, onClose, isOpen }) => {
    const [data, setData] = useState(null);
    const [comment, setComment] = useState(null);
    const [size, setSize] = useState(null);
    const [t, i18n] = useTranslation();
    const dialogRef = useRef();
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const getProductInfo = async () => {
        const token = APP_LOCAL.getTokenStorage();
        try {
            const response = await fetch(`http://localhost:3001/api/getProduct/${product.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.status === 200) {
                setData(data.data);
                setComment(data.comment);
                setSize(data.size)
            } else {
                onClose();
                ToastApp.warning(data.message);
            }
        } catch (e) {
            ToastApp.error("Error: " + e);
            console.log(e)
        }
    };
    const handleClickOutside = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            onClose();
        }
    };
    useEffect(() => {
        if (isOpen) {
            getProductInfo();
        }
    }, [isOpen]);

    return (
        isOpen && (
            <div className="dialog-overlay" onClick={handleClickOutside}>
                <div className="dialog" ref={dialogRef}>
                    <h2>{t('informationProduct')}</h2>
                    {data && data?.id === product?.id ? (
                        <>
                            <div className="dialog-content">
                                <div className="image-container">
                                    <img src={data.imageProduct} alt='' className="product-image" />
                                </div>
                                <div className="info-container">
                                    <p><strong>{t('name')}:</strong> {data.name}</p>
                                    <p><strong>{t('price')}:</strong> {formatter.format(data.price)}</p>
                                    <p><strong>{t('describe')}:</strong> {data.description}</p>
                                    <p><strong>{t('introduce')}:</strong> {data.introduce}</p>
                                    <p><strong>{t('discount')}:</strong> {data.priceSale ? data.priceSale : "Null"}</p>
                                    <p><strong>{t('startDate')}:</strong> {data.timeSaleStart ? moment(data.timeSaleStart).format('DD/MM/YYYY') : "Null"}</p>
                                    <p><strong>{t('endDate')}:</strong> {data.timeSaleEnd ? moment(data.timeSaleEnd).format('DD/MM/YYYY') : "Null"}</p>
                                    <p><strong>{t('status')}: </strong> {data.status === 1 ? "Đang hoạt động" : "Không hoạt động"}</p>
                                    <p><strong>{t('category')}:</strong> {data.category}</p>
                                    {
                                        size ? size.map(v => (
                                            <div className='sizeModalProduct'>
                                                <p><strong>{t('size')}:</strong> {v.size}</p>
                                                <p><strong>{t('quantity')}:</strong> {v.quantity}</p>
                                            </div>
                                        )) : null
                                    }
                                </div>
                            </div>
                            {comment.length > 0 && (
                                <div className="comments">
                                    <h2>{t('comment')}</h2>
                                    <div className="comment-list">
                                        {comment.map(commentItem => (
                                            <div key={commentItem.createAt} className="comment-item">
                                                <p><strong>Email:</strong> {commentItem.email}</p>
                                                <p><strong>{t('name')}:</strong> {commentItem.username}</p>
                                                <p><strong>{t('content')}:</strong> {commentItem.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) :
                        `${t('loading')}`
                    }

                </div>
            </div>
        )
    );
};

export default ModalProduct;
