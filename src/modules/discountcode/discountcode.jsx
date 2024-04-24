import React, { useContext, useEffect, useState } from 'react';
import './discountcode.scss';
import deleteIcon from '../asset/image/delete.png';
import ModaladdDiscountcode from '../components/modal/modalDiscountcode/modalDiscountcode'
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import moment from 'moment';
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import { useTranslation } from 'react-i18next';

const Discountcode = () => {
    const [t, i18n] = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const [reload, setReloadData] = useState(false);
    const [userCtx, dispatch] = useContext(UserContext)
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const getData = async () => {
        const token = APP_LOCAL.getTokenStorage()
        try {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: true })
            const response = await fetch(`http://localhost:3001/discount/getData`,
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
                ToastApp.error('Error: ' + data.message);
            }
        } catch (e) {
            console.log("Error: " + e)
        } finally {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: false })
        }
    }

    const handleDeleteItem = async (item) => {
        dispatch({
            type: KEY_CONTEXT_USER.SHOW_MODAL,
            payload: {
                typeModal: 'DELETE_ITEM',
                dataModal: item.id,
                // contentModel: "Bạn có chắc chắn muốn xóa sản phẩm " + item.name + " không?",
                onClickConfirmModel: async () => {
                    const token = APP_LOCAL.getTokenStorage()
                    try {
                        dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: true })
                        const response = await fetch(`http://localhost:3001/discount/deleteDiscount/${item.id}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                },

                            });
                        const data = await response.json();
                        if (data.status === 200) {
                            ToastApp.success('Deleted successfully');
                            setReloadData(true);
                        } else {
                            ToastApp.error('Error: ' + data.message);
                        }

                    } catch (e) {
                        console.log("Lỗi xóa sản phẩm: ", e)
                    } finally {
                        dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: false })
                    }
                },
            },
        })
    }

    useEffect(() => {
        getData();
        setReloadData(false);
    }, [isModalOpen, reload])
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    return (
        <div>
            <table className="header-table">
                <thead>
                    <tr>
                        <th colSpan="10">
                            <div className="purple-line"></div>
                            <span>{t('codes')}</span>
                            <button className="discount-button" onClick={handleOpenModal}>{t('addCodes')}</button>
                        </th>
                    </tr>
                </thead>
            </table>

            <div className="discount-table-container">
                <table className="discount-table">
                    <thead>
                        <tr>
                            <th>{t('nameCode')}</th>
                            <th>{t('category')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('discount')}</th>
                            <th>{t('startDate')}</th>
                            <th>{t('endDate')}</th>
                            <th>{t('status')}</th>
                            <th>{t('act')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    {
                        data ? <tbody >
                            {data.map(value => (
                                <tr key={value.id} >
                                    <td>{value.name}</td>
                                    <td>{value.type === 1 ? `${t('direct')}` : `${t('decrease')}`}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.type === 1 ? formatter.format(value.discount) : value.discount + " %"}</td>

                                    <td>{value.startDate ? moment(value.startDate).format('DD/MM/YYYY') : "null"}</td>
                                    <td>{value.endDate ? moment(value.endDate).format('DD/MM/YYYY') : "null"}</td>
                                    <td className={
                                        value.endDate && value.startDate &&
                                            moment(value.endDate).isAfter(value.startDate) &&
                                            moment(value.endDate).isAfter(moment()) &&
                                            moment(value.startDate).isBefore(moment())
                                            ? 'active' : 'inactive'}>
                                        {value.endDate && value.startDate &&
                                            moment(value.endDate).isAfter(value.startDate) &&
                                            moment(value.endDate).isAfter(moment()) &&
                                            moment(value.startDate).isBefore(moment())
                                            ? <span className="active-text">{t('active')}</span>
                                            : <span className="inactive-text">{t('inactive')}</span>}
                                    </td>

                                    <td>
                                        <div onClick={() => handleDeleteItem(value)}>
                                            <img src={deleteIcon} alt="Delete" style={{ width: '20px' }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody> : <div>
                            Đang tải dữ liệu
                        </div>
                    }
                </table>
            </div>


            <ModaladdDiscountcode isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Discountcode;
