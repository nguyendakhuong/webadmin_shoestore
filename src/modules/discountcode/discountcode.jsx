import React, { useState } from 'react';
import './discountcode.scss';
import deleteIcon from '../asset/image/delete.png';
import ModaladdDiscountcode from '../components/modal/modalDiscountcode/modalDiscountcode'

const Discountcode = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Số lượng</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Giảm giá</th>
                            <th>Trạng thái</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mã giảm giá</td>
                            <td>Percentage</td>
                            <td>10</td>
                            <td>2024-03-07</td>
                            <td>2024-03-14</td>
                            <td>10%</td>
                            <td><img src={deleteIcon} alt="Delete" style={{ width: '20px' }} /></td>
                        </tr>

                    </tbody>
                </table>
            </div>


            <ModaladdDiscountcode isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Discountcode;
