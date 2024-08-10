import React, { useEffect, useState, useRef } from "react";
import TeamPerformaceGrapgh from "../../Common/TeamPerformanceGraph";

const ViewTeamPerformanceList = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="main-sec-dashboard">
        <div className="top-bar-content">
          <h2>Team performace</h2>
        </div>
        <TeamPerformaceGrapgh />
      </div>
    </>
  );
};

export default ViewTeamPerformanceList;
