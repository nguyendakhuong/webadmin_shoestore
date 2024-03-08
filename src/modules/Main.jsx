

import { useNavigate } from "react-router-dom";
import "./Main.scss";

const Main = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/Login');
    };



    return (
        <div className="main-container">
            <button className="button" onClick={handleLogin}>
                Đăng nhập
            </button>

        </div>
    );
};

export default Main;
