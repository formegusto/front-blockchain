import React from "react";
import { Statistic } from "antd";
import styled from "styled-components";

function CountDown({ web3, account }) {
  const buy = React.useCallback(async () => {
    if (web3 && account) {
      console.log(`${account} send transaction run`);
      await web3.eth.sendTransaction({
        from: account,
        to: "0x4c588DA44f2BC268AaC838115EDa2b87974C87f4",
        value: web3.utils.toWei("1", "ether"),
      });
    }
  }, [web3, account]);

  return (
    <>
      <StyledCountdown
        title="Pre-Sale Time"
        value={new Date(2022, 11, 7, 17, 0, 0)}
      />
      <button onClick={buy}>buy for 1eth</button>
    </>
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
