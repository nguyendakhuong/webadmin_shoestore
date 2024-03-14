import React, { useState } from 'react';
import './modalDiscountcode.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';

const ModaladdDiscountcode = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        startDate: '',
        endDate: '',
        discount: ''
    });
    const [type, setType] = useState(1);
    const clearForm = () => {
        setFormData({
            name: '',
            quantity: '',
            startDate: '',
            endDate: '',
            discount: ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleChangeRadio = (e) => {
        setType(parseInt(e.target.value));
    }

    const handleSubmit = async () => {
        const token = APP_LOCAL.getTokenStorage()
        try {
            const name = formData.name
            const discount = +formData.discount
            const startDate = formData.startDate
            const endDate = formData.endDate
            const quantity = +formData.quantity

            const response = await fetch('http://localhost:3001/discount/createDiscount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, type, discount, startDate, endDate, quantity })
            });

            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('Thêm thành công');
                clearForm();
                onClose();
            } else {
                ToastApp.warning('Cảnh báo: ' + data.message);
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">

                        <h2>Thêm mã giảm giá</h2>
                        <form onSubmit={e => e.preventDefault()}>
                            <label>
                                Tên mã:
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </label>
                            <label>
                                Số lượng:
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                            </label>
                            <label>
                                Ngày bắt đầu:
                                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            </label>
                            <label>
                                Ngày kết thúc:
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                            </label>
                            <div className="type-input">
                                <label>
                                    <text>Loại:</text>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={1}
                                        checked={type === 1}
                                        onChange={handleChangeRadio}
                                    />
                                    <span></span> VNĐ
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={2}
                                        checked={type === 2}
                                        onChange={handleChangeRadio}
                                    />
                                    <span></span> %
                                </label>
                            </div>
                            <label>
                                Trị giá:
                                <input type="number" name="discount" min={0} max={500000} value={formData.discount} onChange={handleChange} required />
                            </label>

                            <div className="modal-buttons">
                                <button onClick={handleSubmit} type="submit">Thêm mã giảm giá</button>
                                <button className="exit-button" onClick={onClose}>Thoát</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModaladdDiscountcode;
