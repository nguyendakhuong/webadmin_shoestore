import React, { useContext, useEffect, useState } from 'react';
import './Statistical.scss';
import imageProduct from '../asset/image/product.png';
import imageUser from '../asset/image/group (1).png';
import imageCart from '../asset/image/shopping-cart.png';
import imageMoney from '../asset/image/save-money.png';
import BestSellingProducts from '../components/bestsellingproduct/bestsellingproduct';
import StatisticalInfo from '../components/statistical_info/statistical_info';
import PotentialCustomers from '../components/potentialCustomers/potentialCustomers';
import UserContext from '../../context/use.context';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';


const Statistical = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [data, setData] = useState({
        order: 0,
        account: 0,
        product: 0,
        revenue: 0,
        month: null
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                const responseProduct = await fetch(`http://localhost:3001/getProductCount`, {
                    method: "GET",
                });
                const productData = await responseProduct.json();
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
                    console.log("a", revenueData.month)
                    setData((prevData) => ({ ...prevData, revenue: revenueData.totalRevenue, month: revenueData.month }));
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseDialog();
        }
    };

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
            <div>
                <button onClick={handleOpenDialog}>Chi tiết thống kê</button>
            </div>
            <div className="container-box">
                <div className="box">
                    <div className="left-container">
                        <div className="left">
                            <img src={imageCart} alt="Cart Icon" />

                        </div>
                    </div>
                    <div className="right">
                        <text>Tổng số đơn hàng tháng {data.month}</text>
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
                        <text>Tổng doanh thu của tháng {data.month}</text>
                    </div>
                    <div className='data'>
                        {data.revenue}
                    </div>
                </div>
            </div>

            <div className='container-statistical'>
                <div className='container-circle'>
                    <BestSellingProducts className="bestselling" />
                </div>
            </div>*
            <div className='potentialCustomers'><PotentialCustomers /></div>

            {isDialogOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <StatisticalInfo onClose={handleCloseDialog}>
                        <StatisticalInfo data={data} />
                    </StatisticalInfo>
                </div>
            )}
        </div>
    );
};

export default Statistical;
