using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Baldie : MonoBehaviour
{
    public KeyCode moveUp;
    public KeyCode moveDown;
    public KeyCode moveLeft;
    public KeyCode moveRight;

    public float speed = 120;

    public GameObject rug;

    public GameObject house;


    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(moveUp))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, speed, 0);
        }

        if (Input.GetKeyDown(moveDown))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, -speed, 0);
        }

        if (Input.GetKeyDown(moveLeft))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(-speed, 0, 0);
        }

        if (Input.GetKeyDown(moveRight))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(speed, 0, 0);
        }

        if (Input.GetKeyUp(moveUp))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
        }

        if (Input.GetKeyUp(moveDown))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
        }

        if (Input.GetKeyUp(moveLeft))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
        }

        if (Input.GetKeyUp(moveRight))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        Debug.Log("Back to Inside");
        if (collision.gameObject == house)
        {
            Debug.Log("Back to Inside");
            SceneManager.LoadScene("CryptoJourney");
        }

        if (collision.gameObject == rug)
        {
            Debug.Log("Back to Outside");
            SceneManager.LoadScene("CryptoJourneyOutside");
        }

        
        
    }
}
