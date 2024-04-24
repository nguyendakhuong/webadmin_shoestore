import React, { useState, useEffect, useContext } from 'react';
import './ordermanagenment.scss';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import OrderDetail from '../components/modal/modalOder/modalOder'
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import { useTranslation } from 'react-i18next';

const OrderManagenment = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [reloadData, setReloadData] = useState(false);
    const [data, setData] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchDataOder, setSearchDataOrder] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [t, i18n] = useTranslation();

    const statusLabels = {
        createOrder: `${t('createOrder')}`,
        delivering: `${t('delivering')}`,
        configOrder: `${t('configOrder')}`,
        cancelOrder: `${t('orderCancel')}`,
        PaidCreateOrder: `${t('paidCreateOrder')}`,
        paidDelivering: `${t('paidDelivering')}`,
        PaidCancelOrder: `${t('PaidCancelOrder')}`,
        payment: `${t('payment')}`,
        PaymentAndCancel: `${t('PaymentAndCancel')}`
    };

    const handleConfirmOrder = async (id, userId, e) => {
        e.stopPropagation();
        try {
            const token = APP_LOCAL.getTokenStorage();
            await verifyOrder(id, token);
            ToastApp.success("Order confirmation successful");
            setReloadData(true);
            await sendNotification(userId);
        } catch (error) {
            if (error instanceof Response) {
                const data = await error.json();
                ToastApp.warning("Warning: " + data.message);
            } else {
                ToastApp.error("Error server: " + error);
            }
        }
    };

    const handleInputSearch = (e) => {
        const { name, value } = e.target
        if (name === "search") {
            setSearchDataOrder(value.trim())
        }
    }

    useEffect(() => {
        const searchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/order/searchOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ phone: searchDataOder })
                });
                const searchData = await response.json();
                if (searchData.status === 200) {
                    setDataSearch(searchData.data);
                } else {
                    ToastApp.error('Error: ' + searchData.message);
                }
            } catch (e) {
                console.log("Error search:" + e)
            }
        }

        if (searchDataOder) {
            searchData()
        }
    }, [searchDataOder])

    const verifyOrder = async (id, token) => {
        const response = await fetch(`http://localhost:3001/order/verifyOrder/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw response;
        }
    };

    const sendNotification = async (userId) => {
        const response = await fetch(`http://localhost:3001/notification/notification${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw response;
        }
    };
    const handleCancelOrder = async (id, e) => {
        e.stopPropagation();
        dispatch({
            type: KEY_CONTEXT_USER.SHOW_MODAL,
            payload: {
                typeModal: 'DELETE_ITEM',
                dataModal: id,
                contentModel: "Bạn có chắc chắn muốn hủy đơn hàng " + id + " không?",
                onClickConfirmModel: async () => {
                    const token = APP_LOCAL.getTokenStorage()
                    try {
                        const response = await fetch(`http://localhost:3001/order/verifyCancelOrder/${id}`, {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const data = await response.json();
                        if (data.status === 200) {
                            ToastApp.success("Cancel order successfully")
                            setReloadData(true)
                        } else {
                            ToastApp.warning("Warning: " + data.message)
                        }

                    } catch (e) {
                        return ToastApp.error("Error: " + e)
                    }
                }
            }
        })

    };
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    const handleConfigOder = async (id, e) => {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:3001/order/adminVerifyOrder/${id}`, {
                method: "GET",
            });
            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('' + data.message)
            } else {
                ToastApp.error('Error: ' + data.message);
            }
        } catch (e) {
            console.log("Error:" + e)
        }
    }
    const getOrder = async () => {
        const token = APP_LOCAL.getTokenStorage();
        try {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: true })
            const requestOptions = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(`http://localhost:3001/order/getOrder`, requestOptions)
            const data = await response.json();
            if (data.status === 200) {
                const sortedData = data.data.sort((a, b) => b.id - a.id);
                setData(sortedData);
            }
        }
        catch (e) {
            console.log(e)
        } finally {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: false })
        }
    };


    useEffect(() => {
        getOrder();
        setReloadData(false);
    }, [reloadData]);

    const viewOrderDetail = (order) => {
        setSelectedOrder(order);
    };
    const OrderTableRow = ({ order, handleConfirmOrder, handleCancelOrder, viewOrderDetail, statusLabels }) => {
        const updatedAtDate = new Date(order.updatedAt);
        const formattedUpdatedAt = `${updatedAtDate.getUTCDate() < 10 ? '0' + updatedAtDate.getUTCDate() :
            updatedAtDate.getUTCDate()}-${updatedAtDate.getUTCMonth() + 1 < 10 ? '0' + (updatedAtDate.getUTCMonth() + 1) :
                updatedAtDate.getUTCMonth() + 1}-${updatedAtDate.getUTCFullYear()}`;

        return (
            <tr key={order.id} onClick={() => viewOrderDetail(order)}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{formatter.format(order.total)}</td>
                <td>{order.phone}</td>
                <td>{formattedUpdatedAt}</td>
                <td>{order.address}</td>
                <td>{statusLabels[order.status]}</td>
                <td>
                    {order.status === "payment" ? `${t('payment')}` : order.status === "createOrder" || order.status === "PaidCreateOrder" ? (
                        <button className='btn-config-oder' onClick={(e) => handleConfirmOrder(order.id, order.userId, e)}>{t('confirm')}</button>
                    ) : (
                        <>{t('confirmed')}</>
                    )}
                </td>
                <td>
                    <button className='btn-cancle-oder' onClick={(e) => handleCancelOrder(order.id, e)}>{t('cancelOrder')}</button>
                </td>
                <td>
                    <button className='btn-configOder' onClick={(e) => handleConfigOder(order.id, e)}>{t('receive')}</button>
                </td>
            </tr>
        );
    };


    return (
        <div>
            {selectedOrder ? (
                <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            ) : (
                <div>
                    <table className="header-table">
                        <thead>
                            <tr>
                                <th colSpan="10">
                                    <div className="purple-line"></div>
                                    <span>{t('orders')}</span>
                                    <div className="search-box-oder">
                                        <input type="text"
                                            placeholder={t('searchPhone')}
                                            name="search"
                                            value={searchDataOder}
                                            onChange={handleInputSearch} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div className="order-table-container">
                        <table className="discount-table">
                            <thead>
                                <tr>
                                    <th>{t('orderCode')}</th>
                                    <th>{t('userCode')}</th>
                                    <th>{t('money')} </th>
                                    <th>{t('phone')}</th>
                                    <th>{t('time')}</th>
                                    <th>{t('address')}</th>
                                    <th>{t('orders')}</th>
                                    <th>{t('act')}</th>
                                    <th>{t('cancelOrder')}</th>
                                    <th>{t('OrderConfirmation')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSearch && dataSearch.length > 0 ? (
                                    dataSearch.map((order, index) => (
                                        <OrderTableRow
                                            key={order.id}
                                            order={order}
                                            handleConfirmOrder={handleConfirmOrder}
                                            handleCancelOrder={handleCancelOrder}
                                            viewOrderDetail={viewOrderDetail}
                                            statusLabels={statusLabels}
                                        />
                                    ))
                                ) : (
                                    data && data.length > 0 ? (
                                        data.map((order, index) => (
                                            <OrderTableRow
                                                key={order.id}
                                                order={order}
                                                handleConfirmOrder={handleConfirmOrder}
                                                handleCancelOrder={handleCancelOrder}
                                                viewOrderDetail={viewOrderDetail}
                                                statusLabels={statusLabels}
                                            />
                                        ))
                                    ) : null
                                )}
                            </tbody>


                        </table>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default OrderManagenment;
