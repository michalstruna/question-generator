package cz.michalstruna.questiongenerator.ui;

import cz.michalstruna.questiongenerator.testutil.AuthControl;
import cz.michalstruna.questiongenerator.testutil.PageObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class LoginTest {

    @Test
    public void testSuccessfulLoginAndLogout() throws InterruptedException {
        FirefoxDriver driver = PageObject.createDriver();
        AuthControl auth = new AuthControl(driver);

        auth.login("user", "nnpia");
        auth.loginFormShouldExist(false);
        auth.logout();
        auth.loginFormShouldExist(true);
        auth.logoutButtonShouldExist(false);

        driver.close();
    }

    @Test
    public void testLoginWithEmptyCredentials() throws InterruptedException {
        FirefoxDriver driver = PageObject.createDriver();
        AuthControl auth = new AuthControl(driver);

        auth.login("", "");
        auth.loginFormShouldExist(true);
        auth.loginErrorsShouldExist("Napište své jméno", "Napište své heslo");
        auth.loginButtonShouldBeDisabled();

        driver.close();
    }

    @Test
    public void testLoginWithWrongPassword() throws InterruptedException {
        FirefoxDriver driver = PageObject.createDriver();
        AuthControl auth = new AuthControl(driver);

        auth.login("user", "bad_password");
        auth.loginFormShouldExist(true);
        auth.loginErrorsShouldExist("Špatné přihlašovací údaje.");
        auth.loginButtonShouldBeDisabled();

        driver.close();
    }

}
