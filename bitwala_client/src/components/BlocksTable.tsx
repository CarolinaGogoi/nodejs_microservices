import React, { useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../models/'
import { FormatDate } from '../utils/DateFormater';

interface BlockProps{
    blocks: [Block]
}

 const BlockTable: React.FC<BlockProps> = ({ blocks}) => {
     
    const [items, setItems] = useState({});

    const [ pageIndex, setPageIndex ] = useState(0);

    const makePaination = () => {

        let blocksPerPage = [];
        var i,j,chunk = 10; // per page

        for (i=0,j=blocks.length; i<j; i+=chunk) {
            blocksPerPage.push(blocks.slice(i,i+chunk));
        }

        return blocksPerPage
    }

    useEffect(() => {
        if(blocks!== undefined){
            const blocksPerPage = makePaination();
            setItems(blocksPerPage)
        }
    },[])
   

    const itemsForPage = () => {
       return items as [[Block]];
    }

 

    const makePageNumbers = () => {

        const currentItems = itemsForPage();
        if(Array.isArray(currentItems)){
            return currentItems.map((page, index) => {
               return <li key={index} onClick={() => gotoPage(false, index)}  className={pageIndex === index ? "active" : "waves-effect"}><a href="#!">{index+1}</a></li>
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


    const renderBlockRows = () => {

        const currentItems = itemsForPage();

        if(currentItems.length > pageIndex){
            return currentItems[pageIndex].map((block) => {
                return (
                    <tr key={block.hash} >
                        <td><Link to={`/details/${block.hash}`} >{block.hash}</Link></td>
                        <td>{FormatDate(block.time)}</td>
                        <td>{block.height}</td>
                   </tr>
                );
            })
        }
 
    }
 
    return (
 
        <div className="card card-width">
        <div className="col s12">
            <div className="card-content">
                <span className="card-title">Latest Blocks</span>

                <table className="highlight">
                    <thead>
                    <tr>
                        <th>Hash</th>
                        <th>Age</th>
                        <th>Height</th>
                    </tr>
                    </thead>

                    <tbody>
                        {renderBlockRows()}
                    </tbody>
                </table>
                
            </div>
            {renderPagination()}
          </div>
      </div>
 
        
    );

}
 export default BlockTable;