package cz.michalstruna.questiongenerator.testutil;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UI {

    private static final String URL = "http://localhost:3000";

    private WebDriver driver;

    @Value("test.url")
    private String url;

    public UI() {
        System.setProperty("webdriver.gecko.driver", "/home/michal/Stažené/geckodriver-v0.26.0-linux64/geckodriver");
        driver = new FirefoxDriver();
        driver.get(URL);
    }

    public WebElement find(String selector) {
        return driver.findElement(By.cssSelector(selector));
    }

    public List<WebElement> findAll(String selector) {
        return driver.findElements(By.cssSelector(selector));
    }

    public void wait(int ms) throws InterruptedException {
        Thread.sleep(ms);
    }

    public void wait(String selector) {
        WebDriverWait wait = new WebDriverWait(driver, 1500);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(selector)));
    }

    public boolean exists(String selector) {
        List<WebElement> elements = driver.findElements(By.cssSelector(selector));
        return elements.size() > 0;
    }

    public void close() {
        driver.close();
    }

    public void login(String username, String password) throws InterruptedException {
        find("#toggle-login").click();
        wait(500);

        if (!username.isEmpty()) {
            find("#login-form input[type='text']").sendKeys(username);
        }

        if (!password.isEmpty()) {
            find("#login-form input[type='password']").sendKeys(password);
        }

        find("#login-form button[type='submit']").click();
    }

}
