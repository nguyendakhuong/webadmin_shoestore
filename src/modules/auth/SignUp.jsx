import { useContext, useEffect, useState } from 'react'
import APP_LOCAL from '../../lib/localStorage'
import ToastApp from '../../lib/notification/Toast'
import AppImages from '../asset'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import InputAdmin from '../components/input/Input-admin'
import ButtonWed from '../components/button/Button-admin'
import { ParseValid } from '../../lib/validate/ParseValid'
import { Validate } from '../../lib/validate/Validate'
import UserContext from '../../context/use.context'
import { KEY_CONTEXT_USER } from '../../context/use.reducer'
import { TYPE_MODEL } from '../components/modal'

const SignUp = () => {
    const [data, setData] = useState(null)
    const navigate = useNavigate();
    const [status, setStatus] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [userCtx, dispatch] = useContext(UserContext)
    const token = APP_LOCAL.getTokenStorage()
    const [reloadData, setReloadData] = useState(false);

    const [listError, setListError] = useState({
        email: '',
        password: '',
        name: '',
    })
    const [formValue, setFormValue] = useState({
        email: null,
        password: null,
        name: null,
    })
    const clearForm = () => {
        setEmail("")
        setName("")
        setPassword("")
    };
    const handleNavigateSignUp = () => {
        setStatus(true)

    }
    const signupAdmin = () => {
        const handleBackProduct = () => {
            setStatus(false)
        }
        const handlerOnChangeInput = e => {
            const { name, value } = e.target

            if (name === 'email') setEmail(value)
            if (name === 'password') setPassword(value)
            if (name === 'name') setName(value)
            const inputValue = value.trim()
            const valid = e.target.getAttribute('validate')
            const validObject = ParseValid(valid)
            const error = Validate(name, inputValue, validObject)
            const newListError = { ...listError, [name]: error }
            setListError(newListError)
            setFormValue({ ...formValue, [name]: inputValue })

            if (Object.values(newListError).some(i => i)) {
                setIsButtonDisabled(true)
            } else {
                setIsButtonDisabled(false)
            }
        }
        const handleOnClick = async () => {
            try {
                await fetch(`http://localhost:3001/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ email, password, name }),
                }).then(res => {
                    return res.json()

                }).then(data => {
                    if (data.status === 200) {
                        ToastApp.success('Thành công: ' + data.message)
                        setReloadData(true)
                        clearForm();
                    } else {
                        ToastApp.warning('Lỗi: ' + data.message)
                    }

                }).catch(e => {
                    console.log("Lỗi đăng nhập: ", e)
                })

            } catch (e) {
                ToastApp.error("Lỗi hệ thống: ", e)
                console.log(e)
            }
        }
        return (
            <div>
                <div className="header-table-container">
                    <table className="header-table">
                        <thead>
                            <tr>
                                <th colSpan="10">
                                    <div className="purple-line"></div>
                                    <span>Danh sách tài khoản admin</span>
                                </th>
                                <div className="button-container">
                                    <button className="product-button" onClick={handleBackProduct}>+ Quay lại</button>
                                </div>

                            </tr>
                        </thead>
                    </table>
                </div>

                <div className={styles.login}>

                    <div className={styles.login_content}>

                        <h2>Đăng nhập</h2>
                        <form onSubmit={e => e.preventDefault()}>


                            <InputAdmin
                                required={true}
                                label={'Email'}
                                placeholder={'Nhập email'}
                                validate={'required|regEmail'}
                                onChange={handlerOnChangeInput}
                                name={'email'}
                                value={email}
                                errorText={listError.email}
                                type={'text'}
                            />
                            <InputAdmin
                                required={true}
                                label={'Name'}
                                placeholder={'Nhập tên'}
                                validate={'required'}
                                onChange={handlerOnChangeInput}
                                name={'name'}
                                value={name}
                                errorText={listError.name}
                                type={'text'}
                            />

                            <InputAdmin
                                required={true}
                                label={'Mật khẩu'}
                                placeholder={'******'}
                                type={'password'}
                                validate={'required'}
                                onChange={handlerOnChangeInput}
                                name={'password'}
                                value={password}
                                errorText={listError.password}
                            />

                            <div className={styles.button}>
                                <ButtonWed
                                    title={'Đăng nhập'}
                                    buttonAuth
                                    disabledBtn={isButtonDisabled}
                                    onClick={handleOnClick}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

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

    const handleDelete = (adminId) => {
        if (adminId === 1) {
            dispatch({
                type: KEY_CONTEXT_USER.SHOW_MODAL,
                payload: {
                    typeModal: 'NOTIFICATION_MODAL',
                    dataModal: '',
                    titleModel: "Thông báo",
                    contentModel: "Không được xóa superAdmin"
                },
            })
        } else {
            dispatch({
                type: KEY_CONTEXT_USER.SHOW_MODAL,
                payload: {
                    typeModal: 'DELETE_ITEM',
                    dataModal: adminId,
                    onClickConfirmModel: async () => {
                        const token = APP_LOCAL.getTokenStorage()
                        try {
                            const response = await fetch(`http://localhost:3001/deleteAdmin/${adminId}`,
                                {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    },
                                });
                            const data = await response.json();
                            if (data.status === 200) {
                                ToastApp.success('Xóa thành công');
                                setReloadData(true);
                            } else {
                                ToastApp.error('Lỗi: ' + data.message);
                            }

                        } catch (e) {
                            console.log("Lỗi xóa sản phẩm: ", e)
                        }
                    },
                },
            })
        }


    }



    useEffect(() => {
        getAccounts();
        setReloadData(false);
    }, [reloadData]);
    return (
        <div className="container">
            {
                status ? (
                    <div>{signupAdmin()}</div>
                ) : <div className="product-container">
                    <div className="header-table-container">
                        <table className="header-table">
                            <thead>
                                <tr>
                                    <th colSpan="10">
                                        <div className="purple-line"></div>
                                        <span>Danh sách tài khoản admin</span>
                                    </th>
                                    <div className="button-container">
                                        <button className="product-button" onClick={handleNavigateSignUp}>+ Tạo tài khoản</button>
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
                                    <th>Hành động</th>
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
            }
        </div>
    )
}
export default SignUp