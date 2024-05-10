import React, { useContext, useState } from 'react';
import InputAdmin from '../../components/input/Input-admin';
import './createProduct.scss';
import { useNavigate } from 'react-router-dom';
import { ParseValid } from '../../../lib/validate/ParseValid';
import { Validate } from '../../../lib/validate/Validate';
import ToastApp from '../../../lib/notification/Toast';
import APP_LOCAL from '../../../lib/localStorage';
import { useTranslation } from 'react-i18next';

const CreateProduct = () => {
    const [t, i18n] = useTranslation();
    const [imageProduct, setImageFileMain] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [category, setCategory] = useState('Giày');
    const navigate = useNavigate();

    const [listError, setListError] = useState({
        name: `${t('require')}`,
        price: `${t('require')}`,
        description: `${t('require')}`,
        quantity: `${t('require')}`,
        introduce: `${t('require')}`,
    });

    const [dataProduct, setDataProduct] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        introduce: '',
        priceSale: '',
        timeSaleStart: '',
        timeSaleEnd: '',
    });

    const clearForm = () => {
        setDataProduct({
            name: '',
            price: '',
            description: '',
            quantity: '',
            introduce: '',
            priceSale: '',
            timeSaleStart: '',
            timeSaleEnd: '',
        });
        setImageFileMain(null);
    };

    const handleFruit = (e) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setDataProduct({ ...dataProduct, [name]: value });
        const inputValue = value.trim();
        const valid = e.target.getAttribute('validate');
        const validObject = ParseValid(valid);

        const error = Validate(
            name,
            inputValue,
            validObject,
            dataProduct.price,
            dataProduct.priceSale,
            dataProduct.timeSaleStart,
            dataProduct.timeSaleEnd
        );
        const newListError = { ...listError, [name]: error };
        setListError(newListError);

        if (Object.values(newListError).some((i) => i)) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    };

    const handleFileChangeMain = (e) => {
        const file = e.target.files[0];
        setImageFileMain(file);
        const reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            setShowImage(dataURL);
            setListError({ image: '' });
        };
        reader.readAsDataURL(file);
    };

    const fileRemoveMain = () => {
        if (Object.values(listError).some((i) => i)) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
        setImageFileMain(null);
        setShowImage(null);
    };


    const handleSubmit = async () => {
        const token = APP_LOCAL.getTokenStorage();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', dataProduct.name);
            formDataToSend.append('price', +dataProduct.price);
            formDataToSend.append('size', dataProduct.quantity);
            formDataToSend.append('image', imageProduct);
            formDataToSend.append('description', dataProduct.description);
            formDataToSend.append('introduce', dataProduct.introduce);
            formDataToSend.append('priceSale', +dataProduct.priceSale);
            formDataToSend.append('timeSaleStart', dataProduct.timeSaleStart);
            formDataToSend.append('timeSaleEnd', dataProduct.timeSaleEnd);
            formDataToSend.append('category', category);

            const response = await fetch(`http://localhost:3001/api/product`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success('Success');
                clearForm();
            } else {
                ToastApp.error('Error: ' + data.message);
            }
        } catch (e) {
            console.log('Error:', e);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='product-container'>
            <table className='header-table'>
                <thead>
                    <tr>
                        <th colSpan='1'>
                            <div className='headerCreateProduct'>
                                <div className='button-back-product'>
                                    <button onClick={handleBack}>{t('back')}</button>
                                </div>
                                <div className='purple-line'></div>
                                <span>{t('add')}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>

            <div className='form_add'>
                <h2>{t('add')}</h2>

                <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data'>
                    <div className='item-flex'>
                        <div className='item_name input-container'>
                            <InputAdmin
                                name={'name'}
                                label={t('nameProduct')}
                                placeholder={t('enter')}
                                validate={'required||minLength:1||maxLength:20'}
                                type={'text'}
                                onChange={onChangeInput}
                                value={dataProduct.name}
                            />
                            {listError.name && <label className='error-text'>{listError.name}</label>}
                        </div>
                        <div className='item_price input-container'>
                            <InputAdmin
                                name={'price'}
                                label={t('priceProduct')}
                                placeholder={t('enter')}
                                validate={'required||checkNumber||checkNegative'}
                                type={'number'}
                                onChange={onChangeInput}
                                value={dataProduct.price}
                            />
                            {listError.price && <label className='error-text'>{listError.price}</label>}
                        </div>
                        <div className='item_quantity input-container'>
                            <InputAdmin
                                name={'quantity'}
                                label={'size and quantity'}
                                placeholder={'vd: 38:40,39:22'}
                                validate={'required||regexSizeAndQuantity||checkRegexSize||checkSize'}
                                type={'text'}
                                onChange={onChangeInput}
                                value={dataProduct.quantity}
                            />
                            {listError.quantity && <label className='error-text'>{listError.quantity}</label>}
                        </div>

                    </div>
                    <div className='item-flex'>
                        <div className='item input-container'>
                            <InputAdmin
                                name={'priceSale'}
                                label={t('discountProduct')}
                                placeholder={t('enter')}
                                type={'number'}
                                validate={'checkNumber||checkPrice||checkNegative'}
                                onChange={onChangeInput}
                                value={dataProduct.priceSale}
                            />
                            {listError.priceSale && <label className='error-text'>{listError.priceSale}</label>}
                        </div>
                        <div className='item input-container'>
                            <InputAdmin
                                name={'timeSaleStart'}
                                label={t('startDate')}
                                type={'date'}
                                validate={'checkDate'}
                                onChange={onChangeInput}
                                value={dataProduct.timeSaleStart}
                            />
                            {listError.timeSaleStart && <label className='error-text'>{listError.timeSaleStart}</label>}
                        </div>
                        <div className='item input-container'>
                            <InputAdmin
                                name={'timeSaleEnd'}
                                label={t('endDate')}
                                type={'date'}
                                validate={'checkTimeEnd||checkDate'}
                                onChange={onChangeInput}
                                value={dataProduct.timeSaleEnd}
                            />
                            {listError.timeSaleEnd && <label className='error-text'>{listError.timeSaleEnd}</label>}
                        </div>
                    </div>
                    <div className='item-flex'>
                        <div className='item-category input-container'>
                            <InputAdmin
                                name={'introduce'}
                                label={t('introductionProduct')}
                                placeholder={t('enter')}
                                validate={'required'}
                                type={'text'}
                                onChange={onChangeInput}
                                value={dataProduct.introduce}
                            />
                            {listError.introduce && <label className='error-text'>{listError.introduce}</label>}
                        </div>
                        <div className='select'>
                            <label>{t('category')}</label>
                            <select name='selectedFruit' value={category} onChange={handleFruit}>
                                <option value='Giày'>{t('shoe')}</option>
                                <option value='Dép'>{t('sandal')}</option>
                            </select>
                        </div>
                    </div>
                    <div className='textarea input-container'>
                        <textarea
                            placeholder={t('enterDescription')}
                            onChange={onChangeInput}
                            name={'description'}
                            value={dataProduct.description || ''}
                            validate={'required'}
                        ></textarea>
                        {listError.description && <label className='error-text'>{listError.description}</label>}
                    </div>
                    <div className='file_card'>
                        {imageProduct ? (
                            <img src={showImage} alt='Ảnh' />
                        ) : (
                            <div className='file_inputs' onChange={handleFileChangeMain}>
                                <input accept='image/png' type='file' />
                                <button>{t('loadImage')}</button>
                            </div>
                        )}
                        <div className='button-group-createproduct'>
                            <div className='button-deleteimg'>
                                <button onClick={fileRemoveMain}>{t('deletePhotos')}</button>
                            </div>
                            <div className='button-submit-product'>
                                <button
                                    onClick={
                                        !isButtonDisabled
                                            ? handleSubmit
                                            : () => {
                                                ToastApp.warning('Vui lòng nhập đủ các thông tin');
                                            }
                                    }
                                >
                                    {t('add')}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
