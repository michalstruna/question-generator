package cz.michalstruna.questiongenerator.ui;

import cz.michalstruna.questiongenerator.testutil.UI;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class LoginTest {

    @Test
    public void testSuccessfulLoginAndLogout() throws InterruptedException {
        UI ui = new UI();
        ui.login("user", "nnpia");

        // Wait for logout button.
        ui.wait("#logout-button");
        assertFalse(ui.exists("#login-form"));

        // Logout.
        ui.find("#logout-button").click();
        assertFalse(ui.exists("#logout-button"));
        assertTrue(ui.exists("#login-form"));
        assertTrue(ui.exists("#toggle-login"));

        ui.close();
    }

    @Test
    public void testLoginWithEmptyCredentials() throws InterruptedException {
        UI ui = new UI();
        ui.login("", "");

        // Login form should be still visible.
        ui.wait(2000);
        assertTrue(ui.exists("#login-form"));

        // Check error messages.
        List<WebElement> errors = ui.findAll(".form__error:not(:empty)");
        assertEquals(2, errors.size());
        assertEquals("Napište své jméno", errors.get(0).getText());
        assertEquals("Napište své heslo", errors.get(1).getText());

        // Submit button should be disabled.
        assertNotNull(ui.find("#login-form button[type='submit']").getAttribute("disabled"));

        ui.close();
    }

    @Test
    public void testLoginWithWrongPassword() throws InterruptedException {
        UI ui = new UI();
        ui.login("user", "bad_password");

        // Login form should be still visible.
        ui.wait(2000);
        assertTrue(ui.exists("#login-form"));

        // Check error message.
        List<WebElement> errors = ui.findAll(".form__error:not(:empty)");
        assertEquals(1, errors.size());
        assertEquals("Špatné přihlašovací údaje.", errors.get(0).getText());

        // Submit button should be disabled.
        assertNotNull(ui.find("#login-form button[type='submit']").getAttribute("disabled"));

        ui.close();
    }

}
