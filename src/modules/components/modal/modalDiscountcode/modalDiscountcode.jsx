import React, { useState } from 'react';
import './modalDiscountcode.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';

const ModaladdDiscountcode = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '1',
        quantity: '',
        startDate: '',
        endDate: '',
        discount: ''
    });
    const clearForm = () => {
        setFormData({
            name: '',
            type: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = APP_LOCAL.getTokenStorage()
        try {
            const formDataToSend = new FormData()

            formDataToSend.append('name', formData.name)
            formDataToSend.append('type', formData.type)
            formDataToSend.append('discount', formData.discount)
            formDataToSend.append('startDate', formData.startDate)
            formDataToSend.append('endDate', formData.endDate)
            formDataToSend.append('quantity', formData.quantity)

            const response = await fetch("http://localhost:3001/discount/createDiscount",
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formDataToSend,
                });

            const data = await response.json();
            console.log("data =======================>", data)
            if (data.status === 200) {
                ToastApp.success('Thêm thành công');
                clearForm();
                onClose();

            } else {
                ToastApp.warning('Cảnh báo: ' + data.message);
            }
        } catch (e) {
            ToastApp.error("Lỗi: " + e)
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={onClose}>X</button>
                        <h2>Thêm mã giảm giá</h2>
                        <form>
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
                                        value="1"
                                        checked={true}
                                        onChange={handleChange}
                                    />
                                    <span></span> VNĐ
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="2"
                                        onChange={handleChange}
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
