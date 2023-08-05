import { Delete, Edit } from "@material-ui/icons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  rel,
  deleteDetails
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="add_details_flex " onClick={() => setShow(true)}>
        {value ? (
          <div className="info_profile ">
            <img style={{animation:"none"}} src={`../../../icons/${img}.png`} alt="" />
            {value}
            <Edit className="edit_icon"></Edit>
            
          </div>
        ) : (
          <>
            <AddCircleOutlineIcon className="rounded_plus_icon"></AddCircleOutlineIcon>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  );
}
