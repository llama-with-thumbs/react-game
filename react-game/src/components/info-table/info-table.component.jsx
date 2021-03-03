import React from "react";
import StopwatchWrapper from "../stopwatch-wrapper/stopwatch-wrapper.component";

import "./info-table.styles.scss";

const InfoTable = (props) => (
  <div className="info-table">
    <div className="info-table__first-line">
      <StopwatchWrapper {...props} />
    </div>
    <hr className="line-seporator" />
  </div>
);

export default InfoTable;
