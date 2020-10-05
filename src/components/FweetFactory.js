import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function FweetFactory({ userObj }) {
  const [fweet, setFweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    // if (fweet === "") return;

    e.preventDefault();
    let attachmentUrl = "";

    if (attachment) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    console.log(attachmentUrl);

    const fweetObj = {
      text: fweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentUrl,
    };

    await dbService.collection("fweet").add(fweetObj);
    setFweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setFweet(value);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.target;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={fweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        onChange={onFileChange}
        type="file"
        accept="image/*"
        style={{
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="rr"
            width="50px"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div
            className="factoryForm__clear"
            onClick={() => setAttachment((prev) => !prev)}
          >
            <span>Remove</span>

            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}
