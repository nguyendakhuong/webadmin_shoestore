import React, { useState } from 'react';
import './User.scss';
import ModalInfouser from '../components/modal/modalInfouser/ModalInfouser';

const User = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', verifyemail: true, locked: false, phone: '123456789', address: '123 Main St', city: 'New York', dob: '01/01/1990', avatar: 'avatar.jpg', gender: 'Male' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', verifyemail: false, locked: true, phone: '987654321', address: '456 Elm St', city: 'Los Angeles', dob: '02/02/1995', avatar: 'avatar.jpg', gender: 'Female' },
    ];

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setShowDialog(true);
    };

    const handleLockToggle = (user) => {
        user.locked = !user.locked;
        const lockButton = document.getElementById(`lockButton-${user.id}`);
        if (user.locked) {
            lockButton.textContent = 'Mở khóa';
            lockButton.style.backgroundColor = 'red';
        } else {
            lockButton.textContent = 'Khóa tài khoản';
            lockButton.style.backgroundColor = 'blue';
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleMouseEnter = (index) => {
        setHoveredRow(index);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    return (
        <div className="user-container">
            <table className="header-table">
                <thead>
                    <tr>
                        <th colSpan="10">
                            <div className="purple-line"></div>
                            <span>Danh sách người dùng</span>
                        </th>
                    </tr>
                </thead>
            </table>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Mã người dùng</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Xác nhận Email</th>

                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user.id}
                            onClick={() => handleRowClick(user)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={{ backgroundColor: hoveredRow === index ? '#f5f5f5' : 'transparent' }}
                        >
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.verifyemail ? 'Yes' : 'No'}</td>

                            <td>
                                <button
                                    id={`lockButton-${user.id}`}
                                    className="lock-button"
                                    onClick={(e) => { e.stopPropagation(); handleLockToggle(user); }}
                                    style={{ backgroundColor: user.locked ? 'red' : 'blue' }}
                                >
                                    {user.locked ? 'Mở khóa' : 'Khóa tài khoản'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDialog && selectedUser && (
                <ModalInfouser user={selectedUser} onClose={handleCloseDialog} />
            )}
        </div>
    );
};

export default User;
