import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './updateProduct.scss';
import ToastApp from '../../../lib/notification/Toast';
import APP_LOCAL from '../../../lib/localStorage';
import InputAdmin from '../../components/input/Input-admin';
import { Validate } from '../../../lib/validate/Validate';
import { ParseValid } from '../../../lib/validate/ParseValid';


const UpdateProduct = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const encodedProductData = queryParams.get('productData');
    const productData = decodeURIComponent(encodedProductData);
    const product = JSON.parse(productData);

    const [category, setCategory] = useState('Giày');
    const [imageProduct, setImageFileMain] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const navigate = useNavigate();
    const [listError, setListError] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        introduce: '',

    })

    const [dataProduct, setDataProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        introduce: '',
    })

    useEffect(() => {
        setDataProduct({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            introduce: product.introduce,
            priceSale: product.priceSale,
            timeSaleEnd: product.timeSaleEnd,
            timeSaleStart: product.timeSaleStart
        })
        setCategory(product.category)
    }, [])

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setDataProduct({ ...dataProduct, [name]: value })
        const inputValue = value.trim()
        const valid = e.target.getAttribute('validate')
        const validObject = ParseValid(valid)
        const error = Validate(
            name,
            inputValue,
            validObject,
            dataProduct.price)
        const newListError = { [name]: error }
        setListError(newListError)

        if (
            Object.values(newListError).some(i => i)) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }
    const handleFruit = e => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
    }
    const handleFileChangeMain = e => {
        const file = e.target.files[0]
        setImageFileMain(file)
        const reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            setShowImage(dataURL)
            setListError({ image: '' })
        };
        reader.readAsDataURL(file);
    }
    const fileRemoveMain = e => {
        setImageFileMain(null)
        setShowImage(null)
    }
    const handleSubmit = async (e) => {
        const token = APP_LOCAL.getTokenStorage()
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('id', product.id);
            formDataToSend.append('price', +dataProduct.price);
            formDataToSend.append('quantity', +dataProduct.quantity);
            formDataToSend.append('image', imageProduct);
            formDataToSend.append('description', dataProduct.description);
            formDataToSend.append('introduce', dataProduct.introduce);
            formDataToSend.append('category', category);
            const response = await fetch(`http://localhost:3001/api/updateProduct`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formDataToSend
                });

            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('Thành công ', data.message);
                navigate('/admin/product')
            } else {
                ToastApp.error('Lỗi: ' + data.message);
            }
        } catch (error) {
            console.log("Lỗi: ", error);
        }
    };

    return (
        <div className='product-container'>
            <table className="header-table">
                <thead>
                    <tr>

                        <th colSpan="1">
                            <div className='headerCreateProduct'>
                                <div className="purple-line"></div>
                                <span>Sửa sản phẩm {product.name}</span>
                            </div>

                        </th>
                    </tr>
                </thead>
            </table>
            <form onSubmit={e => e.preventDefault()} encType='multipart/form-data'>
                <div className='item-flex'>
                    <div className='item_name'>
                        <InputAdmin
                            name={'name'}
                            required={true}
                            label={'Tên sản phẩm'}
                            placeholder={'Nhập tên ...'}
                            validate={'required||minLength:1||maxLength:20'}
                            type={'text'}
                            onChange={onChangeInput}
                            errorText={listError.name}
                            value={dataProduct.name}
                            readOnly={true}
                        />
                    </div>
                    <div className='item_price'>
                        <InputAdmin
                            name={'price'}
                            required={true}
                            label={'Giá sản phẩm'}
                            placeholder={'Nhập giá ...'}
                            validate={'required||checkNumber||checkNegative'}
                            type={'number'}
                            onChange={onChangeInput}
                            errorText={listError.price}
                            value={dataProduct.price}
                        />
                    </div>
                    <div className='item_amount'>
                        <InputAdmin
                            name={'quantity'}
                            required={true}
                            label={'Số lượng sản phẩm'}
                            placeholder={'Nhập số lượng ...'}
                            validate={'required||checkNumber||checkNegative'}
                            type={'number'}
                            onChange={onChangeInput}
                            errorText={listError.quantity}
                            value={dataProduct.quantity}
                        />
                    </div>

                </div>
                <div className='item-flex'>
                    <div className='item'>
                        <InputAdmin
                            name={'priceSale'}
                            label={'Giá giảm giá'}
                            placeholder={'Nhập ...'}
                            type={'number'}
                            validate={'checkNumber||checkPrice||checkNegative'}
                            onChange={onChangeInput}
                            value={dataProduct.priceSale}
                            errorText={listError.priceSale}
                            readOnly={true}
                        />
                    </div>
                    <div className='item'>
                        <InputAdmin
                            name={"timeSaleStart"}
                            label={'Thời gian bắt đầu'}
                            type={'date'}
                            validate={'checkDate'}
                            onChange={onChangeInput}
                            value={dataProduct.timeSaleStart}
                            errorText={listError.timeSaleStart}
                            readOnly={true}
                        />
                    </div>
                    <div className='item'>
                        <InputAdmin
                            name={"timeSaleEnd"}
                            label={'Thời gian kết thúc'}
                            type={'date'}
                            validate={'checkTimeEnd||checkDate'}
                            onChange={onChangeInput}
                            value={dataProduct.timeSaleEnd}
                            errorText={listError.timeSaleEnd}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className='item-flex'>
                    <div className='item-category'>
                        <InputAdmin
                            name={'introduce'}
                            required={true}
                            label={'Giới thiệu sản phẩm'}
                            placeholder={'Nhập ...'}
                            validate={'required'}
                            type={'text'}
                            onChange={onChangeInput}
                            errorText={listError.introduce}
                            value={dataProduct.introduce}
                        />
                    </div>
                    <div className='select'>
                        <label>
                            Category:
                        </label>
                        <select name="selectedFruit" value={category} onChange={handleFruit}>
                            <option value="Giày">Giày</option>
                            <option value="Dép">Dép</option>
                        </select>
                    </div>
                </div>
                <div className='textarea'>
                    <textarea
                        placeholder='Nhập ...'
                        onChange={onChangeInput}
                        name={'description'}
                        value={dataProduct.description || ''}
                        validate={'required'}>
                    </textarea>
                    <span className='textarea_error'>{listError.description}</span>
                </div>
                <div className='file_card'>
                    {
                        imageProduct ? <img src={showImage} alt="Ảnh" /> : (
                            <div className='file_inputs' onChange={handleFileChangeMain}>
                                <input accept="image/png" type="file" />
                                <button>Tải ảnh </button>
                            </div>
                        )
                    }

                    <div>

                        <div>
                            <button onClick={fileRemoveMain}>Xóa ảnh</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={
                        !isButtonDisabled
                            ? handleSubmit
                            : () => {
                                ToastApp.warning('Vui lòng chỉnh sửa ít nhât 1 thông tin và nhập đầy đủ các thông tin')
                            }
                    }>Cập nhật sản phẩm</button>
                </div>
            </form>
        </div>
    )
};

export default UpdateProduct;
