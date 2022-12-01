import React from "react";
import styled from "styled-components";
import { useEth } from "../../contexts/EthContext";
import Erc20Token from "../../contracts/Erc20Token.json";

function ERC20() {
  const [inputState, setInputState] = React.useState({});
  const [account, setAccount] = React.useState();
  const [balance, setBalanace] = React.useState(0);
  const [transferEvent, setTransferEvent] = React.useState();
  const [ins, setIns] = React.useState();
  const {
    state: { web3, accounts },
  } = useEth();

  const setContract = React.useCallback(async () => {
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const information = Erc20Token.networks[networkId];
    const instance = new web3.eth.Contract(
      Erc20Token.abi,
      information && information.address
    );
    setIns(instance);
    const balance = await instance.methods.balanceOf(accounts[0]).call();
    console.log(balance);
    setBalanace(balance);
  }, [web3, accounts]);

  React.useEffect(() => {
    setContract();
  }, [setContract]);

  React.useEffect(() => {
    console.log(account);
  }, [account]);

  const onChange = React.useCallback((e) => {
    setInputState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onTransfer = React.useCallback(
    async (e) => {
      e.preventDefault();

      await ins.methods
        .transfer(inputState.to, inputState.amount)
        .send({ from: account });

      const balance = await ins.methods.balanceOf(account).call();
      setBalanace(balance);
    },
    [inputState, account, ins]
  );

  React.useEffect(() => {
    console.log(inputState);
  }, [inputState]);

  const getEvent = React.useCallback(async () => {
    if (ins) {
      const information = await ins.getPastEvents("Transfer", {
        filter: { from: account },
        fromBlock: 0,
        toBlock: "latest",
      });
      console.log(information);
      setTransferEvent(information.map((i) => i.returnValues));
    }
  }, [ins, account]);

  React.useEffect(() => {
    getEvent();
  }, [balance, getEvent]);

  React.useEffect(() => {
    console.log(transferEvent);
  }, []);

  return (
    <Wrap>
      <h1>ERC20</h1>
      <Content>
        {!account ? (
          <h2>please login</h2>
        ) : (
          <>
            <h2>👋🏻 Welcome {account}</h2>
            <h3>Your Balance : {balance}</h3>
          </>
        )}
        <ul>
          {transferEvent &&
            transferEvent.map((t, i) => <li key={i}>{t.value}</li>)}
        </ul>
        <Form onSubmit={onTransfer}>
          <h5>Address</h5>
          <input
            name="to"
            placeholder="to address"
            value={inputState.to}
            onChange={onChange}
          />
          <h5>Amount</h5>
          <input
            name="amount"
            placeholder="amount"
            value={inputState.amount}
            onChange={onChange}
          />
          <button type="submit">transfer</button>
        </Form>
      </Content>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Content = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  row-gap: 8px;

  margin: 24px 0 0;
`;

export default ERC20;
