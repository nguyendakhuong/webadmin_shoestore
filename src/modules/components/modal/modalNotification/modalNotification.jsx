import { useContext } from "react"
import UserContext from "../../../../context/use.context"
import { KEY_CONTEXT_USER } from "../../../../context/use.reducer"
import styles from './styles.module.scss'
import ButtonWed from "../../button/Button-admin"
import AppImages from "../../../asset"
const ModalNotification = () => {
    const [userCTX, dispatch] = useContext(UserContext)
    const onClickClone = () => {
        dispatch({
            type: KEY_CONTEXT_USER.HIDE_MODAL,
        })
    }
    return (
        <div className={styles.modal}>
            <div className={styles.iconClone}>
                <i onClick={onClickClone} class="bx bx-x"></i>
            </div>
            <h1>{userCTX.titleModel ?? 'Thông báo'}</h1>
            <img className={styles.icon} src={AppImages.iconNotification} alt="" />
            <label>
                {' '}
                {userCTX.contentModel ?? 'Bạn không được thực hiện điều này'}
            </label>
            <div className={styles.button}>
                <div>
                    <ButtonWed buttonAuth={false} title={'Ok'} onClick={onClickClone} />
                </div>
            </div>
        </div>
    )
}
export default ModalNotification