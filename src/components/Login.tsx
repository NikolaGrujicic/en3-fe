import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
const Login = () => {
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState('Sign this message to log in.');
  const [signature, setSignature] = useState(null);
  const getNonce = async () => {
    const nonceData = await axios({
        method: "POST",
        data: {
          address: account,
        },
        withCredentials: true,
        url: "http://localhost:3000/nonce",
    });
    return nonceData;
  }
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('MetaMask is not installed');
    }
  };


  const signMessage = async () => {
    if (!account) return;
    try {
      const nonce = (await getNonce()).data.nonce;
      setMessage(nonce);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(nonce);
      setSignature(signature);
      const response = await axios.post('http://localhost:3000/auth', {
        address: account,
        message: nonce,
        signature,
      });
      console.log('JWT Token:', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask</button>
      {account && <div>Account: {account}</div>}
      <button onClick={signMessage} disabled={!message}>Sign Message</button>
    </div>
  );
};

export default Login;
