
import './Statistical.scss'
import imageProduct from '../asset/image/product.png'
import imageUser from '../asset/image/group (1).png'
import imageCart from '../asset/image/shopping-cart.png'
import imageMoney from '../asset/image/save-money.png'
import StatisticalChar from '../components/statistical_bd/Statstical_bd'
import BestSellingProducts from '../components/bestsellingproduct/bestsellingproduct'
import { useEffect, useState } from 'react'

const Statistical = () => {
    const [data, setData] = useState({
        order: 0,
        account: 0,
        product: 0,
        revenue: 0,
    })
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseOrder = await fetch(`http://localhost:3001/getOrderCount`, {
                    method: "GET",
                });
                const orderData = await responseOrder.json();
                if (orderData.status === 200) {
                    setData((prevData) => ({ ...prevData, order: orderData.data }));
                }
            } catch (e) {
                console.log(e);
            }
            try {
                const responseAccount = await fetch(`http://localhost:3001/getAccountCount`, {
                    method: "GET",
                });
                const accountData = await responseAccount.json();
                if (accountData.status === 200) {
                    setData((prevData) => ({ ...prevData, account: accountData.data }));
                }
            } catch (e) {
                console.log(e);
            }

            try {
                const responseAccount = await fetch(`http://localhost:3001/getProductCount`, {
                    method: "GET",
                });
                const productData = await responseAccount.json();
                if (productData.status === 200) {
                    setData((prevData) => ({ ...prevData, product: productData.data }));
                }
            } catch (e) {
                console.log(e);
            }
            try {
                const responseRevenue = await fetch(`http://localhost:3001/getRevenue`, {
                    method: "GET",
                });
                const revenueData = await responseRevenue.json();
                if (revenueData.status === 200) {
                    setData((prevData) => ({ ...prevData, revenue: revenueData.data }));
                }
            } catch (e) {
                console.log(e);
            }


            setIsLoading(false)
        };

        fetchData();
    }, []);
    if (isLoading) {
        return <div>...</div>;
    }
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
                        <text>Tổng số đơn hàng</text>
                    </div>
                    <div className='data'>
                        {data.order}
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
                    <div className='data'>
                        {data.account}
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
                    <div className='data'>
                        {data.product}
                    </div>
                </div>
                <div className="box">
                    <div className="left-container3">
                        <div className="left">
                            <img src={imageMoney} alt="Money Icon" />
                        </div>
                    </div>
                    <div className="right">
                        <text>Tổng doanh thu của tháng</text>
                    </div>
                    <div className='data'>
                        {data.revenue}
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