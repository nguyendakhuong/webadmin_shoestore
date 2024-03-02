import React from 'react';
import './ModalInfouse.scss';

const ModalInfouser = ({ user, onClose }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Thông tin chi tiết người dùng</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Date of Birth:</strong> {user.dob}</p>
                <p><strong>Avatar:</strong> {user.avatar}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <button className="close-button" onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default ModalInfouser;
