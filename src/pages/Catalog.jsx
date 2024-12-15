import React from "react"
import Pagination from "../components/Pagination"
import Table from "../components/Table"

const Catalog = () => {
    return(
        <div className="catalog-wrapper">
            <Table />
            <Pagination />
        </div>
    )
}

export default Catalog