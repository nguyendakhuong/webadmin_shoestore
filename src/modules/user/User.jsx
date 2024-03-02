import React, { useState } from 'react';
import './User.scss';
import ModalInfouser from '../components/modal/modalInfouser/ModalInfouser';


const User = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', verifyemail: true, role: 'admin', phone: '123456789', address: '123 Main St', city: 'New York', dob: '01/01/1990', avatar: 'avatar.jpg', gender: 'Male' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', verifyemail: false, role: 'user', phone: '987654321', address: '456 Elm St', city: 'Los Angeles', dob: '02/02/1995', avatar: 'avatar.jpg', gender: 'Female' },
    ];

    const handleDetailClick = (user) => {
        setSelectedUser(user);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div className="user-container">

            <table className="header-table">
                <thead>
                    <tr>
                        <th colSpan="10">
                            <div className="purple-line"></div>
                            <span>Danh sách sản phẩm </span>
                        </th>


                    </tr>
                </thead>
            </table>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Verify Email</th>
                        <th>Role</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.verifyemail ? 'Yes' : 'No'}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="detail-button" onClick={() => handleDetailClick(user)}>Xem chi tiết</button>
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
