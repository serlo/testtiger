import { createSelector } from 'reselect'
import { StoreProps } from '.'

export const createAppSelector = createSelector.withTypes<StoreProps>()

export const selectName = createAppSelector([state => state.name], name => name)
