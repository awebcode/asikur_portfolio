import React from 'react'
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const Modal = (props) => {
  return (
    <>
      {" "}
      <div className="modal-prot">
        <p className="cross" onClick={() => props.setfirst(false)}>
          <ClearIcon />
        </p>

        <div className="modal-title">
          <p className="zt">
            I Will Create Custom <span>Website Design For You</span>
          </p>
          <h1 className="zz">{props.v.company_name}</h1>
        </div>
        <div className="modal-content">
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s1}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s2}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s3}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s4}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s5}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s6}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s7}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s8}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s10}
          </p>
          <p className="zzz">
            <span className="zc">
              <CheckIcon />
            </span>
            {props.v.s9}
          </p>
        </div>
      </div>
    </>
  );
}

export default Modal