import { useEffect, useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

const recipient = "4h2S6TnNm1JZpZKeYiWpRy23c4rW1Z4ZoJdb3BGJvwGa"; // Your Solana wallet
const network = "https://api.devnet.solana.com"; // or mainnet-beta

export default function PayAndPostJob() {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (window.solana) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
        setWalletAddress(publicKey.toString());
      });
    }
  }, []);

  const connectWallet = async () => {
    const { publicKey } = await window.solana.connect();
    setWalletAddress(publicKey.toString());
  };

  const sendSol = async () => {
    const connection = new Connection(network);
    const fromPubkey = new PublicKey(walletAddress);
    const toPubkey = new PublicKey(recipient);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: 0.01 * LAMPORTS_PER_SOL, // 0.01 SOL
      })
    );

    transaction.feePayer = fromPubkey;
    let { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    const signed = await window.solana.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);

    // Send to backend for verification
    fetch("https://rizeos-backend-pwmw.onrender.com/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txid, from: walletAddress, to: recipient })
    })
      .then(res => res.json())
      .then(data => {
        if (data.verified) {
          alert("Payment successful! You can now post the job.");
          // redirect or show post form
        } else {
          alert("Payment not verified.");
        }
      });
  };

  return (
    <div>
      <h2>Post a Job - Pay First</h2>
      {!walletAddress && <button  className="btn btn-success" onClick={connectWallet}>Connect Phantom</button>}
      {walletAddress && <button  className="btn btn-success" onClick={sendSol}>Pay 0.01 SOL</button>}
    </div> 
  );
}
