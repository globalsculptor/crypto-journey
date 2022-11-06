using System.Collections;
using System.Collections.Generic;
using UnityEngine;
// use web3.jslib
using System.Runtime.InteropServices;
using TMPro;
using System.Threading.Tasks;

public class Web3Button : MonoBehaviour
{
    public GameObject polygon;
    public GameObject optimism;


    // text in the button
    public TextMeshProUGUI ButtonText;
    public TextMeshProUGUI BalanceText;
    // use WalletAddress function from web3.jslib
    [DllImport("__Internal")] private static extern string WalletAddress();
    [DllImport("__Internal")] private static extern int Mint(string count);

    public void OnClick()
    {
        polygon.SetActive(false);
        optimism.SetActive(false);

        string walletInfo = WalletAddress();
        if (walletInfo.StartsWith("0x13881"))
        {
            polygon.SetActive(true);
        }

        if (walletInfo.StartsWith("0x1a4"))
        {
            optimism.SetActive(true);
        }

        string[] strings = walletInfo.Split(' ');

        if (strings.Length == 2)
        {
            ButtonText.text = strings[1].Substring(0, 5) + "..." + strings[1].Substring(strings[1].Length - 2, 2);
        }

        //ButtonText.text = walletInfo;
        string mintResult =  Mint("10").ToString();

        Debug.Log("mint result: " + mintResult);
        BalanceText.text = "10";
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
