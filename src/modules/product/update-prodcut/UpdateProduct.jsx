import './updateProduct.scss'


const UpdateProduct = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const encodedProductData = queryParams.get('productData');
    const productData = decodeURIComponent(encodedProductData);
    const product = JSON.parse(productData);
    console.log(product) // dữ liệu obj của product gồm id,name,price,description,imageProduct,introduce,priceSale,quantity,timeSaleEnd,timeSaleStart
    return (
        <div>
            {product.name}
            {product.price}
            <img style={{ width: '200px' }} src={product.imageProduct} alt='' />
        </div>
    )
}
export default UpdateProduct