import React, { useEffect, useState } from "react";
import TableGenerator from "../..//organism/tableGenerator";

import { columnsConfig } from './saasLabsDataTable.columns';

const SaasLabsDataTable = () => {
    const [saasTableData, setSassTableData] = useState([]);

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        )
            .then((response) => response.json())
            .then((data) => {
                setSassTableData(data)
            });
    }, []);



    return <div style={{ width: "50%" }}>
        <TableGenerator columnsConfig={columnsConfig} data={saasTableData} recordsPerPage={5} tableHeaderTitle="Sass Labs Data"/>
    </div>
};

export default SaasLabsDataTable;

