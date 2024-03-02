import React from 'react';
import './User.scss'; // Import CSS file

const User = () => {
    // Giả định dữ liệu người dùng
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', verifyemail: true, role: 'admin' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', verifyemail: false, role: 'user' },
        // Thêm dữ liệu người dùng khác tại đây nếu cần
    ];

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
                                <button className="detail-button">Xem chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
