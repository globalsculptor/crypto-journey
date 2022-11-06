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
    public GameObject house2;
    public GameObject nextDay;

    public RuntimeAnimatorController leftAnimation;
    public RuntimeAnimatorController rightAnimation;
    public RuntimeAnimatorController normalAnimation;
    public RuntimeAnimatorController upAnimation;


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
            GetComponent<Animator>().runtimeAnimatorController = upAnimation;
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

    void showNextDayMessage()
    {
        nextDay.SetActive(true);
        Invoke("reloadScene", 2);
        
    }

    void reloadScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
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
        if (collision.gameObject == house)
        {
            SceneManager.LoadScene("CryptoJourney");
        }

        if (collision.gameObject == house2)
        {
            SceneManager.LoadScene("CryptoJourneyRoom");
        }

        if (collision.gameObject == rug)
        {
            SceneManager.LoadScene("CryptoJourneyOutside");
        }

        if (collision.gameObject == bed)
        {
            Debug.Log("Sleeping time!");
            sleep.SetActive(true);
            gameObject.SetActive(false);
            Invoke("showNextDayMessage", 2);
        }



    }
}
