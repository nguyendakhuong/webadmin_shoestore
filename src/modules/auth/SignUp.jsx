import { useEffect, useState } from 'react'
import APP_LOCAL from '../../lib/localStorage'
import ToastApp from '../../lib/notification/Toast'
import AppImages from '../asset'
import './styles.module.scss'

const SignUp = () => {
    const [data, setData] = useState(null)

    const getAccounts = async () => {
        const token = APP_LOCAL.getTokenStorage();
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(`http://localhost:3001/getAccounts`, requestOptions)
            .then(res => {

                return res.json()
            }).then(data => {
                console.log(data)
                if (data.status === 200) {
                    setData(data.data)
                } else {
                    ToastApp.error('Lỗi: ' + data.message)
                }
            }).catch(e => {
                console.log(e)
            })
    }
    const handleCreate = () => {

    }
    const handleDelete = () => {
    }

    useEffect(() => {
        getAccounts();
    }, []);
    return (
        <div className="container">
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
                                    <button className="product-button" onClick={handleCreate}>+ Tạo tài khoản</button>
                                </div>

                            </tr>
                        </thead>
                    </table>
                </div>


                <div className="product-table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Mã admin</th>
                                <th>Tên</th>
                                <th>email</th>
                                <th>verifyEmail</th>
                                <th>role</th>
                                { }
                            </tr>
                        </thead>
                        {
                            data ? <tbody >
                                {data.map(product => (
                                    <tr key={product.id} >
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.email}</td>
                                        <td>{product.verifyEmail ? "Đã xác thực" : "Chưa xác thực"}</td>
                                        <td>{product.role}</td>

                                        <td>
                                            <button onClick={() => handleDelete(product.id)}>
                                                <img src={AppImages.deleteItem} alt="Delete" style={{ width: '20px' }} /> {/* Xóa */}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                                : <div>
                                    Chưa có dữ liệu
                                </div>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}
export default SignUp