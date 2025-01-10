export const getCurrentPageData= (currentPage,recordsPerPage,totalData)=> {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    return  totalData.slice(indexOfFirstRecord, indexOfLastRecord);
}

export const getTotalPages = (totalData,recordsPerPage)=> Math.ceil(totalData.length / recordsPerPage);