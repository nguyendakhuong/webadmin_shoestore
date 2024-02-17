import { useEffect } from 'react'
import styles from './Button-admin.scss'
const ButtonWed = ({
    title,
    onClick = () => { },
    buttonAuth,
    disabledBtn,
    className,
}) => {
    useEffect(() => { }, [disabledBtn])
    return (
        <button
            disabled={disabledBtn}
            className={`${styles.btn} ${!!buttonAuth ? styles.btnAuth : ''
                }  ${className}`}
            onClick={onClick}>
            {title}
        </button>
    )
}
export default ButtonWed
