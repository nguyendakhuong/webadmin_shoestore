import { useContext } from "react"
import UserContext from "../../../context/use.context"
import styles from './styles.module.scss'
import { KEY_CONTEXT_USER } from "../../../context/use.reducer"
import DeleteItem from "./modalDelete/ModalDeletel"
import ModalNotification from "./modalNotification/modalNotification"

export const TYPE_MODEL = {
    DELETE_ITEM: 'DELETE_ITEM',
    NOTIFICATION_MODAL: 'NOTIFICATION_MODAL'
}
const Modal = () => {
    const [{ isOpenModal, dataModal, typeModal }, dispatch] =
        useContext(UserContext)

    return (
        <div
            id="modal"
            className={styles.modal}
            onClick={e => {
                if (e.target.id === 'modal')
                    dispatch({ type: KEY_CONTEXT_USER.HIDE_MODAL })
            }}>
            <div className={styles.show_modal}>
                {typeModal === TYPE_MODEL.DELETE_ITEM && <DeleteItem />}
                {typeModal === TYPE_MODEL.NOTIFICATION_MODAL && <ModalNotification />}
            </div>
        </div>
    )
}
export default Modal
