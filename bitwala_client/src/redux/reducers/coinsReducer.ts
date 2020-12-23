 
 import { Block, BlockDetails } from '../../models/index'
 import { CoinsAction } from '../actions/coinsActions'

 type AppInitialState = {
    blocks: [Block];
    blockDetails: BlockDetails,
    isLoading: boolean;
    isLodingDetails: boolean,
    appError: any;
 }
 
  const initialState: AppInitialState = {
        blocks: {} as [Block],
        blockDetails: {} as BlockDetails,
        isLoading: true,
        isLodingDetails: true,
        appError: undefined
  };
  
  export const coinsReducer = (
    state: AppInitialState = initialState,
    action: CoinsAction
  ) => {
      
    switch (action.type) {
      case 'ON_FETCH_BLOCKS':
        return {
          ...state,
          blocks: action.payload.blocks,
          isLoading: false
        };
      case 'ON_FETCH_BLOCK_DETAILS':
        return {
          ...state,
          blockDetails: action.payload,
          isLodingDetails: false
        };
      
      case 'ON_ERROR':
        return {
          ...state,
          isLoading: false,
          appError: action.payload,
        };
      case 'ON_LOADING':
        return {
          ...state,
          isLoding: action.payload
        }
      case 'ON_RELOAD':
        return {
          ...state,
          isLodingDetails: true,
          blockDetails: {} as BlockDetails
        }
      default:
        return state;
    }
  };
  