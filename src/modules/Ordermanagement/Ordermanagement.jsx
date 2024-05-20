import React, { useState, useEffect, useContext } from 'react';
import './ordermanagenment.scss';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import OrderDetail from '../components/modal/modalOder/modalOder'
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import { useTranslation } from 'react-i18next';
import ButtonDropDown from '../components/dropdowbutton/Button-dropdown';
import logo from '../asset/image/logo.png'
//import Select from 'react-select'

const OrderManagenment = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [reloadData, setReloadData] = useState(false);
    const [data, setData] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchDataOder, setSearchDataOrder] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [t, i18n] = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPage, setItemPage] = useState(5);
    const lastIndex = currentPage * itemPage;
    const firstIndex = lastIndex - itemPage;
    const records = data ? data.slice(firstIndex, lastIndex) : null
    const nPage = data ? Math.ceil(data.length / itemPage) : null;
    const numbers = [...Array(nPage + 1).keys()].slice(1)

    const options = [
        { value: 1, label: '1' },
        { value: 5, label: '5' },
        { value: 10, label: '10' }
    ]
    const buttonItem = [
        {
            label: t('confirm'), key: 'verifyOrder'
        },
        {
            label: t('cancel'), key: 'CancelOrder'
        },
        {
            label: t('receive'), key: 'ConfigOder'
        },
    ]
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleSelect = (e) => {
        setItemPage(e.target.value)
        setCurrentPage(1)
    }
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

    const verifyOrder = async (id) => {

        const token = APP_LOCAL.getTokenStorage();

        try {
            const response = await fetch(`http://localhost:3001/order/verifyOrder/${id}`, {
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
    };
    const handleCancelOrder = async (id) => {
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
    const handleConfigOder = async (id) => {
        // e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:3001/order/adminVerifyOrder/${id}`, {
                method: "GET",
            });
            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('Success: ' + data.message)
                setReloadData(true)
            } else {
                ToastApp.warning('Warning: ' + data.message);
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
    }, [reloadData, selectedOrder]);

    const viewOrderDetail = (order) => {
        setSelectedOrder(order);
    };





    const OrderTableRow = ({ order, handleCancelOrder, viewOrderDetail, statusLabels }) => {
        const updatedAtDate = new Date(order.updatedAt);
        const formattedUpdatedAt = `${updatedAtDate.getUTCDate() < 10 ? '0' + updatedAtDate.getUTCDate() :
            updatedAtDate.getUTCDate()}-${updatedAtDate.getUTCMonth() + 1 < 10 ? '0' + (updatedAtDate.getUTCMonth() + 1) :
                updatedAtDate.getUTCMonth() + 1}-${updatedAtDate.getUTCFullYear()}`;
        const handleItemClick = (key) => {
            if (key === "verifyOrder") verifyOrder(order.id)
            if (key === "CancelOrder") handleCancelOrder(order.id)
            if (key === "ConfigOder") handleConfigOder(order.id)
        };
        const handlePrint = (order) => {
            const printContent = printOrder(order);
            const printFrame = document.createElement('iframe');
            printFrame.style.position = 'absolute';
            printFrame.style.width = '0';
            printFrame.style.height = '0';
            printFrame.style.border = 'none';
            document.body.appendChild(printFrame);
            const doc = printFrame.contentWindow.document;
            doc.open();
            doc.write(printContent);
            doc.close();
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();
            document.body.removeChild(printFrame);
        }

        const printOrder = (order) => {
            return `
                <html>
                    <head>
                        <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                        .order-container { border: 1px solid #ddd; padding: 20px; max-width: 800px; margin: auto; }
                        .order-header { text-align: center; margin-bottom: 20px; }
                        .order-header h1 { margin: 0; }
                        .order-details { margin-bottom: 20px; }
                        .order-details p { margin: 5px 0; }
                        .order-products { margin-bottom: 20px; }
                        .order-products h2 { border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                        .product-table { width: 100%; border-collapse: collapse; }
                        .product-table th, .product-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        .product-table th { background-color: #f2f2f2; }
                    </style>
                    </head>
                    <body>
                        <div class="order-container">
                            <div class="order-header">
                                <h1>Hóa đơn</h1>
                            </div>
                            <div class="order-details">
                                <p><strong>Tên cửa hàng:</strong> Shoe Store</p>
                                <p><strong>Mã đơn hàng:</strong> ${order.id}</p>
                                <p><strong>Tên khách hàng:</strong> ${order.userName}</p>
                                <p><strong>Số điện thoại:</strong> ${order.phone}</p>
                                <p><strong>Địa chỉ giao hàng:</strong> ${order.address}</p>
                                <p><strong>Ngày giao:</strong> ${formattedUpdatedAt}</p>
                                <p><strong>Số tiền thanh toán:</strong> ${formatter.format(order.total)}</p>
                            </div>
                            <div class="order-products">
                            <h2>Products</h2>
                            <table class="product-table">
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Size</th>
                                        <th>Số lượng</th>
                                        <th>Giá tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${order.OrdersProducts ? order.OrdersProducts.map(product => `
                                        <tr>
                                            <td>${product.nameProduct}</td>
                                            <td>${product.size}</td>
                                            <td>${product.quantity}</td>
                                            <td>${formatter.format(product.price)}</td>
                                        </tr>
                                    `).join('') : '<tr><td colspan="3">No products</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </body>
                </html>
            `;
        };

        return (
            <tr key={order.id} onClick={() => viewOrderDetail(order)}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.phone}</td>
                <td>
                    {order.OrdersProducts ? order.OrdersProducts.map((product, index) => (
                        <div key={index}>
                            {product.nameProduct}({t('size')} : {product.size}, {t('quantity')} : {product.quantity})
                        </div>
                    )) : null}
                </td>
                <td>{formatter.format(order.total)}</td>
                <td>{formattedUpdatedAt}</td>
                <td>{order.address}</td>
                <td>{statusLabels[order.status]}</td>
                <td>
                    <div className='buttonACT' onClick={(e) => { e.stopPropagation(); }}>
                        <button className='buttonPrint' onClick={(e) => { e.stopPropagation(); handlePrint(order); }}>
                            Print
                        </button>
                        <ButtonDropDown buttonItem={buttonItem} onItemClick={handleItemClick} orderStatus={order.status} />
                    </div>
                </td>
            </tr>
        );
    };

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const changePage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }
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
                                    <th>{t('userName')}</th>
                                    <th>{t('phone')}</th>
                                    <th>{t('product')}</th>
                                    <th>{t('money')} </th>
                                    <th>{t('time')}</th>
                                    <th>{t('address')}</th>
                                    <th>{t('statusOrder')}</th>
                                    <th>{t('act')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSearch && searchDataOder ? (
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
                                    records && records.length > 0 ? (
                                        records.map((order, index) => (
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
                        <nav className={`${searchDataOder ? 'inactivePagination' : null}`}>
                            {numbers && numbers.length >= 10 ? (
                                <ul className='pagination'>
                                    <li className='page-item'>
                                        <a href="#" className='pageLink' onClick={prePage}>
                                            Prev
                                        </a>
                                    </li>
                                    {numbers.length > 7 && currentPage >= 6 && (
                                        <li className='page-item'>
                                            <a href="#" className={`pageLink`} onClick={() => changePage(1)}>
                                                1
                                            </a>
                                        </li>
                                    )}
                                    {currentPage > 5 && <li className='page-item'>...</li>}

                                    {numbers
                                        .slice(currentPage > 5 ? currentPage - 3 : 0, currentPage + 3)
                                        .map((n, i) => (
                                            <li className='page-item' key={i}>
                                                <a
                                                    href="#"
                                                    className={`pageLink ${currentPage === n ? 'active' : ''}`}
                                                    onClick={() => changePage(n)}
                                                >
                                                    {n}
                                                </a>
                                            </li>
                                        ))}
                                    {currentPage < numbers.length - 3 && <li className='page-item'>...</li>}

                                    {numbers.length > 7 && currentPage < numbers.length - 3 && (
                                        <li className='page-item'>
                                            <a href="#" className={`pageLink`} onClick={() => changePage(numbers.length)}>
                                                {numbers.length}
                                            </a>
                                        </li>
                                    )}
                                    <li className='page-item'>
                                        <a href="#" className='pageLink' onClick={nextPage}>
                                            Next
                                        </a>
                                    </li>
                                    <div className='selectPagination'>
                                        <select onChange={handleSelect}>
                                            {options.map((option, index) => (
                                                <option key={index} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </ul>
                            ) : (
                                <ul className='pagination'>
                                    <li className='page-item'>
                                        <a href="#" className='pageLink' onClick={prePage}>
                                            Prev
                                        </a>
                                    </li>
                                    {
                                        numbers.map((n, i) => (
                                            <li className='page-item' key={i}>
                                                <a href="#" className={`pageLink ${currentPage === n ? 'active' : ""}`} onClick={() => changePage(n)}>
                                                    {n}
                                                </a>
                                            </li>
                                        ))
                                    }
                                    <li className='page-item'>
                                        <a href="#" className='pageLink' onClick={nextPage}>
                                            Next
                                        </a>
                                    </li>
                                    <div className='selectPagination'>
                                        <select onChange={handleSelect} value={itemPage}>
                                            {options.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </ul>
                            )}
                        </nav>


                    </div>
                </div>
            )
            }
        </div >
    );
};

export default OrderManagenment;
