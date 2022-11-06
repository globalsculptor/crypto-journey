using System.Collections;
using System.Collections.Generic;
using UnityEngine;
// use web3.jslib
using System.Runtime.InteropServices;
using TMPro;

public class Web3Button : MonoBehaviour
{
    // text in the button
    public TextMeshProUGUI ButtonText;
    // use WalletAddress function from web3.jslib
    [DllImport("__Internal")] private static extern string WalletAddress();

    public void OnClick()
    {
        ButtonText.text = WalletAddress();
    }


    // Start is called before the first frame update
    void Start()
    {
        //
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
