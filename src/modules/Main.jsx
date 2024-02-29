import { useNavigate } from "react-router-dom"

const Main = () => {
    const navigate = useNavigate()

    const handlerLogin = () => {
        navigate('/Login')
    }
    return (
        <div>
            <button onClick={handlerLogin}>
                Login
            </button>
        </div>
    )
}
export default Main