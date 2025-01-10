
type inputType = {};
type outputType = {
    data: inputType[],
    pageSize: number,
}
function returnDataWrtTableContent(data: inputType[] = [], startIndex: number = 0, endIndex: number = 5): outputType{
    // just extract only keys which we need to have for showing data ie, sl no, ...
    const tdataList = data?.map((item, index)=>{
        let obj: {id: number, items: string[]} = {};
        obj.id = item["s.no"];
        obj.items = [index+1, item["amt.pledged"], item["percentage.funded"]];
        return obj;
    })
    return {
        data: tdataList.slice(startIndex, endIndex) ?? [],
        pageSize: data.length/5
    };
}

export {returnDataWrtTableContent}