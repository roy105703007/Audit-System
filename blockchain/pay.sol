pragma solidity >=0.7.0 <0.9.0;


contract Pay {

    struct User {
        string userID;
        string userName;
        uint ownMoney;
    }
    string[] userIndex;
    mapping (string=>User) users; //user清單(uid)
    
    
    function registerUser(string memory userID, string memory userName) public {
        require(bytes(users[userID].userID).length == 0);
        users[userID].userID = userID;
        users[userID].userName = userName;
        users[userID].ownMoney = 10000;
        userIndex.push(userID);
    }
    
    
    function payMoney(string memory senderID, string memory receiverID, uint amount) public returns (bool){
        if(users[senderID].ownMoney - amount >= 0){
            users[senderID].ownMoney -= amount;
            users[receiverID].ownMoney += amount;
            return true;
        }
        else{
            return false;
        }
            
    }
    
    
    function getUserData(string memory userID) public view returns (string memory userName, uint ownMoney){
        return(
            users[userID].userName,
            users[userID].ownMoney
            );
    }

}