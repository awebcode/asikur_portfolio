import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useHistory, useNavigate } from 'react-router-dom'



const Pagination = ({total, callback,slug}) => {
  const [page, setPage] = useState(1)

  const newArr = [...Array(total)].map((_,i) => i + 1)
  const history = useRouter()
  const [act,setAct]=useState(1)
 
  const isActive = (index) => {
    // if(index === page) return "active";
    // return ""
   
  }

  const handlePagination = (num) => {
    history.prefetch(`${history.query.id}?page=${num}`); ///blog/${slug}
    callback(num);
  }

  useEffect(() => {
    const num = history?.location?.search.slice(6) || 1;
    setPage(Number(num));
  }, [history.prefetch, history?.location?.search]);


  return (
    <nav aria-label="Page navigation example" style={{ cursor: "pointer" }}>
      <ul className="pagination">
        <li className="page-item" onClick={() => setAct(act - 1)}>
          <span className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>

        {newArr.map((num) => (
          <li
            key={num}
            className={act === num ? "active" : "page-item"}
            onClick={() => handlePagination(num)}
          >
            {/* <span className={`page-link ${isActive(num)}`} onClick={()=>setAct(num)}>{num}</span> */}
            <span className={act === num ? "active" : ""} onClick={() => setAct(num)}>
              {num}
            </span>
          </li>
        ))}

        {page < total && (
          <li className="page-item" onClick={() => setAct(act + 1)}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true" onClick={() => setAct(act + 1<act)}>
                &raquo;
              </span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination
