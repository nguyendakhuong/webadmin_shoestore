import React, { useEffect, useState } from 'react';
import './modalProduct.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';

const ModalProduct = ({ product, onClose, isOpen }) => {
    const [data, setData] = useState(null);
    const [comment, setComment] = useState(null);
    useEffect(() => {
        if (isOpen) {
            getProductInfo();

        }
    }, [isOpen]);


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
                setComment(data.comment)
            } else {
                onClose();
                ToastApp.warning(data.message);
            }
        } catch (e) {
            ToastApp.error("Lỗi: " + e);
        }
    };
    return (
        isOpen && (
            <div className="dialog-overlay">
                {data ? (
                    <div className="dialog">
                        <h2>Thông tin chi tiết sản phẩm</h2>
                        <p><strong>Tên:</strong> {data.name}</p>
                        <p><strong>Giá:</strong> {data.price}</p>
                        <p><strong>Số lượng:</strong> {data.quantity}</p>
                        <p><strong>Mô tả:</strong> {data.description}</p>
                        <p><strong>Giới thiệu:</strong> {data.introduce}</p>
                        <p><strong>Giá giảm giá:</strong> {data.priceSale ? data.priceSale : "Null"}</p>
                        <p><strong>Thời gian bắt đầu giảm giá:</strong> {data.timeSaleStart ? moment(data.timeSaleStart).format('DD/MM/YYYY') : "Null"}</p>
                        <p><strong>Thời gian kết thúc giảm giá:</strong> {data.timeSaleEnd ? moment(data.timeSaleEnd).format('DD/MM/YYYY') : "Null"}</p>
                        <p><strong>Loại:</strong> {data.category}</p>
                        <p><strong>Hình ảnh:</strong> </p>
                        <img src={data.imageProduct} alt='' style={{ width: '200px', height: '200px' }} />
                        <p><strong>Comment:</strong></p>
                        {comment.sort((a, b) => new Date(a.createAt) - new Date(b.createAt)).map(commentItem => (
                            <p key={commentItem.createAt} className="comment-item">
                                <strong>Email:</strong> {commentItem.email} <br />
                                <strong>Name:</strong> {commentItem.username} <br />
                                <strong>Content:</strong> {commentItem.content}
                            </p>
                        ))}
                        <button className="close-button" onClick={onClose}>Đóng</button>
                    </div>
                ) : "Đang tải dữ liệu"}
            </div>
        )
    );
};

export default ModalProduct;
