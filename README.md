# CNG-Protect 🛡️
**Hardware-Verified QA Escrow System for High-Stakes CNG Vehicle Retrofits**

### 🎥 👉 [Click Here to Watch the Full Demo Video](https://drive.google.com/drive/folders/1kf4UbxT29cLcafKJFxeKxgcjXUHqatRg) 👈 🎥

![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Node.js%20%7C%20Firebase%20%7C%20Stellar-blue)
![Integration](https://img.shields.io/badge/Integration-Trustless_Work_Escrow-success)
![Hardware](https://img.shields.io/badge/IoT-ESP32%20%2B%20MQ2_Gas_Sensor-orange)

CNG-Protect bridges physical IoT safety sensors with Web3 payments to solve the trust crisis in the B2B logistics sector. We remove human subjectivity from quality assurance by letting hardware metrics dictate the release of milestone-based stablecoin payments.

---

## 🚨 The Trust Problem
Commercial logistics companies want to convert their fleets to Compressed Natural Gas (CNG) to save costs. However:
1. **The Client (Fleet Owner)** fears poor execution resulting in hazardous gas leaks that destroy assets and lives. They hesitate to pay upfront.
2. **The Service Provider (Engineer)** fears performing complex, expensive retrofit work without a guaranteed payout.

## 💡 The Solution: Hardware as the Referee
CNG-Protect acts as an autonomous, trustless arbitrator. Funds are locked in a **Trustless Work** smart escrow. An ESP32 sensor monitors the vehicle's structural safety in real-time. 

* **The Unlock Condition:** If 48 hours pass with zero gas leaks, the Oracle automatically releases the USDC to the engineer.
* **Dispute Resolution:** If the hardware logs a leak ($\ge$ 1100 ppm), the Oracle instantly freezes the contract and triggers an automated refund to the client.

---

## ⚙️ Technical Architecture
The system is divided into three interconnected layers:

1. **Layer 1: IoT Hardware (ESP32)**
   * Sniffs the air using an MQ2 Gas Sensor and monitors engine temperature.
   * Streams telemetry data in real-time to a Firebase Realtime Database.
2. **Layer 2: The Web3 Oracle (Node.js)**
   * Continuously evaluates the safety rules. 
   * Cryptographically signs and triggers the Trustless Work Smart Contract API to route funds based on physical data.
3. **Layer 3: Fleet Dashboard (Next.js)**
   * A visual command center for fleet managers to watch live telemetry and monitor the live on-chain status of their escrowed funds.

---


## 🚀 How to Run Locally

### 1. Prerequisites
* Node.js installed (`v18+`)
* A Firebase Project with Realtime Database enabled
* Trustless Work BackOffice Escrow ID

### 2. Environment Variables (`.env`)
Create a `.env` file in the root directory:

```env
CONTRACT_ID=your_trustless_escrow_id
ORACLE_SECRET_KEY=your_stellar_wallet_secret
TRUSTLESS_API_KEY=your_trustless_api_key
FIREBASE_URL=https://your-project.firebaseio.com
```

Note: Ensure firebase-key.json (Firebase Service Account Key) is placed in the root folder so the backend Oracle can authenticate.
3. Start the Backend Oracle
# In the root directory
```
npm install
node index.js
```

4. Start the Fleet Dashboard
# In a new terminal window
```
cd cng-dashboard1
npm install
npm run dev
Open http://localhost:3000 in your browser to view the live hardware dashboard.
```

## 📂 Repository Structure
```text
/
├── index.js                  # The Node.js Oracle (Referee/Arbitrator Logic)
├── package.json              # Backend dependencies (Firebase-admin, dotenv)
├── README.md                 # Project Documentation
└── /cng-dashboard1           # Next.js Frontend App
    ├── src/app/page.tsx      # Main Fleet Telemetry UI
    └── package.json          # Frontend dependencies (React, Firebase client)

---

    
