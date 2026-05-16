'use client';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AI*****4",
  databaseURL: "https://cng****-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Dashboard() {
  const [data, setData] = useState({ gas_level: 0, temperature_c: 0, is_danger: false });
  const [escrowState, setEscrowState] = useState({ isActive: true, result: "" });

  useEffect(() => {
    // Listen to hardware
    const sensorRef = ref(db, 'cng_protect/devices/4C:11:AE:70:0C:18/live_data');
    onValue(sensorRef, (snapshot) => {
      if (snapshot.val()) setData(snapshot.val());
    });

    // Listen to Oracle decisions
    const escrowRef = ref(db, 'escrow/status');
    onValue(escrowRef, (snapshot) => {
      if (snapshot.val()) setEscrowState(snapshot.val());
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">CNG-Protect <span className="text-blue-500">🛡️</span></h1>
          <a href="https://viewer.trustlesswork.com/CCCNC2L2YYS6XXPG6ITEBAH254ROXTHFYA7WLZMBFTF2U76UXEHSXPUS" target="_blank" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition">
            View Trustless Escrow
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className={`p-8 rounded-xl border-2 ${escrowState.result === "REFUND" || data.gas_level >= 1100 ? 'bg-red-900/20 border-red-500' : 'bg-slate-800 border-slate-700'}`}>
            <h2 className="text-xl text-slate-400 mb-2">Live Gas Level (MQ2)</h2>
            <p className={`text-6xl font-bold ${escrowState.result === "REFUND" || data.gas_level >= 1100 ? 'text-red-500' : 'text-emerald-400'}`}>
              {data.gas_level} <span className="text-2xl">ppm</span>
            </p>
            {(escrowState.result === "REFUND" || data.gas_level >= 1100) && <p className="text-red-400 mt-4 animate-pulse">⚠️ CRITICAL LEAK DETECTED</p>}
          </div>

          <div className="p-8 rounded-xl bg-slate-800 border-2 border-slate-700">
            <h2 className="text-xl text-slate-400 mb-2">Engine Temp</h2>
            <p className="text-6xl font-bold text-orange-400">{data.temperature_c} <span className="text-2xl">°C</span></p>
          </div>
        </div>

        <div className={`mt-6 p-8 rounded-xl border-2 ${escrowState.result === "PAID" ? 'border-emerald-500 bg-emerald-900/20' : escrowState.result === "REFUND" ? 'border-red-500 bg-red-900/20' : 'border-blue-900/50 bg-blue-900/10'}`}>
          <h2 className="text-xl text-slate-300 mb-2">Trustless Work Smart Escrow</h2>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-mono">Status: <span className={escrowState.result === "PAID" ? "text-emerald-400 font-bold" : escrowState.result === "REFUND" ? "text-red-500 font-bold" : "text-blue-400 font-bold"}>
              {escrowState.isActive ? "Monitoring (48h Probation)" : escrowState.result === "REFUND" ? "FUNDS FROZEN - CLIENT REFUNDED" : "✅ FUNDS RELEASED TO ENGINEER"}
            </span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
