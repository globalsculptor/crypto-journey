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
  Mint: function (count) {
    var returnStr
    try {
      // get address from metamask
      returnStr = web3.currentProvider.selectedAddress
      var returnStr = web3.currentProvider.selectedAddress;
returnStr = web3.currentProvider.chainId + ' ' + returnStr;

      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      
       
      const address = "0xaEE27B500cc37DE72EFEbdEb2Bfb47a389C06F87";
      const abi = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"}];

window.alert(Pointer_stringify(count));

async function mint(){
    const Contract = new web3.eth.Contract(abi,address);
    const result = await Contract.methods.mint(web3.currentProvider.selectedAddress, 1000).call();

    console.log("result:", result);
}



mint();


    } catch (e) {
      returnStr = ""
    }
    
    return buffer;
  },
});
