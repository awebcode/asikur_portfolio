import { useEffect, useState } from "react";
import Bio from "./Bio";

import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";
import Link from "next/link";
import { Edit } from "@material-ui/icons";
export default function IntroForAccount({ detailss, visitor, setOthername, user, userDetails }) {
  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);
  const initial = {
    bio: details?.bio ? details.bio : "",
    work: details?.work ? details.work : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [name, setname] = useState();
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

  const updateDetails = async () => {
    try {
      // console.log("sent");
      const userId = user._id;
      const { data } = await axios.put(`/api/auth/updateDetails`, {
        infos,
        name,
        userId
      });
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(2000 - e.target.value.length);
  };
  return (
    <div className="profile_card">
      {/* <div className="profile_card_header">Intro</div> */}

      <>
        {" "}
        {details?.bio && !showBio && (
          <div className="info_col">
            <span className="info_text">
              {details?.bio}
              {!visitor && (
                <span>
                
                    <>
                      {" "}
                      <Edit
                        href={"#"}
                        className="gray_btn hover1"
                        onClick={() => setShowBio(true)}
                      ></Edit>
                    </>
               
                </span>
              )}
            </span>
          </div>
        )}
      </>
    
        <>
          {!details?.bio && !showBio && !visitor && (
            <Link
              href={"#"}
              className="gray_btn hover1 w100"
              onClick={() => setShowBio(true)}
            >
              Add Bio
            </Link>
              )}
             
        </>
   
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/job.png" alt="" />
          works as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/job.png" alt="" />
          works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img style={{ animation: "none" }} src="../../../icons/job.png" alt="" />
            works at {details?.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img
            style={{ animation: "none" }}
            src="../../../icons/relationship.png"
            alt=""
          />
          Relationship {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/studies.png" alt="" />
          studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/studies.png" alt="" />
          studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/home.png" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/home.png" alt="" />
          From {details?.hometown}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img style={{ animation: "none" }} src="../../../icons/instagram.png" alt="" />
          <a href={`https://www.instagram.com/${details?.instagram}`} target="_blank">
            {details?.instagram}
          </a>
        </div>
      )}
      
        <>
       
          {!visitor && (
            <Link href={"#"}
           style={{display:"block"}}
             
              onClick={() => setVisible(true)}
            >
              Edit Details
            </Link>
          )}
        </>
     
     
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}

    
    </div>
  );
}
