/**
 * Paginate function
 */
export default function paginate(filters: any) {
  //
  let { pageSize = 10, page = 1 } = filters;

  //
  page = page ? page : 1;
  pageSize = pageSize > 30 ? 10 : pageSize;

  //
  const skipDocuments = (page - 1) * pageSize;
  const limitData = +pageSize || 10;

  //
  return {
    skipDocuments,
    limitData,
  };
}
