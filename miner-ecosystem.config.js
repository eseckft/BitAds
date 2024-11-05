module.exports = {
  apps: [
    {
      name: `miner_proxy_server_${process.env.WALLET_HOTKEY || 'default'}`,
      script: "proxies/miner.py",
      interpreter: "python3",
      args: generateArgs(),
      env: getEnvVariables(),
    },
    {
      name: `miner_server_${process.env.WALLET_HOTKEY || 'default'}`,
      script: "neurons/miner/core.py",
      interpreter: "python3",
      args: generateArgs(),
      env: getEnvVariables(),
    },
    {
      name: "auto_update",
      script: "auto_update.py",
      interpreter: "python3",
      cron_restart: "*/1 * * * *",
      autorestart: false,
      env: {
        ...getEnvVariables(),
        NEURON_TYPE: "miner",
      },
    },
  ],
};

// Function to generate command-line arguments
function generateArgs() {
  return [
    "--wallet.hotkey", process.env.WALLET_HOTKEY || 'default',
    "--wallet.name", process.env.WALLET_NAME || 'default',
    "--subtensor.network", process.env.SUBTENSOR_NETWORK || 'finney',
    "--subtensor.chain_endpoint", process.env.SUBTENSOR_CHAIN_ENDPOINT || 'wss://entrypoint-finney.opentensor.ai:443',
    "--axon.port", process.env.AXON_PORT || 8091
  ];
}

// Function to get environment variables
function getEnvVariables() {
  return {
    WALLET_HOTKEY: process.env.WALLET_HOTKEY || "default", // Default to "default"
    WALLET_NAME: process.env.WALLET_NAME || "default",     // Default to "default"
    SUBTENSOR_NETWORK: process.env.SUBTENSOR_NETWORK || "finney", // Default to "finney"
    SUBTENSOR_CHAIN_ENDPOINT: process.env.SUBTENSOR_CHAIN_ENDPOINT || "wss://entrypoint-finney.opentensor.ai:443", // Default endpoint
    AXON_PORT: process.env.AXON_PORT || 8091
  };
}