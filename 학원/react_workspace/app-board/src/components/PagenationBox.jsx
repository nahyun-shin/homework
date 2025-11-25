import React from 'react';
import Pagination from'react-js-pagination';
import '../assets/css/pagnation.css';
function PagenationBox({currentPage, totalRows, nextPage}) {
    console.log(currentPage)
    return (
        <>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={10}
            totalItemsCount={totalRows}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={(page)=>nextPage(page)}
          />  
        </>
    );
}

export default PagenationBox;