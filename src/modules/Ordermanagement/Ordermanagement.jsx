import React, { useState, useEffect, useContext } from 'react';
import './ordermanagenment.scss';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import OrderDetail from '../components/modal/modalOder/modalOder'
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';

const OrderManagenment = (order) => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [reloadData, setReloadData] = useState(false);
    const [data, setData] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const statusLabels = {
        createOrder: "Đang chờ xác nhận",
        delivering: "Đang giao hàng",
        configOrder: "Đã nhận hàng",
        cancelOrder: "Đơn hàng đã bị hủy",
        PaidCreateOrder: "Đơn hàng đã thanh toán và chờ xác nhận",
        paidDelivering: "Đơn hàng đã thanh toán và đang giao hàng",
        PaidCancelOrder: "Đơn hàng đã thanh toán và đã hủy",
        payment: "Đơn hàng đã thanh toán nhưng có lỗi",
        PaymentAndCancel: "Đơn hàng đã thanh toán nhưng có lỗi và đã hủy"
    };

    console.log(data)
    const handleConfirmOrder = async (id, userId, e) => {
        e.stopPropagation();

        try {
            const token = APP_LOCAL.getTokenStorage();
            await verifyOrder(id, token);
            ToastApp.success("Xác nhận đơn hàng thành công");
            setReloadData(true);
            await sendNotification(userId);
            console.log("Thông báo thành công");
        } catch (error) {
            if (error instanceof Response) {
                const data = await error.json();
                ToastApp.warning("Cảnh báo: " + data.message);
            } else {
                ToastApp.error("Lỗi hệ thống: " + error);
            }
        }
    };

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
                            ToastApp.success("Hủy đơn hàng thành công")
                            setReloadData(true)
                        } else {
                            ToastApp.warning("Cảnh báo: " + data.message)
                        }

                    } catch (e) {
                        return ToastApp.error("Lỗi hệ thống: " + e)
                    }
                }
            }
        })

    };
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
                setData(data.data);
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
                                    <span>Danh sách đơn hàng</span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div className="order-table-container">
                        <table className="discount-table">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>ID người dùng</th>
                                    <th>Số tiền </th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                    <th>Hủy đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? data.reverse().map((order, index) => (
                                    <tr key={order.id} onClick={() => viewOrderDetail(order)}>
                                        <td>{order.id}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.total}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                        <td>{statusLabels[order.status]}</td>
                                        <td>
                                            {order.status === "payment" ? "Lỗi đơn hàng" : order.status === "createOrder" || order.status === "PaidCreateOrder" ? (
                                                <button className='btn-config-oder' onClick={(e) => handleConfirmOrder(order.id, order.userId, e)}>Xác nhận</button>
                                            ) : (
                                                <> Đã Xác nhận</>
                                            )
                                            }
                                        </td>
                                        <td>
                                            <button className='btn-cancle-oder' onClick={(e) => handleCancelOrder(order.id, e)}>Hủy đơn hàng</button>
                                        </td>
                                    </tr>
                                )) : "Đang tải dữ liệu"}
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
