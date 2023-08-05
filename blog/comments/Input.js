import React, { useState, useRef, useEffect, useMemo } from 'react'

import LiteQuill from '../editor/LiteQuill'

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Close from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
import { upload } from '@/utils/upload';


const Input= ({ callback, edit, setEdit }) => {

  const Picker = useMemo(
    () => dynamic(() => import("emoji-picker-react"), { ssr: false }),
    []
  );
 
 const menuref = useRef();
  const [body, setBody] = useState('')
  const [file, setFile] = useState("");
  const [showfile, setShowFile] = useState("");
  
 
  const divRef = useRef(null)
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const handleEmojiPickerhideShow = () => {
     setShowEmojiPicker(!showEmojiPicker);
   };
const handleEmojiClick = (event, emojiObject) => {
  let message = body;
  message += emojiObject.emoji;
  setBody(message);
};
  useEffect(() => {
    if(edit) setBody(edit.content)
   
  },[edit])


  const handleSubmit = async() => {
    const div = divRef.current;
    const text = (div?.innerText)
    if(!text.trim()) {
      if(setEdit) return setEdit(undefined);
      return;
    };
     let media = "";
     if (file.length > 0) media = await upload(file);
   
    callback(body,media.url) //file

    setBody('')
    setFile("")
    setShowFile("");
  }
 
  useEffect(() => {
    let handler = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const closefile = () => {
    setShowFile("");
    setFile("")
  }
  return (
    <div>
      <div className="emoji" style={{ display: "inline-block" }} ref={menuref}>
        <InsertEmoticonIcon onClick={handleEmojiPickerhideShow} />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>

      <LiteQuill
        body={body}
        setBody={setBody}
        setFile={setFile}
        setShowFile={setShowFile}
       
      />
      <div className="showFileCm">
        {showfile && (
          <>
            <img src={showfile} style={{ height: "100px", width: "100px" }} />
            <Close className="showFileCmBtn" onClick={closefile} />
          </>
        )}
      </div>
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <button className="" onClick={handleSubmit}>
        {edit ? "Update" : "Send"}
      </button>
    </div>
  );
}

export default Input
