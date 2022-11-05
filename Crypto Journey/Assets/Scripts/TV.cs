using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TV : MonoBehaviour
{
    public GameObject dialog;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        dialog.SetActive(true);
        Time.timeScale = 0;
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
