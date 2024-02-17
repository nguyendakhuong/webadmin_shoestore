const InitState = {
  token: '',
  isLoading: false,
  isOpenModal: false,
  dataModal: null,
}
const KEY_CONTEXT_USER = {
  SET_TOKEN: 'SET_TOKEN',
  SET_LOADING: 'SET_LOADING',
  CLEAR: 'CLEAR',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
}
const UserReducer = (state, action) => {
  switch (action.type) {
    case KEY_CONTEXT_USER.SHOW_MODAL:
      return {
        ...state,
        isOpenModal: true,
        titleModel: action.payload.titleModel,
        contentModel: action.payload.contentModel,
        dataModal: action.payload.dataModal,
        typeModal: action.payload.typeModal,
        onClickConfirmModel: action.payload.onClickConfirmModel,
      }
    case KEY_CONTEXT_USER.HIDE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        dataModal: null,
        onClickConfirmModel: () => {},
      }
    default:
  }
}
export { InitState, KEY_CONTEXT_USER }

export default UserReducer
