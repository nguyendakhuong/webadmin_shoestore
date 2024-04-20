import React, { useEffect, useState, useRef } from 'react';
import './modalProduct.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';

const ModalProduct = ({ product, onClose, isOpen }) => {
    const [data, setData] = useState(null);
    const [comment, setComment] = useState(null);
    const dialogRef = useRef();

    useEffect(() => {
        if (isOpen) {
            getProductInfo();
        }
    }, [isOpen]);

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
                    <h2>Thông tin chi tiết sản phẩm</h2>
                    {data ? (
                        <>
                            <div className="dialog-content">

                                <div className="image-container">
                                    <img src={data.imageProduct} alt='' className="product-image" />
                                </div>
                                <div className="info-container">

                                    <p><strong>Tên:</strong> {data.name}</p>
                                    <p><strong>Giá:</strong> {formatter.format(data.price)}</p>
                                    <p><strong>Số lượng:</strong> {data.quantity}</p>
                                    <p><strong>Mô tả:</strong> {data.description}</p>
                                    <p><strong>Giới thiệu:</strong> {data.introduce}</p>
                                    <p><strong>Giá giảm giá:</strong> {data.priceSale ? data.priceSale : "Null"}</p>
                                    <p><strong>Thời gian bắt đầu giảm giá:</strong> {data.timeSaleStart ? moment(data.timeSaleStart).format('DD/MM/YYYY') : "Null"}</p>
                                    <p><strong>Thời gian kết thúc giảm giá:</strong> {data.timeSaleEnd ? moment(data.timeSaleEnd).format('DD/MM/YYYY') : "Null"}</p>
                                    <p><strong>Trạng thái: </strong> {data.status === 1 ? "Đang hoạt động" : "Không hoạt động"}</p>
                                    <p><strong>Loại:</strong> {data.category}</p>
                                </div>
                            </div>
                            <div className="comments">
                                <h2>Comment</h2>
                                <div className="comment-list">
                                    {comment.map(commentItem => (
                                        <div key={commentItem.createAt} className="comment-item">
                                            <p><strong>Email:</strong> {commentItem.email}</p>
                                            <p><strong>Name:</strong> {commentItem.username}</p>
                                            <p><strong>Content:</strong> {commentItem.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : "Đang tải dữ liệu"}

                </div>
            </div>
        )
    );
};

export default ModalProduct;
