import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import ToastApp from '../../../lib/notification/Toast';
import UserContext from '../../../context/use.context';
import { KEY_CONTEXT_USER } from '../../../context/use.reducer';

const MyBarChart = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [nameProduct, setNameProduct] = useState([]);
    const [data, setData] = useState([])
    const getNameProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/getNameProduct`,
                {
                    method: 'GET',
                });
            const data = await response.json();
            if (data.status === 200) {
                setNameProduct(data.data)
            } else {
                ToastApp.error('Lỗi: ' + data.message);
            }
        } catch (e) {
            console.log("Lỗi lấy tên sản phẩm: " + e)
        }
    }

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/getProductSalesByMonth`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ selectedProduct })
                },
            )
            const data = await response.json();
            if (data.status === 200) {
                setData(data.data)
            } else {
                ToastApp.error('Lỗi a: ' + data.message);
            }
        } catch (e) {
            console.log("Lỗi: " + e)
        } finally {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: false })
        }
    }

    useEffect(() => {
        getNameProduct()
    }, [])

    useEffect(() => {
        getData()
    }, [selectedProduct])

    useEffect(() => {
        if (nameProduct.length > 0) {
            setSelectedProduct(nameProduct[0].name);
        }
    }, [nameProduct])

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ marginLeft: '180px', marginRight: '10px' }}>
                    <label htmlFor="product" style={{ marginRight: '20px' }}>Chọn sản phẩm:</label>
                    <select id="product" value={selectedProduct} onChange={handleProductChange} style={{ width: '300px', padding: '5px' }}>
                        {nameProduct.map((value, index) => (
                            <option key={index} value={value.name}>{value.name}</option>
                        ))}
                    </select>
                </div>
                {/* <div>
                    <label htmlFor="year" >Chọn năm:</label>
                    <select id="year" value={selectedYear} onChange={handleYearChange} style={{ width: '200px', padding: '5px' }}>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div> */}
            </div>
            <div style={{ width: '840px', height: '460px', margin: '0 auto' }}>
                <ResponsiveBar
                    data={data}
                    keys={['quantity']}
                    indexBy="month"
                    margin={{ top: 50, right: 130, bottom: 45, left: 55 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Số lượng đơn hàng',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        </div>
    );
};

export default MyBarChart;
