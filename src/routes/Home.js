import FweetFactory from "components/FweetFactory";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import Fweet from "../components/Fweet";

export default function Home({ userObj }) {
  const [fweets, setFweets] = useState([]);

  // const getFweets = async () => { 구식방법
  //   const dbFweets = await dbService.collection("fweet").get();
  //   dbFweets.forEach((doc) => {
  //     const fweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setFweets((prev) => [...prev, fweetObj]);
  //   });
  // };

  useEffect(() => {
    dbService.collection("fweet").onSnapshot((snapshot) => {
      const fweetArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // .sort((a, b) => a.createdAt - b.createdAt);

      setFweets(fweetArray);
    });
  }, []);

  return (
    <div className="container">
      <FweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        <hr />
        {fweets.map((fweet) => (
          <Fweet
            fweet={fweet}
            key={fweet.id}
            isOnwer={fweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}
