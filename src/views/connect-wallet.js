import React, {useState} from 'react'
import { useContractRead, useAccount } from "wagmi";
import contractABI from '../abis/abi.json'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { ConnectionButton } from '../components/ConnectionButton'
import './connect-wallet.css'

const ConnectWallet = (props) => {

   const { address, isConnected } = useAccount();

   let navigate = useNavigate();
 
   // Alfa Token mainnet address is the contract address here
   const contractAddress = "0x128ad1ad707c3B36e6F2ac9739f9dF7516FdB592";
//ALphawolves NFT ca
   const contractAddress2 = "0xdcd6d4a557ff208f01D4c2b5Bf829078622C37c5";

   const {data: balanceOfCheck} = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address]
  })

const {data: balanceOfCheck2} = useContractRead({
    address: contractAddress2,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address]
  })

  console.log(balanceOfCheck, "the balance");

  //converting hex to normal number // note - .toLocalString("en")
  const hexToDecimal = (hex) => parseInt(hex, 16);
  // const bal = balanceOfCheck
  // console.log(bal)
  const balance = (balanceOfCheck ? hexToDecimal(balanceOfCheck._hex)/1e18 : 0 );
  const balance2 = parseInt(balanceOfCheck2, 16);
  console.log(balance);

  // if user wallet is not connected, this function will be called to the user attention
  const connectWalletError = () => {
    if (!isConnected) {
     toast.warning('Please connect your wallet first to continue!', {
     position: toast.POSITION.TOP_CENTER, 
     theme: "dark",
     draggablePercent: 60,
     autoClose: 5000
     });
   }
  }

  // if user wallet does not have up to 5,000,00 ALFA TOKEN, this function will be called to the user attention
  const enterDapp = () => {
    if (balance >= 200000 || balance2 >= 1) {
     navigate(`/${address}`)
    } else {
     toast.warning('You need to be holding atleast 200,000 (0.2%) $ALFA tokens before you can continue! Proceed by getting $ALFA token', {
     position: toast.POSITION.TOP_CENTER, 
     theme: "dark",
     draggablePercent: 60,
     autoClose: 5000
    });
  }
 }

  return (
    <div className="connect-wallet-container">
      <Helmet>
        <title>whitelist wallet addresses - alfa.society</title>
        <meta property="og:title" content="whitelist wallet addresses - alfa.society" />
      </Helmet>
      <div className="connect-wallet-container1">
        <div className="connect-wallet-container2"></div>
        <div className="connect-wallet-container3">
          <img
            alt="image"
            src="/playground_assets/dappper.svg"
            className="connect-wallet-image"
          />
          <span className="connect-wallet-text"><ConnectionButton></ConnectionButton></span>
          <h1 className="connect-wallet-text1">whitelist wallet address</h1>
          <span className="connect-wallet-text2"></span>
          <span className="connect-wallet-text3">
            You need to be holding atleast 200,000 (0.2%) $ALFA tokens
          </span>
          <a
            href="https://app.uniswap.org/#/swap?outputCurrency=0x128ad1ad707c3B36e6F2ac9739f9dF7516FdB592&amp;chain=mainnet"
            target="_blank"
            rel="noreferrer noopener"
            className="connect-wallet-link"
          >
            Get $ALFA
          </a>
          <button className="connect-wallet-button themebutton button"
          onClick={!isConnected ? connectWalletError : enterDapp}
          >
            enter dapp
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet
