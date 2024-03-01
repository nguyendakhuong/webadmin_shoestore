import React, { useContext } from 'react';
import './Header.scss'; // Đảm bảo import file CSS hoặc SCSS của bạn
import mailIconImage from '../../asset/image/mail.png'; // Import hình ảnh icon mail
import notificationIconImage from '../../asset/image/bell.png'; // Import hình ảnh icon thông báo
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/use.context';
import { KEY_CONTEXT_USER } from '../../../context/use.reducer';
import { TYPE_MODEL } from '../../components/modal';

const Header = () => {
    const navigate = useNavigate()
    const [{ role }, dispatch] = useContext(UserContext)
    const handlerAdmin = () => {
        if (role === "superAdmin") {
            navigate('/admin/signup')
        } else {
            dispatch({
                type: KEY_CONTEXT_USER.SHOW_MODAL,
                payload: {
                    typeModal: 'NOTIFICATION_MODAL',
                    dataModal: '',


                },
            })
        }
    }
    return (
        <header className="header">
            <div className="logo" onClick={handlerAdmin}>
                <img src="/path/to/logo.png" alt="Logo" />
            </div>
            <div className="header-right">
                <div className="search-box">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button type="button">Tìm kiếm</button>
                </div>
                <div className="icon-container">
                    <div className="icon mail-icon">
                        <img src={mailIconImage} alt="Mail Icon" className="mail-icon-img" />
                    </div>
                    <div className="icon notification-icon">
                        <img src={notificationIconImage} alt="Notification Icon" className="notification-icon-img" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
