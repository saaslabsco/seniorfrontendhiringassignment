import React, { useEffect, useState } from "react";
// import dataJson from "../frontend-assignment.json";
import { getHighRatedKickStartersProjects } from "../services/details.services";
import Spinner from "./common/spinner";

function Dashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = (page - 1) * 5;
    const end = start + 5;
    setLoading(true);
    getHighRatedKickStartersProjects(start, end)
      .then((res) => {
        setLoading(false);
        const total = res.totalCount;
        const totalPaginationPages = Math.ceil(total / 5);
        setData(res?.data);
        setTotalPages(totalPaginationPages);
      })
      .catch((err) => {
        setLoading(false);
        console.log({ err });
      });
  }, [page]);

  const handleNext = () => {
    const num = page + 1 > totalPages ? totalPages : page + 1;
    setPage(num);
  };

  const handlePrev = () => {
    const num = page - 1 <= 0 ? 1 : page - 1;
    setPage(num);
  };

  const pageRange = () => {
    const start = Math.floor((page - 1) / 5) * 5 + 1;
    const end = Math.min(start + 4, totalPages);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const numberWithCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <React.Fragment>
      <div className='data-table'>
        <h3>kickstarter projects</h3>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Spinner />
            ) : (
              data?.map((x) => (
                <tr>
                  <td>{x["s.no"]}</td>
                  <td>{x["percentage.funded"]}</td>
                  <td>${numberWithCommas(x["amt.pledged"])}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className='pagination-btns'>
          <button
            onClick={handlePrev}
            disabled={page - 1 <= 0}
            className='prev-btn'
          >
            ❮ Previous
          </button>
          <div className='pagination'>
            {!loading &&
              pageRange().map((currentPage) =>
                currentPage < totalPages ? (
                  <div
                    onClick={() => setPage(currentPage)}
                    className={`pagination-box ${
                      currentPage === page ? "selected-page" : ""
                    }`}
                  >
                    {currentPage}
                  </div>
                ) : null
              )}
          </div>
          <button
            onClick={handleNext}
            disabled={page + 1 > totalPages}
            className='next-btn'
          >
            Next ❯
          </button>
        </div>
      </div>

      {/* <div className='pagination'>
        {pages.map((currentPage) => (
          <div
            onClick={() => setPage(currentPage)}
            className={`pagination-box ${
              currentPage === page ? "selected-page" : ""
            }`}
          >
            {currentPage}
          </div>
        ))}
      </div> */}

      {/* <div>
        <button>❮ prev</button>
        {Array.from({ length: 5 }, (_, i) => i + page).map((currentPage) => (
          <div
            onClick={() => setPage(currentPage)}
            className={`pagination-box ${
              currentPage === page ? "selected-page" : ""
            }`}
          >
            {currentPage}
          </div>
        ))}
        <button>❮ next</button>
      </div> */}
    </React.Fragment>
  );
}

export default Dashboard;
