import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './updateProduct.scss';
import ToastApp from '../../../lib/notification/Toast';
import APP_LOCAL from '../../../lib/localStorage';

const UpdateProduct = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const encodedProductData = queryParams.get('productData');
    const productData = decodeURIComponent(encodedProductData);
    const product = JSON.parse(productData);

    const [reloadData, setReloadData] = useState(false);
    const [imageProduct, setImageFileMain] = useState(null);
    const [category, setCategory] = useState('Giày');
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [currentImage, setCurrentImage] = useState('');
    const [dataProduct, setDataProduct] = useState({
        name: updatedProduct.name || '',
        price: updatedProduct.price || '',
        quantity: updatedProduct.quantity || '',
        description: updatedProduct.description || '',
        introduce: updatedProduct.introduce || '',
        priceSale: updatedProduct.priceSale || '',
        timeSaleStart: updatedProduct.timeSaleStart || '',
        timeSaleEnd: updatedProduct.timeSaleEnd || '',
    });

    useEffect(() => {
        setCurrentImage(updatedProduct?.imageProduct || '');
    }, [updatedProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdatedProduct({ ...updatedProduct, imageProduct: reader.result });
            setCurrentImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const token = APP_LOCAL.getTokenStorage();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            formDataToSend.append('id', updatedProduct.id);
            formDataToSend.append('name', updatedProduct.name);
            formDataToSend.append('price', updatedProduct.price);
            formDataToSend.append('quantity', updatedProduct.quantity);
            formDataToSend.append('image', imageProduct);
            formDataToSend.append('description', updatedProduct.description);
            formDataToSend.append('introduce', updatedProduct.introduce);
            formDataToSend.append('priceSale', updatedProduct.priceSale);
            formDataToSend.append('timeSaleStart', updatedProduct.timeSaleStart);
            formDataToSend.append('timeSaleEnd', updatedProduct.timeSaleEnd);
            formDataToSend.append('category', category);

            const response = await fetch(`http://localhost:3001/api/updateProduct/${updatedProduct.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('Thành công');
                setReloadData(true);
                setCurrentImage(updatedProduct.imageProduct);
                setDataProduct({
                    name: '',
                    price: '',
                    quantity: '',
                    description: '',
                    introduce: '',
                    priceSale: '',
                    timeSaleStart: '',
                    timeSaleEnd: '',
                });
            } else {
                ToastApp.error('Lỗi: ' + data.message);
            }
        } catch (error) {
            console.log("Lỗi: ", error);
        }
    };

    return (
        <div className="update-product-container">
            <h2>Cập nhật sản phẩm</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm:</label>
                    <input type="text" id="name" name="name" value={updatedProduct?.name || ''} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá:</label>
                    <input type="number" id="price" name="price" value={updatedProduct?.price || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="imageProduct">Hình ảnh:</label>
                    <input type="file" id="imageProduct" name="imageProduct" onChange={handleImageChange} />

                    {currentImage && (
                        <img src={currentImage} alt="Product" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea id="description" name="description" value={updatedProduct?.description || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="priceSale">Giảm giá:</label>
                    <input type="number" id="priceSale" name="priceSale" value={updatedProduct?.priceSale || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="timeSaleStart">Ngày bắt đầu:</label>
                    <input type="date" id="timeSaleStart" name="timeSaleStart" value={updatedProduct?.timeSaleStart || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="timeSaleEnd">Ngày kết thúc:</label>
                    <input type="date" id="timeSaleEnd" name="timeSaleEnd" value={updatedProduct?.timeSaleEnd || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Số lượng:</label>
                    <input type="number" id="quantity" name="quantity" value={updatedProduct?.quantity || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Loại:</label>
                    <input type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <button type="submit">Lưu thay đổi</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
