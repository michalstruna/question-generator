package cz.michalstruna.questiongenerator.testutil;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.List;

import static org.junit.Assert.*;

public class AuthControl extends PageObject {

    public AuthControl(FirefoxDriver driver) {
        super(driver);
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
        wait(".form__error:not(:empty), #logout-button");
    }

    public void logout() {
        find("#logout-button").click();
    }

    public void loginFormShouldExist(boolean shouldExist) {
        assertEquals(shouldExist, exists("#login-form"));
    }

    public void logoutButtonShouldExist(boolean shouldExist) {
        assertEquals(shouldExist, exists("#logout-button"));
    }

    public void loginErrorsShouldExist(String... errors) {
        List<WebElement> errElements = findAll(".form__error:not(:empty)");
        assertEquals(errors.length, errElements.size());

        for (int i = 0; i < errElements.size(); i++) {
            assertEquals(errors[i], errElements.get(i).getText());
        }
    }

    public void loginButtonShouldBeDisabled() {
        assertNotNull(find("#login-form button[type='submit']").getAttribute("disabled"));
    }

}
