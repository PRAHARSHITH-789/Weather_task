import { useEffect, useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

const RECIPIENT_WALLET = "YourWalletPublicKey"; // <-- your Solana wallet public key
const NETWORK = "https://api.mainnet-beta.solana.com"; 

export default function RecruiterFormWithPayment() {
  const [wallet, setWallet] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

 
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      const resp = await window.solana.connect();
      setWallet(resp.publicKey.toString());
      setWalletConnected(true);
    } else {
      alert("Phantom Wallet not found. Install it from https://phantom.app/");
    }
  };

  // Handle SOL payment
  const handlePayment = async () => {
    try {
      const provider = window.solana;
      const connection = new Connection(NETWORK);
      const lamports = 0.01 * LAMPORTS_PER_SOL; // 0.01 SOL (for example)

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: new PublicKey(RECIPIENT_WALLET),
          lamports,
        })
      );

      transaction.feePayer = provider.publicKey;
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;

      const signed = await provider.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      alert("Payment successful! Transaction ID: " + signature);
      setHasPaid(true);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed.");
    }
  };

  return (
    <div className="container py-5">
      {!walletConnected ? (
        <button onClick={connectWallet} className="btn btn-primary">
          Connect Phantom Wallet
        </button>
      ) : !hasPaid ? (
        <button onClick={handlePayment} className="btn btn-warning">
          Pay 0.01 SOL to Post a Job
        </button>
      ) : (
        <form>{/* 🔓 Unlock recruiter job post form here */}</form>
      )}
    </div>
  );
}
