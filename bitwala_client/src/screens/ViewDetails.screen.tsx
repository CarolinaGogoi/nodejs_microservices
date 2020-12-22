import React, { useEffect} from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState, OnGetBlockDetails  } from '../redux'
import LoadingSpinner from '../components/LoadingSpinner';

import { useParams } from 'react-router-dom'
import TransactionsTable from '../components/TransactionsTable';

interface DetailsProps{
    hash: string
}

const ViewDetailsScreen = () => {

    let { hash } = useParams<DetailsProps>();

    const dispatch = useDispatch()
   
    const { isLoading, blockDetails }  = useSelector((state: ApplicationState) => state.coinsReducer);

    useEffect(() => {
        dispatch(OnGetBlockDetails(hash, false));
    }, []);

    // Load More Transactions
    const onTapViewMore = () => {
        dispatch(OnGetBlockDetails(hash, true));
    }
 
    const renderDetals = () => {

        if(isLoading){
            return <LoadingSpinner />
        }else{

            if(blockDetails){
                return (
                    <div>
                    <div className="card">
                        <div className="col s12">
                            <div className="card-content">
                                <span className="card-title">Block Details</span>

                                <table className="striped">
                                    <tbody>
                                        <tr>
                                            <td>Size</td>
                                            <td>{blockDetails.size}</td>
                                        </tr>
                                        <tr>
                                            <td>Block Index</td>
                                            <td>{blockDetails.block_index}</td>
                                        </tr>
                                        <tr>
                                            <td>Previous Hash</td>
                                            <td>{blockDetails.prev_block}</td>
                                        </tr>
                                         
                                    </tbody>
                                </table>
                                
                            </div>
                          </div>
                     </div> 
                         <TransactionsTable transactions={blockDetails.tx} txnCount={blockDetails.txnCount} onTapViewMore={onTapViewMore} /> 
                     </div>
                )

            }
        }
        return <div> Data Not found</div>
    }

    return <div className="container main">
                {renderDetals()}       
        </div>

}

export { ViewDetailsScreen };