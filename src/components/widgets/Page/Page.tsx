import React from "react";
import Pagination from "react-js-pagination";

function Page(props : PaginationInfoDTO) {
  return (
    <Pagination
      activePage={props.page} // 현재 페이지
      itemsCountPerPage={8}     // 한 페이지당 보여줄 리스트 아이템 개수
      totalItemsCount={props.totalCount}    // 총 아이템 개수
      pageRangeDisplayed={props.size}     // paginator 내에서 보여줄 페이지 범위
      prevPageText={"<"}
      nextPageText={">"}
      onChange={(page: number) => props.setPage(page)}
    />
  )
}

export default Page;