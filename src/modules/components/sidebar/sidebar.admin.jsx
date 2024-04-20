import { Link, useLocation, useNavigate } from 'react-router-dom'
import './sidebar.scss'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/use.context'
import { KEY_CONTEXT_USER } from '../../../context/use.reducer'
import APP_LOCAL from '../../../lib/localStorage'
import { useTranslation } from 'react-i18next'


function Sidebar({ sidebarNav }) {
    const [activeIndex, setAnActiveIndex] = useState(0)
    const location = useLocation()
    const [userCtx, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    const [t, i18n] = useTranslation();

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2]

        const locationItem = sidebarNav.findIndex(item => item.section === curPath)

        setAnActiveIndex(!curPath ? 0 : locationItem)
    }, [location])
    const getLocalizedText = (textKey) => {
        return t(textKey);
    };

    return (
        <div className="sidebar">
            <div className="sidebar__menu">
                {sidebarNav.map((nav, index) => (
                    <Link
                        to={nav.link}
                        key={`nav ${index}`}
                        className={`sidebar__menu__item ${activeIndex === index && 'active'
                            }`}>
                        <div className="sidebar__menu__item__icon">{nav.icon}</div>
                        <div className="sidebar__menu__item__txt">{getLocalizedText(nav.text)}</div>
                    </Link>
                ))}
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className="bx bx-log-out"></i>
                    </div>
                    <div
                        onClick={() => {
                            dispatch({
                                type: KEY_CONTEXT_USER.SET_ROLE,
                                payload: '',
                            })

                            dispatch({
                                type: KEY_CONTEXT_USER.SET_TOKEN,
                                payload: '',
                            })
                            APP_LOCAL.setTokenStorage('TOKEN')
                            navigate('/login')
                        }}
                        className="sidebar__menu__item__txt">
                        {t('logout')}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar