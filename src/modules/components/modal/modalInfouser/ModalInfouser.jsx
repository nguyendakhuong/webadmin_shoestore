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
    return (
        <div className="dialog-overlay">
            {
                data ? (
                    <div className="dialog">
                        <h2>Thông tin chi tiết người dùng</h2>
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Phone:</strong> {data.phone}</p>
                        <p><strong>Address:</strong> {data.address}</p>
                        <p><strong>City:</strong> {data.city}</p>
                        <p><strong>Date of Birth:</strong> {data.dob ? moment(data.dob).format('DD/MM/YYYY') : "Null"}</p>
                        <p><strong>Avatar:</strong> </p>
                        <img src={data.avatar} alt='' style={{ width: '200px', height: '200px' }} />
                        <p><strong>Gender:</strong> {data.gender}</p>
                        <button className="close-button" onClick={onClose}>Đóng</button>
                    </div>
                ) : "Đang tải dữ liệu"
            }
        </div>
    );
};

export default ModalInfoUser;
