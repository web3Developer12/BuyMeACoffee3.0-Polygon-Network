//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract BuyMeCoffee {

    struct User{
        string  _Avatar  ;
        string  _Name    ;
        string  _Link    ;
        string  _LinkSoc ;
        string  _Bio     ;
        string  _ThankMsg;
        uint256 _Balance ;
        uint8   _CofPrice;
        uint8   _FLAG    ;
        bool    _DISABLED;
    }

    mapping(address=>User) users;

    function checkUserFlag() public view returns(bool _ret){
        uint256 flag = users[msg.sender]._FLAG;
        assembly {
            switch flag
            case 0x0 {
                _ret := 0x0
            }
            default {
                _ret := 0x1
            }
        }
    }
    function RegisterUser() internal {
        uint8 mem_flag = users[msg.sender]._FLAG;
        require(mem_flag == 0,"R:ERR");
        assembly {
            mem_flag := add(mem_flag,0x1)
        }
        users[msg.sender]._FLAG += 1;
    }


    function Register(string calldata _AvatarUrl,string calldata _Name,string calldata _Link,string calldata _About,string calldata _Social) external {
        
        require(!checkUserFlag());

        require(
            bytes(_AvatarUrl).length > 0 &&
            bytes(_Name).length      > 0 &&
            bytes(_Link).length      > 0 &&
            bytes(_Social).length    > 0 &&
            bytes(_About).length     > 0    
        );

        users[msg.sender]._Avatar  = _AvatarUrl;
        users[msg.sender]._Name    = _Name     ;
        users[msg.sender]._Link    = _Link     ;
        users[msg.sender]._LinkSoc = _Social   ;
        users[msg.sender]._Bio     = _About    ;
        users[msg.sender]._CofPrice= 5         ;



        RegisterUser();
    }
    
    function getUser(address user) external view returns(User memory data){
        
        data._Avatar   = users[user]._Avatar  ;
        data._Name     = users[user]._Name    ;
        data._Link     = users[user]._Link    ;
        data._LinkSoc  = users[user]._LinkSoc ;
        data._Bio      = users[user]._Bio     ;
        data._CofPrice = users[user]._CofPrice;
        data._Balance  = users[user]._Balance;
    }

    

    function getPricePerCoffee(address to) external view returns(uint8){
        return users[to]._CofPrice;
    }

    function buyACoffeTo(address to) external payable{
        require(msg.value > 0);
        users[to]._Balance += msg.value;
    }

    function setDonationSettings(uint8 _amount,string calldata _message) external {
        require(_amount >= 1 && _amount <= 5);
        users[msg.sender]._CofPrice= _amount ;
        if(bytes(_message).length > 0){
            users[msg.sender]._ThankMsg = _message;
        }
    }

    function withdraw() external{
        require(users[msg.sender]._Balance > 0 &&  !users[msg.sender]._DISABLED);
        (bool s,) = (msg.sender).call{value:users[msg.sender]._Balance}("");
        require(s);
        users[msg.sender]._Balance = 0;
    }

    function disable() external {
        users[msg.sender]._DISABLED = true;
    }

}
