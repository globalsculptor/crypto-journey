// web3.jslib

mergeInto(LibraryManager.library, {
  WalletAddress: function () {
    var returnStr
    try {
      // get address from metamask
      returnStr = web3.currentProvider.selectedAddress
      var returnStr = web3.currentProvider.selectedAddress;
returnStr = web3.currentProvider.chainId + ' ' + returnStr;

      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);

    } catch (e) {
      returnStr = ""
    }
    
    return buffer;
  },
});


mergeInto(LibraryManager.library, {
  Mint: async function (count) {
  var resultInt = 10
    var returnStr
    try {
      // get address from metamask
      returnStr = web3.currentProvider.selectedAddress
      var returnStr = web3.currentProvider.selectedAddress;
returnStr = web3.currentProvider.chainId + ' ' + returnStr;

      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      
       
      const address = "0x3665208a63D4cAD719979647fE73D2Eb7404b981";
      const abi = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}];


async function mint(){
    const Contract = new web3.eth.Contract(abi,address);
    const result = await Contract.methods.mint(web3.currentProvider.selectedAddress, 1000).call();

    console.log("result:", result);
    
        const Contract2 = new web3.eth.Contract([{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],address);
        const result2 = await Contract2.methods.balanceOf(web3.currentProvider.selectedAddress).call();
    console.log("result2:", result2);
    
    return result2;
}



     mint();
    

    } catch (e) {
           resultInt = 10
    }
    
    return 10;
  },
});
