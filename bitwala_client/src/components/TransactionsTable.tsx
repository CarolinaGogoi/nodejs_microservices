import React, { useState, useEffect } from 'react';
import {Transaction } from '../models/'
import { FormatDate } from '../utils/DateFormater';
 
interface TransactionsProps{
    transactions: [Transaction],
    onTapViewMore: Function
}

 const TransactionsTable: React.FC<TransactionsProps> = ({ transactions, onTapViewMore }) => {

    const [items, setItems] = useState({});

    const [ pageIndex, setPageIndex ] = useState(0);

    const makePaination = () => {

        let transactionsPerPage = [];
        var i,j,chunk = 10; // per page

        for (i=0,j=transactions.length; i<j; i+=chunk) {
            transactionsPerPage.push(transactions.slice(i,i+chunk));
        }
        return transactionsPerPage
    }
 
    useEffect(() => {
        if(transactions!== undefined){
            const transactionsPerPage = makePaination();
            setItems(transactionsPerPage)
        }
    },[transactions])

    const itemsForPage = () => {
        return items as [[Transaction]];
     }

    const makePageNumbers = () => {

        const currentItems = itemsForPage();

        if(Array.isArray(currentItems)){

            const totalPages = currentItems.length;

            return currentItems.map((page, index) => {
                if(totalPages > 9 && index > 9){
                    if(index === (totalPages - 1)){
                        return <li  key={index} onClick={() => gotoPage(false, index)}  className={pageIndex === index ? "active" : "none"}><a href="#!">... {index+1}</a></li>
                    }
                    return <li style={{ display: pageIndex === index ? 'inline' : 'none',  paddingTop: 5, paddingBottom: 5}} key={index} onClick={() => gotoPage(false, index)}  className={pageIndex === index ? "active" : "none"}><a href="#!">{index+1}</a></li>
                }else{
                    return <li key={index} onClick={() => gotoPage(false, index)}  className={pageIndex === index ? "active" : "none"}><a href="#!">{index+1}</a></li>
                }
            })
        }
     }

    const gotoPage = (isNext: boolean, index?: number) => {

        const currentItems = itemsForPage();
        if(index !== undefined){
             setPageIndex(index)
        }else{
             if(isNext){
                setPageIndex((currentItems.length - 1) > pageIndex ? pageIndex+1 : pageIndex )
            }else{
                setPageIndex(pageIndex > 0 ? pageIndex-1 : pageIndex )
            }
        }
    }

    const renderPagination = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ul className="pagination">
                    <li onClick={() => gotoPage(false)} className={pageIndex < 1 ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                        {makePageNumbers()}
                     <li onClick={() => gotoPage(true)} className={pageIndex < (itemsForPage().length - 1)  ? "waves-effect" : "disabled" }><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                </ul>
            </div>
        )
    } 

    const renderViewMoreTransaction = () => {
        return(
            <div style={{ display: 'flex', justifyContent: 'center', height: 60}}>
                  <button onClick={() => onTapViewMore()} className="btn waves-effect waves-light" type="submit" name="action">View More
                    </button>
            </div>
        )
    }

    const renderRows = () => {
        const currentItems = itemsForPage();

        if(currentItems){
            if(currentItems.length > pageIndex){
                return currentItems[pageIndex].map((item) => {
                    return (
                        <tr key={item.hash}>
                            <td>{item.hash}</td>
                            <td>{item.block_index}</td>
                            <td>{item.block_height}</td>
                            <td>{item.weight}</td>
                            <td>{item.fee}</td>
                            <td>{FormatDate(item.time)}</td>
                    </tr>
                    );
                })
            }
        }
    }

    const transactionsDetails = () => {

        return (
            <div className="col s12">
                <div className="card-content">
                    <span className="card-title">Transactions</span>
                    <table className="highlight">
                    <thead>
                    <tr>
                        <th>Hash</th>
                        <th>Index</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Fee</th>
                        <th>Age</th>
                    </tr>
                    </thead>

                    <tbody>
                        {renderRows()}
                    </tbody>
                    </table>
                </div>
                { transactions.length > 10 ? renderPagination() : renderViewMoreTransaction() }
            </div>
        );

    }

    const transactionsNotfound = () => {

        return (
            <div className="col s12">
                <div className="card-content">
                    <span className="card-title">No Transactions Available</span>
                    
                </div>
            </div>
        );

    }

    return (
          <div className="card">
            {transactions !== undefined ? transactionsDetails() : transactionsNotfound() }
        </div> 

        
    );

}
 export default TransactionsTable;