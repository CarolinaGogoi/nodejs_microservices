import React, { useEffect} from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState, OnGetBlocks  } from '../redux'
import BlockTable from '../components/BlocksTable';
import LoadingSpinner from '../components/LoadingSpinner';

const _HomeScreen = () => {

 const dispatch = useDispatch()
   
  const { isLoading, blocks, appError }  = useSelector((state: ApplicationState) => state.coinsReducer);

  useEffect(() => {
      if(!Array.isArray(blocks)){
          dispatch(OnGetBlocks())
      }     
    }, []);

  const viewBlocks = () => {
        if(isLoading){
            return  <LoadingSpinner />
        }else{
          return Array.isArray(blocks) ? <BlockTable blocks={blocks}/> : <div>"Data not available at this moment!"</div>
        }
    }

    return <div className="container main">
                {viewBlocks()}
          </div>

}

const HomeScreen = _HomeScreen;

export { HomeScreen };