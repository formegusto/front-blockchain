import React from "react";
import styled from "styled-components";
import Web3 from "web3";
import Simple from "./abi/Simple.json";

function App() {
  const [web3, setWeb3] = React.useState<Web3>();
  const [return5Value, setReturn5Value] = React.useState<number>(0);

  const metamaskConnection = React.useCallback(async () => {
    if (typeof (window as any).ethereum) {
      console.log("MetaMask is installed!");

      // const ether = (window as any).ethereum;
      // ether.request({ method: "eth_requestAccounts" });

      const ether = (window as any).ethereum;
      const web3 = new Web3(ether);
      setWeb3(web3);

      try {
        await ether.request({ method: "eth_requestAccounts" });
      } catch (err) {
        console.error(`Error: ${err}`);
      }

      // 로그인 코드
      // const accounts = await ether.request({ method: "eth_requestAccounts" });
      // const account = accounts[0];

      // console.log(`accounts : ${accounts}`);
      // console.log(`account : ${account}`);
    } else if ((window as any).web3) {
      const web3 = new Web3((window as any).web3.currentProvider);
      setWeb3(web3);
      // 구 버전 메타마스크는 web3를 window에 담아서 주었다.
    } else console.log("MetaMask should be installed!");
  }, []);

  const showReturn5 = React.useCallback(async () => {
    if (web3) {
      const networkId = await web3!.eth.net.getId();
      console.log(networkId);

      const SimpleAddress = (Simple as any).networks[networkId].address;
      let simpleContract = new web3!.eth.Contract(
        (Simple as any).abi,
        SimpleAddress
      );

      // call은 넘길 값이 없고, 받기만 할 때에 사용한다. (매개변수 X)
      // 가스비가 들지 않는다.
      const value = await simpleContract.methods.return5().call();
      setReturn5Value(value);
    }
  }, [web3]);

  return (
    <Wrapper>
      <Title>Metamask</Title>
      <Title>${return5Value}</Title>
      <ButtonGroup>
        <Button onClick={metamaskConnection}>Connect</Button>
        <Button onClick={showReturn5}>return55 Call</Button>
      </ButtonGroup>
    </Wrapper>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  column-gap: 8px;
`;

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;

  display: flex;
  flex-direction: column;

  align-items: center;
  row-gap: 16px;
`;

const Button = styled.button`
  width: 125px;
  height: 48px;

  background: transparent;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default App;
