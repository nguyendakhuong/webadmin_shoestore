import { useNavigate } from 'react-router-dom'
import InputAdmin from '../components/input/Input-admin'
import styles from './styles.module.scss'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/use.context'
import { ParseValid } from '../../lib/validate/ParseValid'
import { Validate } from '../../lib/validate/Validate'
import ButtonWed from '../components/button/Button-admin'


const Login = () => {
    const navigate = useNavigate()
    const [userCtx, dispatch] = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [listError, setListError] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        if (!userCtx.isLoading && userCtx.token) navigate('/home')
    }, [userCtx])
    const [formValue, setFormValue] = useState({
        email: null,
        password: null,
    })

    const handlerOnChangeInput = e => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)

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
    const handleOnClick = async e => {
        e.preventDefault()

    }

    return (
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
    )
}
export default Login