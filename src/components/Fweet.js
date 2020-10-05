import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function Fweet({ fweet, isOnwer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newFweet, setNewFweet] = useState(fweet.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("why");
    if (ok) {
      await dbService.doc(`fweet/${fweet.id}`).delete();
      await storageService.refFromURL(fweet.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onChange = (e) => {
    const { value } = e.target;
    setNewFweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`fweet/${fweet.id}`).update({
      text: newFweet,
    });
    setIsEditing(false);
  };
  return (
    <div className="nweet">
      <hr />
      {isEditing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit yours..."
              onChange={onChange}
              value={newFweet}
              required
              autoFocus
            />
            <input type="submit" value="update..." className="formBtn" />
          </form>
          <button className="formBtn cancelBtn" onClick={toggleEditing}>
            Cancle
          </button>
        </>
      ) : (
        <>
          {" "}
          <h4>{fweet.text}</h4>
          {fweet.attachmentUrl ? (
            <img alt="er" src={fweet.attachmentUrl} />
          ) : (
            "@@@"
          )}
          {isOnwer && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
