import React, { useContext, useEffect, useState } from 'react';
import './product.scss';
import editIcon from '../asset/image/edit.png';
import deleteIcon from '../asset/image/delete.png';
import ToastApp from '../../lib/notification/Toast';
import APP_LOCAL from '../../lib/localStorage';
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ModalProduct from '../components/modal/modalProduct/modalProduct'
import CreateProduct from './create-prodcut/CreateProduct';
import { useTranslation } from 'react-i18next';

const Product = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [navigateCreate, setNavigateCreate] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [dataSearch, setDataSearch] = useState(null);

    const [reloadData, setReloadData] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [t, i18n] = useTranslation();

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
                    ToastApp.error('Error: ' + res.message)
                }
            }).then(data => {
                setData(data.data)
            }).catch(e => {
                console.log(e)
            })
    }
    const handleCreate = () => {
        setNavigateCreate(true)
    }

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
                            ToastApp.success('Deleted successfully');
                            setReloadData(true);
                        } else {
                            ToastApp.error('Error: ' + data.message);
                        }

                    } catch (e) {
                        console.log("Lỗi xóa sản phẩm: ", e)
                    }
                },
            },
        })
    };

    const handleInputSearch = (e) => {
        const { name, value } = e.target
        if (name === "search") {
            setSearchData(value.trim())
        }
    }
    const searchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/search`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ searchData })
                });
            const data = await response.json();
            if (data.status === 200) {
                setDataSearch(data.data)
            } else {
                ToastApp.warning('Warning: ' + data.message);
            }
        } catch (e) {
            console.log("Lỗi search:" + e)
        }
    }
    const handleClickItem = (id) => {
        setSelectedProduct(id)
    }

    const handleStatus = async (e, id) => {
        e.stopPropagation();
        try {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: true })
            const response = await fetch(`http://localhost:3001/api/statusProduct/${id}`,
                {
                    method: 'GET',
                });
            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success("Product status changed successfully")
                setReloadData(true)
            } else {
                ToastApp.error('Error: ' + data.message);
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: false })
        }
    }

    useEffect(() => {
        getProduct();
        setReloadData(false);
    }, [reloadData]);

    const TableRow = ({ product, handleEdit, handleDelete, handleClick, handleClickStatus }) => {

        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        const buttonClass = product.status === 1 ? 'active-product' : 'inactive-product';
        return (
            <tr onClick={() => { setIsDialogOpen(true); handleClick(product) }}
            >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{formatter.format(product.price)}</td>
                <td>
                    <img src={product.imageProduct} alt={product.name} />
                </td>
                <td>{formatter.format(product.priceSale) ? formatter.format(product.priceSale) : "null"}</td>
                <td>
                    {product.timeSaleStart ? moment(product.timeSaleStart).format("DD/MM/YYYY") : "null"}
                </td>
                <td>
                    {product.timeSaleEnd ? moment(product.timeSaleEnd).format("DD/MM/YYYY") : "null"}
                </td>
                <td>{product.description}</td>
                <td>{product.introduce}</td>
                <td>{product.category === "Dép" ? `${t('sandal')}` : `${t('shoe')}`}</td>
                <td>
                    <button onClick={(e) => handleClickStatus(e, product.id)} className={buttonClass}>
                        {product.status === 1 ? `${t('active')}` : `${t('inactive')}`}
                    </button>
                </td>
                <td>
                    <button onClick={(e) => handleEdit(product, e)}>
                        <img src={editIcon} alt="Edit" style={{ width: "20px" }} />
                    </button>
                    <button onClick={(e) => handleDelete(product, e)}>
                        <img src={deleteIcon} alt="Delete" style={{ width: "20px" }} />
                    </button>
                </td>
            </tr>
        );
    };
    return (
        <div className="product-container">
            {navigateCreate ? (
                <div className='header-table-container'>
                    <CreateProduct />
                </div>
            ) : (
                <div className="product-container">
                    <ModalProduct isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} product={selectedProduct} />
                    <div className="header-table-container">
                        <table className="header-table">
                            <thead>
                                <tr>
                                    <th colSpan="10">
                                        <div className="purple-line"></div>
                                        <span>{t('products')}</span>
                                        <div className="search-box">
                                            <input type="text"
                                                placeholder={t('search') + ' ...'}
                                                name='search'
                                                value={searchData}
                                                onChange={handleInputSearch} />
                                            <button type="button" onClick={searchProduct}>{t('search')}</button>
                                            <button type="product-button" onClick={handleCreate}>{t('addProduct')}</button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="product-table-container">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>{t('productCode')}</th>
                                    <th>{t('name')}</th>
                                    <th>{t('price')}</th>
                                    <th>{t('image')}</th>
                                    <th>{t('discount')}</th>
                                    <th>{t('startDate')}</th>
                                    <th>{t('endDate')}</th>
                                    <th>{t('describe')}</th>
                                    <th>{t('introduce')}</th>
                                    <th>{t('category')}</th>
                                    <th>{t('status')}</th>
                                    <th>{t('act')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSearch && searchData && dataSearch.length > 0 ? (
                                    dataSearch.map((product) => (
                                        <TableRow product={product} handleEdit={handleEdit} handleDelete={handleDelete} key={product.id} handleClick={handleClickItem} handleClickStatus={handleStatus} />
                                    ))
                                ) : data && data.length > 0 ? (
                                    data.map((product) => (
                                        <TableRow product={product} handleEdit={handleEdit} handleDelete={handleDelete} key={product.id} handleClick={handleClickItem} handleClickStatus={handleStatus} />
                                    ))
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product;
