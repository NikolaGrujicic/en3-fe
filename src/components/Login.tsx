import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { abi } from '../consts/sc-abi';
import { bytecode } from '../consts/bytecode';
const Login = () => {
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState('Sign this message to log in.');
  const [contractAddress, setContractAddress] = useState('');
  const [deploying, setDeploying] = useState(false);

  const [signature, setSignature] = useState(null);
  const [messageSigned, setMessageSigned] = useState<boolean>(false);

  const sessionToken = localStorage.getItem("session-token");

  const getNonce = async () => {
    const nonceData = await axios({
      method: "POST",
      data: {
        address: account,
      },
      withCredentials: true,
      url: `${import.meta.env.VITE_API_URL}/nonce`,
    });
    return nonceData;
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  const signMessage = async () => {
    if (!account) return;
    try {
      const nonce = (await getNonce()).data.nonce;
      setMessage(nonce);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature: any = await signer.signMessage(nonce);
      setSignature(signature);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth`,
        {
          address: account,
          message: nonce,
          signature,
        }
      );
      console.log("JWT Token:", response.data.token);
      localStorage.setItem("session-token", response.data.token);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(sessionToken);


  const deployContract = async () => {
    try {
      setDeploying(true);

      // Connect to MetaMask
      if (!window.ethereum) throw new Error('MetaMask not installed');
      await window.ethereum.enable();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract instance
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy();
      // Wait for contract to be deployed
      const status = await contract.waitForDeployment();
      console.log('contract addresss', contract.target);
      setContractAddress(contract.target);
      setTimeout(async () => {
        const contractInstance = new ethers.Contract(contract.target, abi, signer);
        const cost = ethers.parseUnits('0.01', 'ether');
        const result = await contractInstance.createNFTCollection("ayy lmao", "LMAO", "ipfs://QmPPWbX4H9xUcJWnNzKpV1Br5F4DLuv1bDmTQNZy2X5bUE/", 5, cost, "0x142f9DE19A405a1E8B6b71811414110b33998b88", 50);
        console.log('result', result);
        
        // POST  /create-event
        // Needs header: authentication: JWT 
        /*{
          description, 
          contractAddr
          name, 
          startDate, 
          endDate, 
          location, 
          capacity,
          price,
          donationAddr,
          donatationPercentage,
          image
        }*/
        
        
        /*setTimeout(async () => {
          const result = await contractInstance.mintNFT(ethers.toBigInt(0), {value: ethers.parseEther('0.01')});
          console.log('attytytttsadtytydastytydstysdaty', result);
          
        }, 10000);*/
      }, 20000)

    } catch (error) {
      console.error('Error deploying contract:', error);
    } finally {
      setDeploying(false);
    }
  };


  return (
    <div>
      <button onClick={connectWallet}>Connect MetaMask</button>
      {account && <div>Account: {account}</div>}
      {!messageSigned && (
        <button onClick={signMessage} disabled={!message}>
          Sign Message
        </button>
      )}
    </div>
  );
};

export default Login;
