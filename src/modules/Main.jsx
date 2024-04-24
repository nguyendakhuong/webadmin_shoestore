import { useNavigate } from "react-router-dom";
import "./Main.scss";
import video from '../modules/asset/image/video.mp4'
import { useTranslation } from "react-i18next";

const Main = () => {
    const navigate = useNavigate();
    const [t, i18n] = useTranslation();

    const handleLogin = () => {
        navigate('/Login');
    };

    return (
        <div className="main-container">
            <video className="video-background" autoPlay muted loop>
                <source src={video} type="video/mp4" />

            </video>

            <div className="content">
                <button className="button-mainlogin" onClick={handleLogin}>
                    {t('login')}
                </button>
            </div>
        </div>
    );
};

export default Main;
