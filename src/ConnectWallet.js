import React, { useState, useEffect } from 'react';
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectPhantom = async () => {
    if ('solana' in window) {
      const provider = window.solana;

      if (provider.isPhantom) {
        try {
          const res = await provider.connect();
          const pubKey = res.publicKey.toString();
          console.log("Connected Wallet:", pubKey);
          setWalletAddress(pubKey);
        } catch (err) {
          console.log("User closed Phantom");
        }
      }
    } else {
      alert("Please install Phantom Wallet");
    }
  };

  useEffect(() => {
    const getWalletBalance = async () => {
      if (walletAddress) {
        const connection = new Connection(clusterApiUrl("devnet"));
        const balanceLamports = await connection.getBalance(new PublicKey(walletAddress));
        setBalance(balanceLamports / 1e9); // convert lamports to SOL
      }
    };

    getWalletBalance();
  }, [walletAddress]);

  return (
    <div className="text-center my-4">
      {!walletAddress ? (
        <button
          onClick={connectPhantom}
          className="bg-purple-700 text-white px-6 py-2 rounded-md"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="text-green-500 mb-2">Wallet Connected: {walletAddress}</p>
          <p className="text-white">Balance: {balance} SOL</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
