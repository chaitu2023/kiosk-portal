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
        driver.get("http://3.110.92.113")  # Replace with your URL

        # Wait for the welcome element to be present for a maximum of 15 seconds
        wait = WebDriverWait(driver, 15)
        welcome_element = wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[1]')))

        if welcome_element:
            print("Page loaded successfully")

            # Add an implicit wait to give time for the elements to load
            driver.implicitly_wait(10)

            # Check if there are any iframes and switch to them
            iframes = driver.find_elements(By.TAG_NAME, 'iframe')
            for iframe in iframes:
                driver.switch_to.frame(iframe)
                try:
                    # Find and click the Full Body Test button within the iframe
                    full_body_test_button = driver.find_element(By.XPATH, '/html/body/div[40]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/a[1]/div[1]')
                    full_body_test_button.click()
                    print("Selected Full Body Test")
                    break
                except Exception as e:
                    # Element not found in this iframe, continue to the next
                    driver.switch_to.default_content()
                    continue
        else:
            print("Page not loaded")
    
    except Exception as e:
        print("An error occurred:", str(e))
    
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
