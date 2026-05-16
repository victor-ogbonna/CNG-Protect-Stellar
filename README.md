# CNG-Protect 🛡️
### Hardware-Verified QA Escrow System for CNG Vehicle Retrofits

CNG-Protect bridges physical IoT safety sensors with Web3 Trustless Escrow payments to solve the trust crisis between vehicle owners and engineers during high-stakes fuel system conversions.

## 🚀 The Trust Problem
Commercial fleet owners want to convert vehicles to CNG to save costs, but fear hazardous gas leaks and hesitate to pay upfront. Engineers fear performing complex retrofits without guaranteed payment. 

**Solution:** We remove human subjectivity by letting IoT hardware dictate the payment.

## ⚙️ Technical Architecture
1. **IoT Sniffing Array (ESP32):** Real-time monitoring of gas (MQ2) and engine temperature. Streams live data to Firebase.
2. **Reactive Backend Oracle (Node.js):** Evaluates safety variables in real-time. If zero leaks occur during the probation period, it releases funds. If a leak is detected, it freezes the smart contract.
3. **Trustless Escrow:** Smart contracts built on Stellar that lock USDC capital.
4. **Fleet Dashboard (Next.js):** Real-time telemetry command center for fleet managers.

## 📊 The Smart Escrow Logic Flow
1. **Deposit:** Client locks 50 USDC in a Trustless Work Escrow.
2. **Monitor:** ESP32 streams data during the probationary period.
3. **Resolve:** 
   * **Success Path (<1100ppm):** Oracle releases funds directly to the Engineer.
   * **Failure Path (>=1100ppm):** Oracle triggers an automated refund to the Client.

## 📁 Key Files in this Repository
* `/index.js` - The Backend Oracle script.
* `/cng-dashboard1/src/app/page.tsx` - The Fleet Telemetry Dashboard UI.
