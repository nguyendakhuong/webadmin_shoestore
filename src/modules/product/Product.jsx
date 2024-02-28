import React, { useRef, useState } from 'react';
import './product.scss';
import editIcon from '../asset/image/edit.png'; // Import biểu tượng icon sửa
import deleteIcon from '../asset/image/delete.png'; // Import biểu tượng icon xóa
import InputAdmin from '../components/input/Input-admin';
import ToastApp from '../../lib/notification/Toast';

const Product = () => {
    const [navigateCreate, setNavigateCreate] = useState(false);
    const [imageFileMain, setImageFileMain] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const ref = useRef()
    console.log(imageFileMain)
    const [dataProduct, setDataProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        imageProduct: '',
        description: '',
        introduce: '',
        priceSale: '',
        timeSaleStart: '',
        timeSaleEnd: '',
        category: '',
    })


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

    const createProduct = () => {
        const handleBackProduct = () => {
            setNavigateCreate(false)
        }

        const onChangeInput = e => {

        }
        const handleSubmit = async () => {
            try {

            } catch (e) {

            }
        }
        const handleFileChangeMain = e => {
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.onload = function () {
                const dataURL = reader.result;
                setImageFileMain(dataURL)
            };

            reader.readAsDataURL(file);

        }
        const fileRemoveMain = e => {
            setImageFileMain(null)
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
                                required={true}
                                label={'Tên sản phẩm'}
                                placeholder={'Nhập tên ...'}
                                validate={'required'}
                                type={'text'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='item_price'>
                            <InputAdmin
                                required={true}
                                label={'Giá sản phẩm'}
                                placeholder={'Nhập giá ...'}
                                validate={'required'}
                                type={'number'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='item_amount'>
                            <InputAdmin
                                required={true}
                                label={'Số lượng sản phẩm'}
                                placeholder={'Nhập số lượng ...'}
                                validate={'required'}
                                type={'number'}
                                onChange={onChangeInput}
                            />
                        </div>

                    </div>
                    <div className='item-flex'>
                        <div className='item'>
                            <InputAdmin
                                label={'Giá giảm giá'}
                                placeholder={'Nhập ...'}
                                type={'number'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='item'>
                            <InputAdmin
                                label={'Thời gian bắt đầu'}
                                type={'date'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='item'>
                            <InputAdmin
                                label={'Thời gian kết thúc'}
                                type={'date'}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className='item-flex'>
                        <div className='item-category'>
                            <InputAdmin
                                required={true}
                                label={'Giới thiệu sản phẩm'}
                                placeholder={'Nhập ...'}
                                validate={'required'}
                                type={'text'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='select'>
                            <label>
                                Category:
                            </label>
                            <select name="selectedFruit">
                                <option value="apple">Giày</option>
                                <option value="banana">Dép</option>
                            </select>
                        </div>
                    </div>
                    <div className='textarea'>
                        <textarea placeholder='Nhập ...' onChange={onChangeInput}>
                        </textarea>
                        {/* <span className={styles.textarea_error}>{listError.mainUse}</span> */}
                    </div>
                    <div className='file_card'>
                        {
                            imageFileMain ? <img src={imageFileMain} alt="Ảnh" /> : (
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
            )}
        </div>
    )
}

export default Product;
