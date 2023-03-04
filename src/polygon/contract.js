import { ethers } from "ethers";
import ABI from '../../artifacts/contracts/BuyMeCoffee.sol/BuyMeCoffee.json';

const contract_address = "0xE41b7B3570307d4158912c67e297e828D01C2630";

export const fetchUserFlag = async()=>{
    
    const {ethereum} = window;
    if(ethereum){
      const  provider = new ethers.providers.Web3Provider(ethereum);
      const  signer   = provider.getSigner()
      const  contract = new ethers.Contract(contract_address,ABI.abi,signer);
      const  flag     = await contract.checkUserFlag()
      return flag
    }
}

export const completePage = async(avatarUrl,name,coffeLink,about,website)=>{
    
    const {ethereum} = window;
    if(ethereum){
      const  provider = new ethers.providers.Web3Provider(ethereum);
      const  signer   = provider.getSigner()
      const  contract = new ethers.Contract(contract_address,ABI.abi,signer);
      await contract.Register(avatarUrl,name,coffeLink,about,website);
    }
}

export const getUser  = async(user,setUserDataLoaded) =>{
  try{
    const {ethereum} = window;
    if(ethereum){
      const  provider = new ethers.providers.Web3Provider(ethereum);
      const  signer   = provider.getSigner()
      const  contract = new ethers.Contract(contract_address,ABI.abi,signer);
      const  data = await contract.getUser(user);
      const cleaned = {
          avatar:data._Avatar,
          name   :data._Name,
          link   :data._Link,
          linkSoc:data._LinkSoc,
          bio    :data._Bio,
          cofP   :data._CofPrice,
          balance:ethers.utils.formatEther(data._Balance.toString())
      }
      setUserDataLoaded(true)
      return cleaned
    }
  }catch(e){
    console.log(e)
  }
}


export const setDonationSetting =  async(amount,message)=>{

  const {ethereum} = window;
  if(ethereum){
    const  provider = new ethers.providers.Web3Provider(ethereum);
    const  signer   = provider.getSigner()
    const  contract = new ethers.Contract(contract_address,ABI.abi,signer);
    await contract.setDonationSettings(amount,message);
  }
}

export const buyCoffee =  async(to)=>{

  const {ethereum} = window;
  if(ethereum){
    const  provider = new ethers.providers.Web3Provider(ethereum);
    const  signer   = provider.getSigner()
    const  contract = new ethers.Contract(contract_address,ABI.abi,signer);
    await contract.buyACoffeTo(to,{value:ethers.utils.parseEther("0.1")});
  }
}
