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
      
       
      const address = "0xaEE27B500cc37DE72EFEbdEb2Bfb47a389C06F87";
      const abi = [{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];


async function symbol(){
    const Contract = new web3.eth.Contract(abi,address);
    const result = await Contract.methods.symbol().call();

    console.log("result:", result);
}

symbol();


    } catch (e) {
      returnStr = ""
    }
    
    return buffer;
  },
});
