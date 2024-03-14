<div className='product-container'>

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