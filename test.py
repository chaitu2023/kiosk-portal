from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def click_element(driver, xpath):
    try:
        element = driver.find_element(By.XPATH, xpath)
        element.click()
    except Exception as e:
        print(f"Error while clicking element: {str(e)}")

def main():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.binary_location = '/usr/bin/google-chrome'
    driver = webdriver.Chrome(options=options)
    
    try:
        driver.get("http://3.110.46.249")  # Replace with your URL
        full_body_test_button_xpath = '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/a[2]'

        # Wait for the welcome element to be present for a maximum of 15 seconds
        wait = WebDriverWait(driver, 15)
        welcome_element = wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[1]')))

        if welcome_element:
            print("Page loaded successfully")

            # Find and click the Full Body Test button using the click_element function
            click_element(driver, full_body_test_button_xpath)

            print("Selected Full Body Test")
        else:
            print("Page not loaded")
    
    except Exception as e:
        print("An error occurred:", str(e))
    
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
