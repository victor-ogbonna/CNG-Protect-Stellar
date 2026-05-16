require('dotenv').config(); 
const admin = require("firebase-admin");
const axios = require("axios");

// 1. Pull Credentials from the local .env file
const API_KEY = process.env.API_KEY;
const CONTRACT_ID = process.env.CONTRACT_ID;

// 2. Parse the Firebase JSON Secret
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// 3. Initialize Firebase Connection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cng-protect-default-rtdb.firebaseio.com"
});

const db = admin.database();

// UPDATED: Pointing to "live_data" exactly as it appears in your database!
const sensorRef = db.ref("cng_protect/devices/4C:11:AE:70:0C:18/live_data");

let isEscrowResolved = false;

console.log("🚀 Starting CNG-Protect (patent-pending) Local Oracle...");
console.log("Listening for ESP32 telemetry on Firebase...");

// 4. The Live Listener
sensorRef.on("value", async (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  // UPDATED: Using data.temperature_c to match your database structure
  console.log(`📡 Live Data - Gas: ${data.gas_level} | Temp: ${data.temperature_c}°C | Danger: ${data.is_danger}`);

  if (isEscrowResolved) return;

  // 5. The Decision Engine (Triggers ONLY on real danger anomalies)
  if (data.gas_level >= 1100 || data.is_danger === true) {
    console.log("🔴 DANGER DETECTED! Gas leak or temperature threshold exceeded!");
    console.log("🚨 Releasing emergency stablecoins via Trustless Work...");
    isEscrowResolved = true;

    try {
      const response = await axios.post(
        'https://dev.api.trustlesswork.com/v1/escrow/release', 
        { 
          contractId: CONTRACT_ID,
          secretKey: process.env.WALLET_SECRET_KEY 
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("✅ Trustless Escrow API Success:", response.data);
    } catch (error) {
      console.log("❌ API Error:", error.response ? error.response.data : error.message);
      console.log("💡 Tip: If 404 persists, use the dashboard manual button for the live demo!");
    }
  } 
  else {
    console.log("✅ Safety Verified! System monitoring normally...");
  }
});
