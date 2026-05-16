const StellarSdk = require("@stellar/stellar-sdk");

// Generate a completely new, random Stellar wallet
const keypair = StellarSdk.Keypair.random();

console.log("-----------------------------------------");
console.log("✅ New Testnet Wallet Generated!");
console.log("Public Key:", keypair.publicKey());
console.log("Secret Key (For your .env):", keypair.secret());
console.log("-----------------------------------------");
