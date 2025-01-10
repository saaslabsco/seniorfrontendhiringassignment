
import React from "react";

type dataObj = {
  id: number,
  items: number[]
}

interface props{
  data: dataObj,
  loading: boolean,
}

const TableRow = (props: props) => {
    const { data = [] } = props;
    return (
     <>
      <tr>
        {data?.map((item) => {
            return <td key={item}>{item}</td>;
        })}
    </tr>
      
     </>
    );
};

export default TableRow;