import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'

export default <T extends ActionCreatorsMapObject>(actions: T): T => {
    return bindActionCreators(actions, useDispatch())
}