import React, { useEffect, useState } from 'react';
import './ModalInfouse.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';

const ModalInfoUser = ({ user, onClose }) => {
    const [data, setData] = useState(null);

    const getInfoUser = async () => {
        const token = APP_LOCAL.getTokenStorage()
        try {
            const response = await fetch(`http://localhost:3001/api/getInfoUser/${user.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },

                });
            const data = await response.json();
            if (data.status === 200) {
                setData(data.data)
            } else {
                onClose(true)
                ToastApp.warning(data.message)
            }
        } catch (e) {
            ToastApp.error("Lỗi: " + e)
        }
    }

    useEffect(() => {
        getInfoUser()
    }, [])

    // Sự kiện đóng dialog khi click vào bất kỳ nơi nào trên màn hình
    const handleCloseDialog = (e) => {
        if (e.target.classList.contains('dialog-overlay')) {
            onClose();
        }
    };

    return (
        <div className="dialog-overlay" onClick={handleCloseDialog}>
            <div className="dialog">
                {
                    data ? (
                        <>
                            <h2>Thông tin chi tiết người dùng</h2>
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Phone:</strong> {data.phone}</p>
                            <p><strong>Address:</strong> {data.address}</p>
                            <p><strong>City:</strong> {data.city}</p>
                            <p><strong>Date of Birth:</strong> {data.dob ? moment(data.dob).format('DD/MM/YYYY') : "Null"}</p>
                            <p><strong>Avatar:</strong> </p>
                            <img src={data.avatar} alt='' style={{ width: '200px', height: '200px' }} />
                            <p><strong>Gender:</strong> {data.gender}</p>
                        </>
                    ) : "Đang tải dữ liệu"
                }
            </div>
        </div>
    );
};

export default ModalInfoUser;
