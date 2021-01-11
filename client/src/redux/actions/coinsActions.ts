import { Dispatch } from 'react'
import { BlockDetails, BlocksResponse } from "../../models";
import { Api } from '../../api/Api';
 
export interface GetBlocksAction {
    readonly type: 'ON_FETCH_BLOCKS',
    payload: BlocksResponse
}

export interface GetBlockDetailsAction {
    readonly type: 'ON_FETCH_BLOCK_DETAILS',
    payload: BlockDetails
}
 
export interface AppErrorAction {
    readonly type: 'ON_ERROR',
    payload: any
}

//UI Utility Actions
export interface OnLoadingAction{
    readonly type: 'ON_LOADING',
    payload: boolean
}

export interface OnReload{
    readonly type: 'ON_RELOAD',
}

export type CoinsAction = GetBlocksAction | GetBlockDetailsAction | AppErrorAction 
| OnLoadingAction | OnReload;


export const OnGetBlocks = () => {

    return async ( dispatch: Dispatch<CoinsAction>) => {

        dispatch({ type: 'ON_LOADING', payload: true })

        try {
            const response = await Api.get<BlocksResponse>('/blocks')
            console.log(response)
            if(!response){
                dispatch({
                    type: 'ON_ERROR',
                    payload: 'response error'
                })
            }else{
                 dispatch({
                    type: 'ON_FETCH_BLOCKS',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_FETCH_BLOCKS',
                payload: error
            })
        }
    }
}



export const OnGetBlockDetails = (hash: string, isViewMore: boolean) => {

    const url = isViewMore ? `/transactions/${hash}` : `/block/${hash}`

    return async ( dispatch: Dispatch<CoinsAction>) => {

        dispatch({ type: 'ON_LOADING', payload: true })

        try {
            const response = await Api.get<BlockDetails>(url)
            if(!response){
                dispatch({
                    type: 'ON_ERROR',
                    payload: 'response error'
                })
            }else{
                 dispatch({
                    type: 'ON_FETCH_BLOCK_DETAILS',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_FETCH_BLOCKS',
                payload: error
            })
        }
    }
}
  
export const OnReload = () => {
 
    return async ( dispatch: Dispatch<CoinsAction>) => {
        dispatch({ type: 'ON_RELOAD' })
    }
}
 