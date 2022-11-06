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
    public GameObject bed;
    public GameObject sleep;

    public GameObject house;

    public RuntimeAnimatorController leftAnimation;
    public RuntimeAnimatorController rightAnimation;
    public RuntimeAnimatorController normalAnimation;


    // Start is called before the first frame update
    void Start()
    {
        stopAnimation();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(moveUp))
        {
            GetComponent<Animator>().runtimeAnimatorController = normalAnimation;
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, speed, 0);
            startAnimation();
        }

        if (Input.GetKeyDown(moveDown))
        {
            GetComponent<Animator>().runtimeAnimatorController = normalAnimation;
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, -speed, 0);
            startAnimation();
        }

        if (Input.GetKeyDown(moveLeft))
        {
            GetComponent<Animator>().runtimeAnimatorController = leftAnimation;
            GetComponent<Rigidbody2D>().velocity = new Vector3(-speed, 0, 0);
            startAnimation();
        }

        if (Input.GetKeyDown(moveRight))
        {
            GetComponent<Animator>().runtimeAnimatorController = rightAnimation;
            GetComponent<Rigidbody2D>().velocity = new Vector3(speed, 0, 0);
            startAnimation();
        }

        if (Input.GetKeyUp(moveUp))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
            stopAnimation();
        }

        if (Input.GetKeyUp(moveDown))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
            stopAnimation();
        }

        if (Input.GetKeyUp(moveLeft))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
            stopAnimation();
        }

        if (Input.GetKeyUp(moveRight))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector3(0, 0, 0);
            stopAnimation();
        }
    }

    void startAnimation()
    {
        GetComponent<Animator>().enabled = true;
    }

    void stopAnimation()
    {
        GetComponent<Animator>().enabled = false;
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

        if (collision.gameObject == bed)
        {
            Debug.Log("Sleeping time!");
            sleep.SetActive(true);
            gameObject.SetActive(false);
        }



    }
}
