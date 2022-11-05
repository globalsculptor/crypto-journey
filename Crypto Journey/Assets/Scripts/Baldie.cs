using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Baldie : MonoBehaviour
{
    public KeyCode moveUp;
    public KeyCode moveDown;
    public KeyCode moveLeft;
    public KeyCode moveRight;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(moveUp))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 60, 0);
        }

        if (Input.GetKeyDown(moveDown))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, -60, 0);
        }

        if (Input.GetKeyDown(moveLeft))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(-60, 0, 0);
        }

        if (Input.GetKeyDown(moveRight))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(60, 0, 0);
        }
    }
}
