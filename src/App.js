import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { useWallet, UseWalletProvider } from "use-wallet";
import { Modal } from 'react-bootstrap';
import { STAKE_ABI, STAKE_ADDRESS } from "./config";
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

function App() {

  const wallet = useWallet();
  const { current: web3 } = useRef(new Web3(window.ethereum));
  const stakeContract = new web3.eth.Contract(STAKE_ABI, STAKE_ADDRESS);

  const INITIAL_STATE = {
    showHideWalletModal: false,
    walletAddress: null,
    intValue: 0,
    stringValue: ""
  }
  const [demoState, setDemoState] = useState(INITIAL_STATE);

  var previousState = usePrevious({ status: wallet.status, account: wallet.account });

  useEffect(() => {
    if (previousState?.status !== wallet.status || previousState.account !== wallet.account) {
      setDemoState({ ...demoState, walletAddress: wallet.account });
      if (wallet.account !== null)
        getValues();
    }
  }, [wallet.status, wallet.account]);

  const closeWalletModal = () => {
    setDemoState({ ...demoState, showHideWalletModal: false });
  }

  const onConnectClick = () => {
    setDemoState({ ...demoState, showHideWalletModal: true });
  }

  const onWalletConnectClick = (walletType) => {
    if (walletType === 'walletconnect') {
      wallet.connect("walletconnect");
    } else {
      wallet.connect();
    }
    closeWalletModal();
  }

  const onDisconnect = () => {
    if (window.confirm("Are you sure, you want to disconnect?")) {
      wallet.reset();
      setDemoState(INITIAL_STATE);
    }
  }

  const getValues = () => {
    if (demoState.walletAddress === null) return;
    try {
      stakeContract.methods.getValues().call()
        .then((res) => {
          console.log(res);
          if (Object.keys(res).length > 0) {
            setDemoState({
              ...demoState,
              intValue: Number(res._intValue),
              stringValue: res._stringValue
            });
          }
        }).catch((error) => {
          console.log("Error in GetValues : ", error);
        });
    }
    catch (error) {
      console.log("Error in calling stakecontract method : ", error);
    }
  }

  const updateIntegerValue = () => {
    if (demoState.walletAddress === null) return;

    try {
      stakeContract.methods.setIntValue(STAKE_ADDRESS).send({ from: demoState.walletAddress })
        .then((res) => {
          console.log(res);

        }).catch((error) => {
          alert(error.message);
          console.log("Error in setIntValue : ", error);
        });
    }
    catch (error) {
      console.log("Error in calling updateIntegerValue method : ", error);
    }
  }

  const updateStringValue = () => {
    if (demoState.walletAddress === null) return;

    try {
      stakeContract.methods.setStringValue(STAKE_ADDRESS).send({ from: demoState.walletAddress })
        .then((res) => {
          console.log(res);

        }).catch((error) => {
          alert(error.message);
          console.log("Error in setStringValue : ", error);
        });
    }
    catch (error) {
      console.log("Error in calling updateStringValue method : ", error);
    }
  }

  return (
    <>
      <Modal
        show={demoState.showHideWalletModal}
        onHide={closeWalletModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Connect:&nbsp;
              <button className="btn btn-primary btn-round" onClick={() => onWalletConnectClick('meta')}>MetaMask</button> &nbsp;
              <button type="button" className="btn btn-primary btn-round" onClick={() => onWalletConnectClick("walletconnect")}>Walletconnect</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary btn-round" onClick={closeWalletModal}>Close</button>
        </Modal.Footer>
      </Modal>
      <div className="App">
        <div style={{ display: "unset" }}>
          <span className="">Integer Value : <h1 className="">{demoState.intValue}</h1></span>
          <span className="">String Value :  <h1 className="">{demoState.stringValue}</h1></span>

          {demoState.walletAddress ? <p>Wallet Address : <b>{demoState.walletAddress}</b></p> : null}
          {wallet.status !== "connected" ?
            <button className="btn btn-primary btn-round" onClick={onConnectClick} style={{ marginTop: '50px', marginLeft: '62px' }}>Connect</button>
            : null
          }
          {wallet.status === "connected" ?
            <button className="btn btn-danger btn-round" style={{ marginTop: '50px', marginLeft: '62px' }} onClick={onDisconnect} role="button">Disconnect</button>
            : null
          }
          <button className="btn btn-primary btn-round" style={{ marginTop: '50px', marginLeft: '62px' }} onClick={updateIntegerValue} role="button">Update Integer Value</button>
          <button className="btn btn-primary btn-round" style={{ marginTop: '50px', marginLeft: '62px' }} onClick={updateStringValue} role="button">Update String Value</button>
        </div>
      </div>
    </>
  );
}

export default () => (
  <UseWalletProvider
    chainId={3}
    connectors={{
      // This is how connectors get configured
      walletconnect: {
        rpcUrl: "https://mainnet.infura.io/v3/1e445918e4e145b39d31491af93151d9",
      }
    }}
  >
    <App />
  </UseWalletProvider>
);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
