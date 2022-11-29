import React from "react";
import styled from "styled-components";

function App() {
  const metamaskConnection = React.useCallback(async () => {
    if (typeof (window as any).ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      // const ether = (window as any).ethereum;
      // ether.request({ method: "eth_requestAccounts" });
      const ether = (window as any).ethereum;
      // 로그인 코드
      const accounts = await ether.request({ method: "eth_requestAccounts" });
      const account = accounts[0];

      console.log(`accounts : ${accounts}`);
      console.log(`account : ${account}`);
    } else console.log("MetaMask should be installed!");
  }, []);

  return (
    <Wrapper>
      <Title>Metamask</Title>
      <Button onClick={metamaskConnection}>Connect</Button>
    </Wrapper>
  );
}

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
