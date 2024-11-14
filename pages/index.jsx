import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useAccount } from "wagmi";

// Contract details
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const CONTRACT_ABI = [
  // Your contract's ABI array here
];

export default function Home() {
  const { address } = useAccount();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Initialize web3 and contract on component load
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      setContract(contractInstance);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  // Deposit function
  const handleDeposit = async () => {
    if (contract && depositAmount) {
      try {
        await contract.methods.deposit(web3.utils.toWei(depositAmount, "ether")).send({ from: address });
        alert("Deposit successful!");
      } catch (error) {
        console.error("Deposit error:", error);
        alert("Error during deposit");
      }
    }
  };

  // Withdraw function
  const handleWithdraw = async () => {
    if (contract && withdrawAmount) {
      try {
        await contract.methods.withdraw(web3.utils.toWei(withdrawAmount, "ether")).send({ from: address });
        alert("Withdraw successful!");
      } catch (error) {
        console.error("Withdraw error:", error);
        alert("Error during withdraw");
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Wrapped Token Interaction</h1>
        
        <div>
          <h3>Deposit</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Amount to deposit"
          />
          <button onClick={handleDeposit}>Deposit</button>
        </div>

        <div>
          <h3>Withdraw</h3>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Amount to withdraw"
          />
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      </main>
    </div>
  );
}