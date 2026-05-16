# CNG-Protect 🛡️
### IoT Safety Telemetry & Automated Web3 Smart Contract Escrow Release System

CNG-Protect is an advanced, industrial-grade mechatronic safety platform designed by **Ogbontor Engineering Enterprise** to monitor and mitigate catastrophic fuel line failures in Compressed Natural Gas (CNG) retrofitted vehicles across Africa. 

By marrying high-fidelity hardware sensor arrays with automated Web3 smart contracts via the Stellar blockchain framework, CNG-Protect dramatically accelerates emergency response, turning traditional multi-week insurance claim bureaucracies into a **5-second automated financial resolution pipeline**.

---

## 🚀 Key Core Innovations
* **Real-Time IoT Sniffing Array:** Monitored via an ESP32 micro-controller processing active gas concentrations (via MQ2) and structural temperatures.
* **Reactive Local Oracle Engine:** A continuous Node.js engine acting as a decentralized bridge, evaluating Firebase database variables every 2000ms.
* **Trustless Escrow Payouts:** Smart contracts deployed on-chain that securely lock emergency repair capital (USDC) and instantly release payouts autonomously the moment a critical hazard occurs.
* **Responsive Command Dashboard:** A clean Next.js/Turbopack control dashboard engineered for fleet managers to visually track live vehicle parameter baselines.

---

## 📊 System Architecture Flow

1. **Hardware Collection:** ESP32 captures telemetry ➡️ updates remote Firebase Realtime Database.
2. **Oracle Observation:** Node.js server reads the data stream ➡️ checks against strict parameters.
3. **Threshold Breached:** If gas metrics cross `1100 ppm`, safety protocols trigger.
4. **On-Chain Settlement:** Oracle securely coordinates with Trustless Work smart contracts via REST APIs to release locked USDC directly to the operator's digital wallet.

---

## 🛠️ Repository File Structure

This repository contains both crucial segments of the local system operational stack:

* `/index.js` — The Core Node.js Local Oracle script executing active Firebase event listeners and managing Web3 transaction dispatches.
* `/cng-frontend/` — The Next.js dashboard app presenting real-time sensor streams and interactive visual escrow controls for demo deployment.

---

## 💻 Local Installation & Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Backend Oracle Configuration
Clone the repository and install dependencies inside the root directory:
```bash
npm install dotenv firebase-admin axios
```

Create a secure `.env` file in the root folder:
```env
API_KEY="your_trustless_work_api_key"
CONTRACT_ID="your_deployed_escrow_contract_id"
WALLET_SECRET_KEY="your_stellar_private_key"
FIREBASE_CREDENTIALS='{"your": "firebase_json_service_account_credentials"}'
```

Run the local oracle connection:
```bash
node index.js
```

### 3. Frontend Dashboard Configuration
Navigate to the frontend workspace folder:
```bash
cd cng-frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to observe live synchronization.
