from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def main():
    # Set up the Selenium WebDriver with options
    options = webdriver.ChromeOptions()
    # Comment the next line if you want to see the browser window
    # options.add_argument('--headless')  # Use this if you're running headless
    # Actual path to Chrome binary (change this to the path on your machine)
    # options.binary_location = '/usr/bin/google-chrome'
    options.binary_location = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    driver = webdriver.Chrome(options=options)

    try:
        driver.get("http://13.201.76.98")  # Replace with your URL
        time.sleep(10)

        # Wait for the welcome element to be present for a maximum of 15 seconds
        wait = WebDriverWait(driver, 25)
        welcome_element = wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[1]')))
        time.sleep(10)

        if welcome_element:
            print("Page loaded successfully")

            # Locate and click the Temperature Test button
            temperature_test_button_xpath = '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/a[7]'
            temperature_test_button = WebDriverWait(driver, 25).until(EC.element_to_be_clickable((By.XPATH, temperature_test_button_xpath)))
            temperature_test_button.click()
            print("Selected temperature button")
            time.sleep(10)

            # Wait for the Start button and click it
            start_button_xpath = '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/a'
            start_button = WebDriverWait(driver, 35).until(EC.element_to_be_clickable((By.XPATH, start_button_xpath)))
            start_button.click()
            print("Clicked Start")
            time.sleep(10)

            # Wait for the username text field to be present
            username_field_xpath = '/html/body/higi-modal/div[1]/div[2]/login-modal/div/div[1]/div[1]/higi-text-field/input'
            username_field = WebDriverWait(driver, 35).until(EC.presence_of_element_located((By.XPATH, username_field_xpath)))
            time.sleep(10)

            # Enter the username "pavan.veeramaneni@indiahealthlink.com" into the username field
            username_field.send_keys("pavan.veeramaneni@indiahealthlink.com")
            time.sleep(10)

            # Wait for the password text field to be present
            password_field_xpath = '/html/body/higi-modal/div[1]/div[2]/login-modal/div/div[1]/div[2]/higi-text-field/input'
            password_field = WebDriverWait(driver, 35).until(EC.presence_of_element_located((By.XPATH, password_field_xpath)))
            time.sleep(10)

            # Enter the password "ABCd@123456" into the password field
            password_field.send_keys("ABCd@1234567")
            time.sleep(10)

            delete_button_xpath = '/html/body/keyboard/div[3]/ul/div[1]/li[11]/a'
            delete_button = WebDriverWait(driver, 35).until(EC.element_to_be_clickable((By.XPATH, delete_button_xpath)))
            delete_button.click()
            time.sleep(10)
            print("Deleted Last character from password field successfully")

            

            # Locate and click the submit button
            submit_button_xpath = '/html/body/higi-modal/div[1]/div[2]/login-modal/div/div[1]/div[2]/a'
            submit_button = WebDriverWait(driver, 25).until(EC.element_to_be_clickable((By.XPATH, submit_button_xpath)))
            submit_button.click()
            time.sleep(10)

            print("Clicked submit button successfully")

            start_button_xpath = '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/a[2]'
            start_button = WebDriverWait(driver, 35).until(EC.element_to_be_clickable((By.XPATH, start_button_xpath)))
            start_button.click()
            print("Clicked on Start Test button")
            time.sleep(10)

            

        else:
            print("Page not loaded")

    except Exception as e:
        print("An error occurred:", str(e))

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
