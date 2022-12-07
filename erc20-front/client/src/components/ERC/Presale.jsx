import React from "react";
import { Statistic } from "antd";
import styled from "styled-components";
import Erc20Token from "../../contracts/Erc20Token.json";
import Sale from "../../contracts/Sale.json";

function CountDown({ web3, account }) {
  const [ercIns, setErcIns] = React.useState();
  const [saleIns, setSaleIns] = React.useState();

  const setUp = React.useCallback(async () => {
    if (web3) {
      const networkId = await web3.eth.net.getId();
      let information = Erc20Token.networks[networkId];
      let instance = new web3.eth.Contract(
        Erc20Token.abi,
        information && information.address
      );
      setErcIns(instance);

      information = Sale.networks[networkId];
      instance = new web3.eth.Contract(
        Sale.abi,
        information && information.address
      );
      setSaleIns(instance);
    }
  }, [web3]);

  const buy = React.useCallback(async () => {
    if (web3 && account && saleIns) {
      console.log(`${account} send transaction run`);
      saleIns.methods
        .buyTokens(account)
        .send({ from: account, value: web3.utils.toWei("1", "ether") });
      // await web3.eth.sendTransaction({
      //   from: account,
      //   to: "0x4c588DA44f2BC268AaC838115EDa2b87974C87f4",
      //   value: web3.utils.toWei("1", "ether"),
      // });
    }
  }, [saleIns, account, web3]);

  React.useEffect(() => {
    setUp();
  }, [setUp]);

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
