import { ethers } from "ethers"

export const fetch_chain_ID = async()=>{
    
    const {ethereum} = window;

    if(ethereum){
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const { chainId } = await provider.getNetwork()
        
        if(chainId != 80001) {
            return false
        }else{

            return true
        }
    }
}

export const fetch_account_AU = async()=>{
    const {ethereum} = window;
    try {
        if(ethereum){
            const accounts = await ethereum.request({method:'eth_accounts'});
            if(accounts.length !== 0){
                return accounts[0]
            }
        }
    }catch(e){
        console.log(e)
        return ""
    }
}
export const connect_account_AU = async()=>{
    try {
        const {ethereum} = window;

        if(ethereum){
            const accounts = await ethereum.request({method:'eth_requestAccounts'});

            if(accounts.length !== 0){
                return accounts[0]
            }

        }
    }catch(e){
        console.log(e)
        return ""
    }
}