import {fetch} from "node-fetch";

const getAddress = () => {
  const address = process.argv[2];
  if (!address) {
    console.log(`Please add the address as script argument`);
    process.exit(1);
  }
  return address;
};

const address = getAddress();
getMatic(address)