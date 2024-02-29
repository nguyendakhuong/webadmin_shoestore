import React, { useEffect, useState } from 'react';
import './product.scss';
import editIcon from '../asset/image/edit.png'; // Import biểu tượng icon sửa
import deleteIcon from '../asset/image/delete.png'; // Import biểu tượng icon xóa
import InputAdmin from '../components/input/Input-admin';
import ToastApp from '../../lib/notification/Toast';
import { ParseValid } from '../../lib/validate/ParseValid';
import { Validate } from '../../lib/validate/Validate';
import APP_LOCAL from '../../lib/localStorage';

const Product = () => {
    const [navigateCreate, setNavigateCreate] = useState(false);
    const [imageProduct, setImageFileMain] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [category, setCategory] = useState('Giày');
    const [listError, setListError] = useState({
        name: 'Vui lòng nhập trường này!',
        price: 'Vui lòng nhập trường này!',
        quantity: 'Vui lòng nhập trường này!',
        description: 'Vui lòng nhập trường này!',
        introduce: 'Vui lòng nhập trường này!',
        timeSaleStart: "",
        timeSaleEnd: "",
        priceSale: "",
    })
    const [dataProduct, setDataProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        introduce: '',
        priceSale: '',
        timeSaleStart: '',
        timeSaleEnd: '',
    })
    const [data, setData] = useState(null)
    console.log("data ===========================>", data)
    useEffect(() => {
        const getProduct = async () => {
            const token = APP_LOCAL.getTokenStorage();
            const requestOptions = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(`http://localhost:3001/api/getProducts`, requestOptions)
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        ToastApp.error('Lỗi: ' + res.message)
                    }
                }).then(data => {
                    setData(data.data)
                    console.log(data)
                }).catch(e => {
                    console.log(e)
                })
        }
        getProduct()
    }, [])

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
    const handleCreate = () => {
        setNavigateCreate(true)
    }
    console.log("imageProduct=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", imageProduct)
    const createProduct = () => {
        const handleBackProduct = () => {
            setNavigateCreate(false)
        }

        const onChangeInput = e => {
            const { name, value } = e.target
            setDataProduct({ ...dataProduct, [name]: value })
            const inputValue = value.trim()
            const valid = e.target.getAttribute('validate')
            const validObject = ParseValid(valid)
            const error = Validate(
                name,
                inputValue,
                validObject,
                dataProduct.price,
                dataProduct.priceSale,
                dataProduct.timeSaleStart,
                dataProduct.timeSaleEnd)
            const newListError = { ...listError, [name]: error }
            setListError(newListError)

            if (
                Object.values(newListError).some(i => i)) {
                setIsButtonDisabled(true)
            } else {
                setIsButtonDisabled(false)
            }

        }
        const handleFruit = (e) => {
            const selectedValue = e.target.value;
            setCategory(selectedValue);
        }
        const handleFileChangeMain = e => {
            const file = e.target.files[0]
            setImageFileMain(file)
            const reader = new FileReader();
            reader.onload = function () {
                const dataURL = reader.result;
            };
            reader.readAsDataURL(file);
        }
        const fileRemoveMain = e => {
            if (Object.values(listError).some(i => i)) {
                setIsButtonDisabled(true)
            } else {
                setIsButtonDisabled(false)
            }
            setImageFileMain(null)
        }
        const handleSubmit = async () => {
            const token = APP_LOCAL.getTokenStorage()
            try {
                const formDataToSend = new FormData()

                formDataToSend.append('name', dataProduct.name)
                formDataToSend.append('price', +dataProduct.price)
                formDataToSend.append('quantity', +dataProduct.quantity)
                formDataToSend.append('image', imageProduct)
                formDataToSend.append('description', dataProduct.description)
                formDataToSend.append('introduce', dataProduct.introduce)
                formDataToSend.append('priceSale', +dataProduct.priceSale)
                formDataToSend.append('timeSaleStart', dataProduct.timeSaleStart)
                formDataToSend.append('timeSaleEnd', dataProduct.timeSaleEnd)
                formDataToSend.append('category', category)
                for (let [key, value] of formDataToSend.entries()) {
                    console.log(key, value);
                }
                await fetch(`http://localhost:3001/api/product`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=something',
                        'Authorization': `Bearer ${token}`
                    },
                    body: formDataToSend
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        ToastApp.success('Thành công')
                        return res.json()
                    } else {
                        ToastApp.error('Lỗi: ' + res.message)
                    }
                }).then(data => {
                    console.log(data)
                }).catch(e => {
                    console.log("Lỗi: ", e)
                })
            } catch (e) {
                console.log(e)
            }
        }
        return (
            <div className='product-container'>
                <table className="header-table">
                    <thead>
                        <tr>

                            <th colSpan="1">
                                <div className='headerCreateProduct'>
                                    <div className="purple-line"></div>
                                    <button onClick={handleBackProduct}> Back</button>
                                    <span>Thêm sản phẩm</span>
                                </div>

                            </th>
                        </tr>
                    </thead>
                </table>
                <form onSubmit={e => e.preventDefault()}>
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
                                <option value="apple">Giày</option>
                                <option value="banana">Dép</option>
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
                            imageProduct ? <img src={imageProduct} alt="Ảnh" /> : (
                                <div className='file_inputs' onChange={handleFileChangeMain}>
                                    <input accept="image/png" type="file" />
                                    <button>Tải ảnh </button>
                                </div>
                            )
                        }
                        <div>
                            <div onClick={fileRemoveMain} className='remove'>
                                <span>Xóa ảnh</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={
                            !isButtonDisabled
                                ? handleSubmit
                                : () => {
                                    ToastApp.warning('Vui lòng nhập đủ các thông tin')
                                }
                        }>Thêm sản phẩm</button>
                    </div>
                </form>
            </div>
        )
    }


    const handleEdit = (productId) => {

        console.log("Sửa sản phẩm giảm giá có id:", productId);
    };

    const handleDelete = (productId) => {

        console.log("Xóa sản phẩm giảm giá có id:", productId);
    };

    return (
        <div className="product-container">
            {navigateCreate ? (
                <div className='header-table-container'>
                    {createProduct()}
                </div>
            ) : (
                <div className="product-container">
                    <div className="header-table-container">
                        <table className="header-table">
                            <thead>
                                <tr>
                                    <th colSpan="10">
                                        <div className="purple-line"></div>
                                        <span>Danh sách sản phẩm đang giảm giá</span>
                                    </th>
                                    <div className="button-container">
                                        <button className="product-button" onClick={handleCreate}>+ Thêm sản phẩm giảm giá</button>
                                    </div>

                                </tr>
                            </thead>
                        </table>
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
                                {data.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td><img src={product.imageProduct} alt={product.name} /></td>
                                        <td>{product.discount ? product.discount : "null"}</td>
                                        <td>{product.startDate ? product.startDate : "null"}</td>
                                        <td>{product.endDate ? product.endDate : "null"}</td>
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
            )}
        </div>
    )
}

export default Product;
