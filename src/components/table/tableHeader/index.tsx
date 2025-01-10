import React from "react";

const TableHeader = ({ item }) => {
    return (
        <td style = {{fontWeight: 600}}title={item}>
            {item}
        </td>
    );
};

export default TableHeader;