export default async function get_exchangeRates(amount) {
    await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd') // Replace with the appropriate CoinGecko API endpoint
    .then(response => response.json()) // Convert the response to JSON format
    .then(data => {
      const exchangeRate = data['matic-network']['usd'];
      const usdAmount = amount; 
      return usdAmount * exchangeRate
    })
    .catch(error => {
      console.error(error);
    });

}
export const getMatic = async (address) => {

  console.log(`fetching matic to ${address}`);
  
  await fetch(`https://api.faucet.matic.network/transferTokens`, {
    method: post,
    body: JSON.stringify({
      network: mumbai,
      address: address,
      token: maticToken,
    }),
    headers: { "Content-Type": "application/json" },
  })
  .then((res) => res.json())
  .then(console.log);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // const delay = async (ms) => setTimeout(resolve, ms);
  console.log(`waiting 2 minutes`);
  await delay(2 * 60000);
};
