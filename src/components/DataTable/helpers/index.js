export const paginateData = (data,
    page,
    pageSize
) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      pageItems: data.slice(start, end),
      totalPages: Math.ceil(data.length / pageSize),
    };
}