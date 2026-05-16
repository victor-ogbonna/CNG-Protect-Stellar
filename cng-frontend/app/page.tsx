"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [escrowStatus, setEscrowStatus] = useState("Inactive");
  const [contractId, setContractId] = useState("");
  const [txHash, setTxHash] = useState("");
  
  // Live Data States
  const [gasLevel, setGasLevel] = useState("Loading...");
  const [temperature, setTemperature] = useState("Loading...");
  const [isDanger, setIsDanger] = useState(false);

  // 1. Fetch authentic live data from your ESP32 via Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://cng-protect-default-rtdb.firebaseio.com/cng_protect/devices/4C:11:AE:70:0C:18/live_data.json");
        const data = await res.json();
        if (data) {
          setGasLevel(`${data.gas_level} ppm`);
          setTemperature(`${data.temperature_c}°C`);
          // Triggers danger state at 1100 ppm
          setIsDanger(data.gas_level >= 1100 || data.is_danger);
        }
      } catch (error) {
        console.error("Error fetching live data", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // 2. The Auto-Release Trigger (The UX Magic)
  useEffect(() => {
    // Only trigger if danger is detected AND the escrow was armed
    if (isDanger && escrowStatus === "Active - 1 USDC Locked") {
      setEscrowStatus("🚨 Oracle Triggered - Releasing Funds...");
      
      // Simulate a 5-second blockchain confirmation delay
      setTimeout(() => {
        setEscrowStatus("✅ Transaction Confirmed - 1 USDC Payout");
        setTxHash("0x8fB2a9e3...d9A1 (View on Explorer)");
      }, 5000);
    }
  }, [isDanger, escrowStatus]);

  const handleDeposit = () => {
    setEscrowStatus("Processing...");
    setTimeout(() => {
      setEscrowStatus("Active - 1 USDC Locked");
      setContractId("CAW4UKB4QVZL5U3P4WIIFJODCKV6WRKO6WFBEUCLTDOBJTBZ5COEBQZE"); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-8">
      <header className="border-b border-yellow-500/30 pb-6 mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">Ogbontor Engineering Enterprise</h1>
          <p className="text-sm text-slate-400 mt-1">Innovative IoT Solutions</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider border ${isDanger ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
            {isDanger ? 'SYSTEM DANGER' : 'SYSTEM ONLINE'}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Sensor Panel */}
        <div className={`rounded-xl p-6 border shadow-xl shadow-black/50 transition-colors duration-500 ${isDanger ? 'bg-red-900/20 border-red-500/50' : 'bg-slate-800 border-slate-700'}`}>
          <h2 className="text-xl font-semibold text-white mb-4">
            CNG-Protect <span className="text-xs text-slate-400 font-normal ml-2">(patent-pending)</span>
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg">
              <span className="text-slate-400">Live Gas Level</span>
              <span className={`font-mono text-lg ${isDanger ? 'text-red-400 font-bold animate-pulse' : 'text-emerald-400'}`}>
                {gasLevel}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg">
              <span className="text-slate-400">Temperature</span>
              <span className="text-emerald-400 font-mono text-lg">{temperature}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg">
              <span className="text-slate-400">Network</span>
              <span className="text-blue-400 font-mono text-sm border border-blue-400/30 px-2 rounded">
                Firebase Sync Active
              </span>
            </div>
          </div>
        </div>

        {/* Escrow Panel */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl shadow-black/50 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Trustless Escrow Controls</h2>
            <p className="text-sm text-slate-400 mb-6">
              Initialize the safety contract. Funds will be automatically released if CNG-Protect detects hazardous conditions.
            </p>
            
            <div className={`bg-slate-900 p-4 rounded-lg mb-6 border transition-colors duration-500 ${escrowStatus.includes('Confirmed') ? 'border-emerald-500/50 bg-emerald-900/10' : escrowStatus.includes('🚨') ? 'border-red-500/50 bg-red-900/10 animate-pulse' : 'border-slate-800'}`}>
              <p className="text-sm text-slate-400 mb-1">Contract Status</p>
              <p className={`font-mono text-lg ${
                escrowStatus.includes('Confirmed') ? 'text-emerald-400 font-bold' :
                escrowStatus.includes('🚨') ? 'text-red-400 font-bold' :
                escrowStatus.includes('Active') ? 'text-yellow-500' : 'text-slate-300'
              }`}>
                {escrowStatus}
              </p>
              {contractId && !txHash && (
                <p className="text-xs text-slate-500 mt-2 font-mono break-all transition-opacity">ID: {contractId}</p>
              )}
              {txHash && (
                <p className="text-xs text-emerald-500 mt-2 font-mono break-all cursor-pointer hover:underline transition-opacity">Tx: {txHash}</p>
              )}
            </div>
          </div>

          <button 
            onClick={handleDeposit}
            disabled={escrowStatus !== "Inactive"}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
          >
            {escrowStatus === "Inactive" ? "Deposit 1 USDC to Escrow" : "Contract Deployed"}
          </button>
        </div>
      </main>
    </div>
  );
}
