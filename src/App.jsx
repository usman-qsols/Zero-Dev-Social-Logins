import logo from "./logo.svg";
import "./App.css";
import { ConnectKitButton } from "connectkit";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { polygonMumbai } from "viem/chains";
import { createPublicClient, http } from "viem";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import contractAbi from "./0x34bE7f35132E97915633BC1fc020364EA5134863.json";
import { useEffect, useState, useRef, useCallback } from "react";

import {
  usePrepareContractBatchWrite,
  useContractBatchWrite,
} from "@zerodev/wagmi";
function App() {
  const [nftBalance, setNftBalance] = useState(0);
  const [changeBalance, setChangeBalance] = useState(false);
  const [balanceChanging, setBalanceChanging] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  // const client = createPublicClient({
  //   chain: polygonMumbai,
  //   transport: http(),
  // });
  const nftAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
  // console.log("address", address);

  useEffect(() => {
    localStorage.setItem("Address", address);
  });

  const Address = localStorage.getItem("Address");

  const { config } = usePrepareContractWrite({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "mint",
    args: [address],
  });

  const { write: mint, isSuccess } = useContractWrite(config);

  // const fetchData = () => {
  //   try {
  //     console.log("Callingg.....");
  //     const { data: balance } = client.readContract({
  //       address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
  //       abi: contractAbi,
  //       functionName: "balanceOf",
  //       args: [address],
  //     });
  //     setNftBalance(balance);
  //     console.log("balance", balance);
  //     setChangeBalance(false);
  //     console.log("called");
  //   } catch (error) {
  //     console.log("Error in getting balance", error);
  //   }
  // };

  const { data: balance = 0, refetch } = useContractRead({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });

  console.log("Balance", balance);

  const { config: batchConfig } = usePrepareContractBatchWrite({
    calls: [
      {
        address: nftAddress,
        abi: contractAbi,
        functionName: "mint",
        args: [address ?? "0x6E3F3402EA47Fbbe4DD65ae88A6Af90F17a7B57A"],
      },
      {
        address: nftAddress,
        abi: contractAbi,
        functionName: "mint",
        args: [address ?? "0x6E3F3402EA47Fbbe4DD65ae88A6Af90F17a7B57A"],
      },
    ],
    enabled: true,
  });

  const {
    sendUserOperation: batchMint,
    data: batchData,
    isLoading,
  } = useContractBatchWrite(batchConfig);

  useWaitForTransaction({
    hash: batchData?.hash,
    enabled: !!batchData,
    onSuccess() {
      alert("Batch Mint successful");
    },
  });

  useEffect(() => {
    console.log("Fetching data");
    isConnected && refetch();
    setNftBalance(balance.toString());
  });

  const handleMint = () => {
    try {
      mint();
      setInterval(() => {
        console.log("Time completed");
        setChangeBalance(true);
      }, 10000);
    } catch (error) {}
  };

  const interval = useRef();
  const handleBatchMint = () => {
    console.log("Use prepare contract write");
    // if (!batchData) {
    //   return;
    // }
    try {
      batchMint();
      setInterval(() => {
        console.log("Time completed");
        setChangeBalance(true);
      }, 10000);
    } catch (error) {}
  };

  // const handleBatchClick = useCallback(() => {
  //   if (handleBatchMint) {
  //     handleBatchMint();
  //   }
  // }, [handleBatchMint]);

  return (
    <div className="App">
      <div>
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="cont">
          <h1 className="balanceCount">{nftBalance}</h1>
          <button className="button" onClick={handleMint}>
            Mint Your Nft
          </button>
          <button className="button" onClick={() => handleBatchMint()}>
            {isLoading ? "Batch Minting..." : "Batch Mint"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
