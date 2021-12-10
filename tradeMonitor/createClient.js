module.exports = Web3 => {
  const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a0fec1f1ddb449768d0646ea800e0b4c");

  return new Web3(provider);
}
