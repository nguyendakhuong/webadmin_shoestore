

import { useNavigate } from "react-router-dom";
import "./Main.scss";

const Main = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/Login');
    };

    const handleRegister = () => {
        navigate('/Signup');
    };

    return (
        <div className="main-container">
            <button className="button" onClick={handleLogin}>
                Đăng nhập
            </button>
            <button className="button" onClick={handleRegister}>
                Đăng kí
            </button>
        </div>
    );
};

export default Main;
