// web3.jslib

mergeInto(LibraryManager.library, {
  GetSymbol: function () {
    var returnStr
    try {
      // get address from metamask
      returnStr = web3.currentProvider.selectedAddress
      var returnStr = web3.currentProvider.selectedAddress;
// returnStr = web3.currentProvider.chainId + ' ' + returnStr;

      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      
          console.log("qeweqeqwew");
      
      
      const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/bJkclFqoTl_ENvsREVppimmsh6o1uR4e");
      
      const address = "0xaEE27B500cc37DE72EFEbdEb2Bfb47a389C06F87";
      const abi = [{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];





    } catch (e) {
      returnStr = ""
    }
    
    return buffer;
  },
});
