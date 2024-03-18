
import { useContext, useState } from 'react';
import InputAdmin from '../../components/input/Input-admin';
import './createProduct.scss';
import UserContext from '../../../context/use.context';
import { useNavigate } from 'react-router-dom';
import { ParseValid } from '../../../lib/validate/ParseValid';
import { Validate } from '../../../lib/validate/Validate';
import ToastApp from '../../../lib/notification/Toast';
import APP_LOCAL from '../../../lib/localStorage';

const CreateProduct = () => {

    const [userCtx, dispatch] = useContext(UserContext)
    const [imageProduct, setImageFileMain] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [category, setCategory] = useState('Giày');
    const navigate = useNavigate();

    const [listError, setListError] = useState({
        name: 'Vui lòng nhập trường này!',
        price: 'Vui lòng nhập trường này!',
        quantity: 'Vui lòng nhập trường này!',
        description: 'Vui lòng nhập trường này!',
        introduce: 'Vui lòng nhập trường này!',
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

    const handleFruit = (e) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
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

    const handleFileChangeMain = (e) => {
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

    const fileRemoveMain = () => {
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

                    return res.json()
                }).then(data => {

                    if (data.status === 200) {
                        ToastApp.success('Thành công')
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
    const handleBack = () => {

    }
    return (
        <div className='form_add'>
            <div>
                <button onClick={handleBack}>Back</button>
            </div>
            <form onSubmit={e => e.preventDefault()} encType='multipart/form-data'>
                <div className='item-flex'>
                    <div className='item_name input-container'>
                        <InputAdmin
                            name={'name'}
                            // required={true}
                            label={'Tên sản phẩm'}
                            placeholder={'Nhập tên ...'}
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
                            // required={true}
                            label={'Giá sản phẩm'}
                            placeholder={'Nhập giá ...'}
                            validate={'required||checkNumber||checkNegative'}
                            type={'number'}
                            onChange={onChangeInput}
                            value={dataProduct.price}
                        />
                        {listError.price && <label className='error-text'>{listError.price}</label>}
                    </div>
                    <div className='item_amount input-container'>
                        <InputAdmin
                            name={'quantity'}
                            // required={true}
                            label={'Số lượng sản phẩm'}
                            placeholder={'Nhập số lượng ...'}
                            validate={'required||checkNumber||checkNegative'}
                            type={'number'}
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
                            label={'Giá giảm giá'}
                            placeholder={'Nhập ...'}
                            type={'number'}
                            validate={'checkNumber||checkPrice||checkNegative'}
                            onChange={onChangeInput}
                            value={dataProduct.priceSale}
                        />
                        {listError.priceSale && <label className='error-text'>{listError.priceSale}</label>}
                    </div>
                    <div className='item input-container'>
                        <InputAdmin
                            name={"timeSaleStart"}
                            label={'Thời gian bắt đầu'}
                            type={'date'}
                            validate={'checkDate'}
                            onChange={onChangeInput}
                            value={dataProduct.timeSaleStart}

                        />
                        {listError.timeSaleStart && <label className='error-text'>{listError.timeSaleStart}</label>}
                    </div>
                    <div className='item input-container'>
                        <InputAdmin
                            name={"timeSaleEnd"}
                            label={'Thời gian kết thúc'}
                            type={'date'}
                            validate={'checkTimeEnd||checkDate'}
                            onChange={onChangeInput}
                            value={dataProduct.timeSaleEnd}
                            errorText={listError.timeSaleEnd}
                        />
                        {listError.timeSaleEnd && <label className='error-text'>{listError.timeSaleEnd}</label>}
                    </div>
                </div>
                <div className='item-flex'>
                    <div className='item-category input-container'>
                        <InputAdmin
                            name={'introduce'}
                            // required={true}
                            label={'Giới thiệu sản phẩm'}
                            placeholder={'Nhập ...'}
                            validate={'required'}
                            type={'text'}
                            onChange={onChangeInput}
                            value={dataProduct.introduce}
                        />
                        {listError.introduce && <label className='error-text'>{listError.introduce}</label>}
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
                <div className='textarea input-container'>
                    <textarea
                        placeholder='Nhập ...'
                        onChange={onChangeInput}
                        name={'description'}
                        value={dataProduct.description || ''}
                        validate={'required'}
                    ></textarea>
                    {listError.description && <label className='error-text'>{listError.description}</label>}
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
                        <button onClick={fileRemoveMain}>Xóa ảnh</button>
                    </div>
                </div>
                <div>
                    <button onClick={!isButtonDisabled ? handleSubmit : () => { ToastApp.warning('Vui lòng nhập đủ các thông tin') }}>Thêm sản phẩm</button>
                </div>
            </form>
        </div>

    )
}

export default CreateProduct;