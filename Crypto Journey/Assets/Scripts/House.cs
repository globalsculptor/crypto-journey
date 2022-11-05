using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class House : MonoBehaviour
{
    public GameObject outside;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        outside.SetActive(false);
        Debug.Log("Back to House");
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
