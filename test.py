from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def main():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.binary_location = '/usr/bin/google-chrome'
    driver = webdriver.Chrome(options=options)
    
    try:
        driver.get("http://3.110.46.249")  # Replace with your URL

        # Wait for the welcome element to be present for a maximum of 15 seconds
        wait = WebDriverWait(driver, 15)
        welcome_element = wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[1]')))

        if welcome_element:
            print("Page loaded successfully")

            # Look for iframes
            iframes = driver.find_elements(By.TAG_NAME, 'iframe')

            # If iframes are found, iterate through and try to locate the element in each iframe
            for iframe in iframes:
                driver.switch_to.frame(iframe)
                try:
                    # Find and click the Full Body Test button using an explicit wait
                    full_body_test_button_xpath = '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/a[2]'
                    full_body_test_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, full_body_test_button_xpath)))
                    full_body_test_button.click()
                    print("Selected Full Body Test")
                    break
                except Exception as e:
                    print("Element not found in this iframe:", str(e))
                    driver.switch_to.default_content()
                    continue
            else:
                print("Failed to select Full Body Test")
        else:
            print("Page not loaded")
    
    except Exception as e:
        print("An error occurred:", str(e))
    
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
