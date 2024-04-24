import React, { useEffect, useState } from 'react';
import './ModalInfouse.scss';
import ToastApp from '../../../../lib/notification/Toast';
import APP_LOCAL from '../../../../lib/localStorage';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ModalInfoUser = ({ user, onClose }) => {
    const [data, setData] = useState(null);
    const [t, i18n] = useTranslation();
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
            ToastApp.error("Error: " + e)
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
                            <div className="user-info">
                                <div className="avatar-container">
                                    <img src={data.avatar} alt='' />
                                </div>
                                <div className="details-container">
                                    <h2>{t('userDetails')}</h2>
                                    <p><strong>{t('name')}:</strong> {data.name}</p>
                                    <p><strong>{t('phone')}:</strong> {data.phone}</p>
                                    <p><strong>{t('address')}:</strong> {data.address}</p>
                                    <p><strong>{t('city')}:</strong> {data.city}</p>
                                    <p><strong>{t('dob')}:</strong> {data.dob ? moment(data.dob).format('DD/MM/YYYY') : "Null"}</p>
                                    <p><strong>{t('gender')}:</strong> {data.gender}</p>
                                </div>
                            </div>
                        </>
                    ) : "Đang tải dữ liệu"
                }
            </div>
        </div>
    );
};

export default ModalInfoUser;
