package cz.michalstruna.questiongenerator.testutil;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public abstract class PageObject {

    private FirefoxDriver driver;
    private static final String URL = "http://localhost:3000";
    //private static final String URL = "https://qg.now.sh/";

    public PageObject(FirefoxDriver driver) {
        this.driver = driver;
    }

    public static FirefoxDriver createDriver() {
        System.setProperty("webdriver.gecko.driver", "src/test/resources/geckodriver-v0.26.0-linux64");
        FirefoxDriver driver = new FirefoxDriver();
        driver.get(URL);
        return driver;
    }

    protected WebElement find(String selector) {
        return driver.findElement(By.cssSelector(selector));
    }

    protected List<WebElement> findAll(String selector) {
        return driver.findElements(By.cssSelector(selector));
    }

    protected void wait(int ms) throws InterruptedException {
        Thread.sleep(ms);
    }

    protected void asyncWait() throws InterruptedException {
        wait(2000);
    }

    protected void wait(String selector) {
        WebDriverWait wait = new WebDriverWait(driver, 1500);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(selector)));
    }

    protected boolean exists(String selector) {
        List<WebElement> elements = driver.findElements(By.cssSelector(selector));
        return elements.size() > 0;
    }

    protected void acceptConfirm() {
        driver.switchTo().alert().accept();
    }

}
