import { useEffect, useRef, useState } from 'react';
import './Button-dropdown.scss';
import AppImages from '../../asset';

const ButtonDropDown = ({ buttonItem, onItemClick, orderStatus }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [key, setKey] = useState("")
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleItemClick = (key) => {
        if (onItemClick) {
            onItemClick(key);
        }
        setIsOpen(false);
    };

    const canItemClick = (key) => {
        if (key === 'verifyOrder') {
            setDisabled(false)
            return orderStatus === 'createOrder' || orderStatus === 'PaidCreateOrder';
        }
        setDisabled(true)
        return true;
    };
    useEffect(() => {
        canItemClick()
    }, [isOpen])

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={toggleDropdown}>
                <img className='iconDropdown' src={AppImages.iconDropdown} alt='Error'></img>
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {buttonItem &&
                        buttonItem.map((v, i) => (
                            <li
                                key={i}
                                onClick={() => handleItemClick(v.key)}
                                className={v.key === 'verifyOrder' && disabled ? 'disabledItem' : ''}
                            >
                                {v.label}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default ButtonDropDown;