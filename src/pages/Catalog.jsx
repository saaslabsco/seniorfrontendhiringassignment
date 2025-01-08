import React from "react"
import Pagination from "../components/Pagination"
import Table from "../components/Table"

const Catalog = () => {
    return(
        <div className="catalog-wrapper">
            <Table />
            <Pagination />
            <span className="disclaimer">Disclaimer: This app is theme based app. To turn on light/dark mode change device theme</span>
        </div>
    )
}

export default Catalog