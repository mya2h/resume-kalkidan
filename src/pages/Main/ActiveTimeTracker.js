import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveTimeTracker = () => {
    console.log("active");
  const [activeTime, setActiveTime] = useState(0);

  useEffect(() => {
    let intervalId;
    let startTime = new Date().getTime();

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        // clearInterval(intervalId);
        // const options = {
        //     path: '/json/',
        //     host: 'ipapi.co',
        //     port: 443,
        //     headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
        //   };
        // const res = await axios.get("https://ipapi.co/json/", options);
        const ip = {
          "S": '69.18.37.194'
        }
        const date = {
          "S": new Date().toLocaleString()
        }
        const part = {
          "S": "main"
        }
        const stay_time = {
          "S": String(activeTime / 1000)
        }
        const items = {
          ip: ip,
          date: date,
          part: part,
          stay_time: stay_time
        }
        const requestBody = {
          TableName: "track_user_activitis",
          Item: items
        };
  
        try {
          await axios.post("https://sl2tirf9fi.execute-api.us-east-1.amazonaws.com/v1/", requestBody);  
          // Handle response if needed
        } catch (error) {
          console.log(error);
        }
      } else {
        startTime = new Date().getTime();
        intervalId = setInterval(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - startTime;
          setActiveTime((prevActiveTime) => prevActiveTime + elapsedTime);
          startTime = currentTime;
        }, 1000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    //window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      //window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [activeTime]);

  return null;
};

export default ActiveTimeTracker;
