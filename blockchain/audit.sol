pragma solidity >=0.7.0 <0.9.0;


contract Audit {

    struct AuditRecord {
        string date; //稽核時間 ex.20210501
        string transactionID;
        string uuid;
        bool auditResult;
        string blockchainSender; //blockchain上紀錄的發送者
        string databaseSender; //database上紀錄的發送者
        string blockchainReceiver; //blockchain上紀錄的接收者
        string databaseReceiver; //database上紀錄的發送者
        uint blockchainAmount; //blockchain上紀錄的金額
        uint databaseAmount; //database上紀錄的金額
    }
    mapping (string=>AuditRecord) auditRecords; //audit清單(uid)
    function audit(string memory auditID, string memory date, string memory transactionID, string memory uuid,
    string memory blockchainSender, string memory databaseSender, string memory blockchainReceiver, string memory databaseReceiver,
    uint blockchainAmount, uint databaseAmount) public returns (bool){
        auditRecords[auditID].date = date;
        auditRecords[auditID].transactionID = transactionID;
        auditRecords[auditID].uuid = uuid;
        auditRecords[auditID].blockchainSender = blockchainSender;
        auditRecords[auditID].databaseSender = databaseSender;
        auditRecords[auditID].blockchainReceiver = blockchainReceiver;
        auditRecords[auditID].databaseReceiver = databaseReceiver;
        auditRecords[auditID].blockchainAmount = blockchainAmount;
        auditRecords[auditID].databaseAmount = databaseAmount;
        if(keccak256(bytes(blockchainSender)) == keccak256(bytes(databaseSender)) 
        && keccak256(bytes(blockchainReceiver)) == keccak256(bytes(databaseReceiver)) 
        && blockchainAmount == databaseAmount){
            auditRecords[auditID].auditResult = true;
            return true;
        }
        else{
            auditRecords[auditID].auditResult = false;
            return false;
        }
            
    }

    
    function getAuditHistory(string memory auditID) public view returns (bool auditResult, string memory date, string memory transactionID,
    string memory uuid, string memory blockchainSender, string memory databaseSender, string memory blockchainReceiver){
    //string memory databaseReceiver, uint blockchainAmount, uint databaseAmount){
        return(
            auditRecords[auditID].auditResult,
            auditRecords[auditID].date,
            auditRecords[auditID].transactionID,
            auditRecords[auditID].uuid,
            auditRecords[auditID].blockchainSender,
            auditRecords[auditID].databaseSender,
            auditRecords[auditID].blockchainReceiver
            //auditRecords[auditID].databaseReceiver,
            //auditRecords[auditID].blockchainAmount,
            //auditRecords[auditID].databaseAmount
            );
    }
}