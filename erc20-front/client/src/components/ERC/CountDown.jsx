import React from "react";
import { Statistic } from "antd";
import styled from "styled-components";

function CountDown() {
  return (
    <StyledCountdown
      title="Pre-Sale Time"
      value={new Date(2022, 11, 7, 17, 0, 0)}
    />
  );
}

const StyledCountdown = styled(Statistic.Countdown)`
  margin: 24px 0;

  * {
    display: flex;
    justify-content: center;
  }

  & > .ant-statistic-title {
    font-size: 18px;
  }

  & > .ant-statistic-content > .ant-statistic-content-value {
    font-size: 48px;
  }
`;

export default CountDown;
