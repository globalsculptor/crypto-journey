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