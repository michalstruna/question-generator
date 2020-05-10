import React from 'react'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'

export default <T extends ActionCreatorsMapObject>(actions: T): T => {
    const dispatch = useDispatch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useMemo(() => bindActionCreators(actions, dispatch), [])
}