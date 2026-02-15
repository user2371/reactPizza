import React, { useEffect, useState } from "react"
import styles from './Pagination.module.scss'
const Pagination = (props) => {
    const [pages, setPages] = useState([]);

    let pagesCount = Math.ceil(props.totalPizzasCount / props.pageSize);
    const createPages = (pagesCount, currentPage) => {
        let pagesArray = [];

        if (pagesCount > 5) {
            if (currentPage > 2 && currentPage < pagesCount - 1) {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    if (i <= pagesCount) pagesArray.push(i);
                }
            } else if (currentPage <= 2) {
                for (let i = 1; i <= 5 && i <= pagesCount; i++) {
                    pagesArray.push(i);
                }
            } else {
                for (let i = pagesCount - 4; i <= pagesCount; i++) {
                    if (i > 0) pagesArray.push(i);
                }
            }
        } else {
            for (let i = 1; i <= pagesCount; i++) {
                pagesArray.push(i);
            }
        }
        return pagesArray;
    };

    useEffect(() => {
        const newPages = createPages(pagesCount, props.currentPage);
        setPages(newPages);
    }, [pagesCount, props.currentPage]);

    return (
        <>
            {
                props.notFound
                    ? <span className={styles.notFound}></span>
                    :
                    <div className={styles.pagination}>
                        <div className={styles.firstPageDoubleArrow} onClick={() => { props.onFirstPageDoubleArrowClick() }}>First page</div>
                        <div className={styles.leftArrow} onClick={() => { props.onLeftArrowClick() }}>&#60;</div>
                        <div className={styles.pages}>

                            {pages.map(page => {
                                return <span onClick={() => { props.onPageChanged(page) }}
                                    className={props.currentPage === page
                                        ? styles.selectedPage
                                        : undefined
                                    }
                                    key={pages.indexOf(page)}>{page}</span>
                            })}


                        </div>
                        <div className={styles.rightArrow} onClick={() => { props.onRightArrowClick() }}>&#62;</div>
                        <div className={styles.lastPageDoubleArrow} onClick={() => { props.onLastPageDoubleArrowClick() }}>Last page</div>
                        <div className={styles.pageNumberField}><input type="number" min="1" value={props.currentPage} onChange={(e) => { props.onNumberInputChange(e.target.value) }}></input>
                            <span>of {pagesCount}</span></div>

                    </div>
            }
        </>
    )

};

export default Pagination;
