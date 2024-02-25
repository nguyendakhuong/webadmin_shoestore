import React from 'react';
import './product.scss';
import editIcon from '../asset/image/edit.png'; // Import biểu tượng icon sửa
import deleteIcon from '../asset/image/delete.png'; // Import biểu tượng icon xóa

const Product = () => {

    const discountedProducts = [
        {
            id: 1,
            code: 'SP001',
            name: 'Sản phẩm giảm giá 1',
            price: 100000,
            image: 'image1.jpg',
            discount: 20,
            startDate: '2024-02-20',
            endDate: '2024-02-28',
            description: 'Mô tả sản phẩm giảm giá 1',
            quantity: 10,
            category: 'Category 1'
        },
        {
            id: 2,
            code: 'SP002',
            name: 'Sản phẩm giảm giá 2',
            price: 200000,
            image: 'image2.jpg',
            discount: 15,
            startDate: '2024-02-25',
            endDate: '2024-03-05',
            description: 'Mô tả sản phẩm giảm giá 2',
            quantity: 20,
            category: 'Category 2'
        }
    ];


    const handleEdit = (productId) => {

        console.log("Sửa sản phẩm giảm giá có id:", productId);
    };

    const handleDelete = (productId) => {

        console.log("Xóa sản phẩm giảm giá có id:", productId);
    };

    return (
        <div className="product-container">
            <div className="header-table-container">
                <table className="header-table">
                    <thead>
                        <tr>
                            <th colSpan="10">
                                <div className="purple-line"></div>
                                <span>Danh sách sản phẩm đang giảm giá</span>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="button-container">
                <button className="product-button">+ Thêm sản phẩm giảm giá</button>
            </div>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Hình ảnh</th>
                            <th>Giảm giá</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Mô tả</th>
                            <th>Số lượng</th>
                            <th>Loại</th>
                            <th>Hành động</th> { }
                        </tr>
                    </thead>
                    <tbody>
                        {discountedProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><img src={product.image} alt={product.name} /></td>
                                <td>{product.discount}%</td>
                                <td>{product.startDate}</td>
                                <td>{product.endDate}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category}</td>
                                <td>
                                    <button onClick={() => handleEdit(product.id)}>
                                        <img src={editIcon} alt="Edit" style={{ width: '20px' }} /> {/* Sửa */}
                                    </button>
                                    <button onClick={() => handleDelete(product.id)}>
                                        <img src={deleteIcon} alt="Delete" style={{ width: '20px' }} /> {/* Xóa */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product;
