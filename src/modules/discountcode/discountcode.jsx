import React, { useContext, useEffect, useState } from 'react';
import './discountcode.scss';
import deleteIcon from '../asset/image/delete.png';
import ModaladdDiscountcode from '../components/modal/modalDiscountcode/modalDiscountcode'
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import moment from 'moment';
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';

const Discountcode = () => {
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
                ToastApp.error('Lỗi: ' + data.message);
            }
        } catch (e) {
            console.log("Lỗi: " + e)
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
                contentModel: "Bạn có chắc chắn muốn xóa sản phẩm " + item.name + " không?",
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
                            ToastApp.success('Xóa thành công');
                            setReloadData(true);
                        } else {
                            ToastApp.error('Lỗi: ' + data.message);
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


    return (
        <div>
            <table className="header-table">
                <thead>
                    <tr>
                        <th colSpan="10">
                            <div className="purple-line"></div>
                            <span>Danh sách mã giảm giá</span>
                            <button className="discount-button" onClick={handleOpenModal}>+ Thêm mã giảm giá</button>
                        </th>
                    </tr>
                </thead>
            </table>

            <div className="discount-table-container">
                <table className="discount-table">
                    <thead>
                        <tr>
                            <th>Mã giảm giá</th>
                            <th>Loại</th>
                            <th>Số lượng</th>
                            <th>Giảm giá</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    {
                        data ? <tbody >
                            {data.map(value => (
                                <tr key={value.id} >
                                    <td>{value.name}</td>
                                    <td>{value.type === 1 ? "giảm tiền trực tiếp" : "Giảm theo phân trăm"}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.type === 1 ? value.discount + " đ" : value.discount + " %"}</td>

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
                                            ? <span className="active-text">Hoạt động</span>
                                            : <span className="inactive-text">Không hoạt động</span>}
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
