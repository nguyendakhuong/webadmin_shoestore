import React, { useContext, useEffect, useState } from 'react';
import './User.scss';
import ModalInfoUser from '../components/modal/modalInfouser/ModalInfouser';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';

const User = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [data, setData] = useState(null);
    const [reloadData, setReloadData] = useState(false);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setShowDialog(true);
    };

    const handleLockToggle = (user, e) => {
        e.stopPropagation()
        if (user.role === 1) {
            try {
                dispatch({
                    type: KEY_CONTEXT_USER.SHOW_MODAL,
                    payload: {
                        typeModal: 'DELETE_ITEM',
                        dataModal: user.id,
                        contentModel: "Bạn có chắc chắn muốn khóa tài khoản " + user.name + " không?",
                        onClickConfirmModel: async () => {
                            const token = APP_LOCAL.getTokenStorage()
                            try {
                                const response = await fetch(`http://localhost:3001/api/banUser/${user.id}`,
                                    {
                                        method: 'GET',
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },

                                    });
                                const data = await response.json();
                                if (data.status === 200) {
                                    ToastApp.success('Khóa thành công');
                                    setReloadData(true);
                                } else {
                                    ToastApp.error('Lỗi: ' + data.message);
                                }

                            } catch (e) {
                                console.log("Lỗi xóa sản phẩm: ", e)
                            }
                        },
                    },
                })
            } catch (e) {
                ToastApp.error("Lỗi: " + e)
            }
        }
        if (user.role === 2) {
            try {
                dispatch({
                    type: KEY_CONTEXT_USER.SHOW_MODAL,
                    payload: {
                        typeModal: 'DELETE_ITEM',
                        dataModal: user.id,
                        contentModel: "Bạn có chắc chắn muốn mở khóa khóa tài khoản " + user.name + " không?",
                        onClickConfirmModel: async () => {
                            const token = APP_LOCAL.getTokenStorage()
                            try {
                                const response = await fetch(`http://localhost:3001/api/openUser/${user.id}`,
                                    {
                                        method: 'GET',
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        },

                                    });
                                const data = await response.json();
                                if (data.status === 200) {
                                    ToastApp.success('Khóa thành công');
                                    setReloadData(true);
                                } else {
                                    ToastApp.error('Lỗi: ' + data.message);
                                }

                            } catch (e) {
                                console.log("Lỗi xóa sản phẩm: ", e)
                            }
                        },
                    },
                })
            } catch (e) {
                ToastApp.error("Lỗi: " + e)
            }
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

    const getAccounts = async () => {
        const token = APP_LOCAL.getTokenStorage();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`http://localhost:3001/api/Accounts`, requestOptions)
            .then(res => {

                return res.json()
            }).then(data => {
                console.log(data)
                if (data.status === 200) {
                    setData(data.data)
                } else {
                    ToastApp.error('Lỗi: ' + data.message)
                }
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getAccounts();
        setReloadData(false);
    }, [reloadData]);

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
                    {data ?
                        data.map((user, index) => (
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
                                <td>{user.verifyEmail === true ? 'Đã xác thực' : 'Chưa xác thực'}</td>
                                <td>
                                    <button
                                        id={`lockButton-${user.id}`}
                                        className="lock-button"
                                        onClick={(e) => { handleLockToggle(user, e); }}
                                        style={{ backgroundColor: user.role === 1 ? 'blue' : 'red' }}
                                    >
                                        {user.role === 1 ? 'Khóa tài khoản' : 'Đã khóa'}
                                    </button>
                                </td>
                            </tr>
                        )) : "Đang tải dữ liệu"
                    }
                </tbody>
            </table>

            {showDialog && selectedUser && (
                <ModalInfoUser user={selectedUser} onClose={handleCloseDialog} />
            )}
        </div>
    );
};

export default User;
