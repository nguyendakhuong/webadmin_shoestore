import React, { useContext, useEffect, useState } from 'react';
import './product.scss';
import editIcon from '../asset/image/edit.png';
import deleteIcon from '../asset/image/delete.png';
import InputAdmin from '../components/input/Input-admin';
import ToastApp from '../../lib/notification/Toast';
import { ParseValid } from '../../lib/validate/ParseValid';
import { Validate } from '../../lib/validate/Validate';
import APP_LOCAL from '../../lib/localStorage';
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import { TYPE_MODEL } from '../components/modal';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [navigateCreate, setNavigateCreate] = useState(false);
    const [imageProduct, setImageFileMain] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [category, setCategory] = useState('Giày');
    const [reloadData, setReloadData] = useState(false);
    const navigate = useNavigate();
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

    const clearForm = () => {
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
        setImageFileMain(null)
    };

    const handleCreate = () => {
        setNavigateCreate(true)
    }
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
                setShowImage(dataURL)
                setListError({ image: '' })
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
            setShowImage(null)
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

                await fetch(`http://localhost:3001/api/product`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: formDataToSend
                    }).then(res => {
                        console.log("res==============>", res)
                        return res.json()
                    }).then(data => {
                        console.log("data =========================>", data)
                        if (data.status === 200) {
                            ToastApp.success('Thành công')
                            setReloadData(true);
                            clearForm();
                        } else {
                            ToastApp.error('Lỗi: ' + data.message)
                        }
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


    // const handleItemClick = (product) => {
    //     // navigate('/admin/update-product')
    //     // console.log(product)
    //     const productData = JSON.stringify(product);
    //     const encodedProductData = encodeURIComponent(productData);
    //     navigate('/admin/update-product?productData=' + encodedProductData);
    // }

    const handleEdit = (product, e) => {
        e.stopPropagation();
        const productData = JSON.stringify(product);
        const encodedProductData = encodeURIComponent(productData);
        navigate('/admin/update-product?productData=' + encodedProductData);
    }

    const handleDelete = (product, e) => {
        e.stopPropagation();
        dispatch({
            type: KEY_CONTEXT_USER.SHOW_MODAL,
            payload: {
                typeModal: 'DELETE_ITEM',
                dataModal: product.id,
                contentModel: "Bạn có chắc chắn muốn xóa sản phẩm " + product.name + " không?",
                onClickConfirmModel: async () => {
                    const token = APP_LOCAL.getTokenStorage()
                    try {
                        const response = await fetch(`http://localhost:3001/api/removeProduct/${product.id}`,
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
                    }
                },
            },
        })
    };

    useEffect(() => {
        getProduct();
        setReloadData(false);
    }, [reloadData]);

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
                                        <span>Danh sách sản phẩm </span>
                                    </th>
                                    <div className="button-container">
                                        <button className="product-button" onClick={handleCreate}>+ Thêm sản phẩm </button>
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
                            {
                                data ? <tbody>
                                    {data.map(product => (
                                        <tr >
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td><img src={product.imageProduct} alt={product.name} /></td>
                                            <td>{product.priceSale ? product.priceSale : "null"}</td>
                                            <td>{product.timeSaleStart ? moment(product.timeSaleStart).format('DD/MM/YYYY') : "null"}</td>
                                            <td>{product.timeSaleEnd ? moment(product.timeSaleEnd).format('DD/MM/YYYY') : "null"}</td>
                                            <td>{product.description}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <button onClick={(e) => handleEdit(product, e)}>
                                                    <img src={editIcon} alt="Edit" style={{ width: '20px' }} /> {/* Chỉnh sửa */}
                                                </button>
                                                <button onClick={(e) => handleDelete(product, e)}>
                                                    <img src={deleteIcon} alt="Delete" style={{ width: '20px' }} /> {/* Xóa */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                    : <div>
                                        Chưa có dữ liệu
                                    </div>
                            }
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product;
