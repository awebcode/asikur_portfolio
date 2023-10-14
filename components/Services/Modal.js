import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = (props) => {
  const handleClose = () => {
    props.setfirst(false);
  };

  return (
    <Dialog open={true} onClose={handleClose} className="bg-[#00000046]">
      <DialogTitle>
        <div className="modal-title">
          <p className="zt">
            I Will Create Custom Website Design For You
          </p>
          <h1 className="zz">{props.v.company_name}</h1>
        </div>
       
      </DialogTitle>
      <DialogContent dividers>
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className="bg-rose-500 hover:bg-rose-400 text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          className="bg-emerald-400 hover:bg-emerald-500 text-dark-tremor-brand-faint"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
