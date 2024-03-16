
import './Statistical.scss'
import imageProduct from '../asset/image/product.png'
import imageUser from '../asset/image/group (1).png'
import imageCart from '../asset/image/shopping-cart.png'
import imageMoney from '../asset/image/save-money.png'
import StatisticalChar from '../components/statistical_bd/statstical_bd'
import BestSellingProducts from '../components/bestsellingproduct/bestsellingproduct'

const Statistical = () => {
    return (
        <div>
            <table className="header-table">
                <thead>
                    <tr>
                        <th colSpan="10">
                            <div className="purple-line"></div>
                            <span>Thống kê doanh thu</span>
                        </th>
                    </tr>
                </thead>
            </table>
            <div className="container-box">
                <div className="box">
                    <div className="left-container">
                        <div className="left">
                            <img src={imageCart} alt="Cart Icon" />

                        </div>
                    </div>
                    <div className="right">
                        <text>Tổng số đơn hàng:</text>
                    </div>
                </div>
                <div className="box">
                    <div className="left-container1">
                        <div className="left">
                            <img src={imageUser} alt="User Icon" />

                        </div>
                    </div>
                    <div className="right">
                        <text>Số lượng tài khoản:</text>
                    </div>
                </div>
                <div className="box">
                    <div className="left-container2">
                        <div className="left">
                            <img src={imageProduct} alt="Product Icon" />

                        </div>
                    </div>
                    <div className="right">
                        <text>Tổng số sản phẩm:</text>
                    </div>
                </div>
                <div className="box">
                    <div className="left-container3">
                        <div className="left">
                            <img src={imageMoney} alt="Money Icon" />

                        </div>
                    </div>
                    <div className="right">
                        <text>Tổng doanh thu:</text>



                    </div>
                </div>
            </div>

            <div className='container-statistical'>
                <div className='container-colum'>

                    <div className="chart-container">
                        <StatisticalChar className="chart" />
                    </div>

                </div>
                <div className='container-circle'>
                    <BestSellingProducts className="bestselling" />
                </div>
            </div>



        </div>

    )
}
export default Statistical