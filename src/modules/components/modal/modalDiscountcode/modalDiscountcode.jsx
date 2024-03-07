import React, { useState } from 'react';
import './modalDiscountcode.scss';

const ModaladdDiscountcode = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        quantity: '',
        startDate: '',
        endDate: '',
        discount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // logic
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={onClose}>X</button>
                        <h2>Thêm mã giảm giá</h2>
                        <form onSubmit={handleSubmit}>
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
                                        value="%"
                                        checked={formData.type === '%'}
                                        onChange={handleChange}
                                    />
                                    <span></span> %
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="VNĐ"
                                        checked={formData.type === 'VNĐ'}
                                        onChange={handleChange}
                                    />
                                    <span></span> VNĐ
                                </label>
                            </div>
                            <label>
                                Trị giá:
                                <input type="text" name="discount" value={formData.discount} onChange={handleChange} required />
                            </label>

                            <div className="modal-buttons">
                                <button type="submit">Thêm mã giảm giá</button>
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
