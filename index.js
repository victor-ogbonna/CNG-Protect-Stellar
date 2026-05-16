require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

const db = admin.database();
const ref = db.ref('cng_protect/devices/4C:11:AE:70:0C:18/live_data');
const CONTRACT_ID = process.env.CONTRACT_ID;

let isEscrowActive = true;

console.log("🛡️ Real Hardware Oracle Started.");
console.log(`🔗 Watching Escrow Contract: ${CONTRACT_ID}`);
console.log("⏳ Simulating 48-Hour Probation (Fast-forwarded to 30 seconds for Demo)...");

// Reset the database status when the Oracle starts
db.ref('escrow/status').set({ isActive: true, result: "" });

// 1. Listen for Leaks (Failure Path)
ref.on('value', (snapshot) => {
    if (!isEscrowActive) return;
    const data = snapshot.val();
    if (!data) return;

    console.log(`📡 LIVE ESP32 DATA -> Gas: ${data.gas_level} ppm | Temp: ${data.temperature_c}°C`);

    if (data.gas_level >= 1100 || data.is_danger === true) {
        console.log("\n🚨 QA VIOLATION: CRITICAL GAS LEAK DETECTED!");
        isEscrowActive = false;
        console.log(`🔒 Oracle API Call: Refunding Client for Escrow ${CONTRACT_ID}`);
        db.ref('escrow/status').set({ isActive: false, result: "REFUND" });
    }
});

// 2. The 30-Second Timer (Success Path)
setTimeout(() => {
    if (isEscrowActive) {
        isEscrowActive = false;
        console.log("\n✅ 48 HOURS PASSED WITH ZERO LEAKS!");
        console.log(`💸 Oracle API Call: Releasing 50 USDC to Engineer's Wallet for Escrow ${CONTRACT_ID}`);
        db.ref('escrow/status').set({ isActive: false, result: "PAID" });
    }
}, 30000); // 30,000 milliseconds = 30 seconds
