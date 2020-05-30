package cz.michalstruna.questiongenerator.testutil;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class DatabasePage extends PageObject {

    public DatabasePage(FirefoxDriver driver) {
        super(driver);
    }

    public void goTo() {
        find("#nav nav a:last-of-type").click(); // Go to database view.
    }

    public void addTopic(String name) throws InterruptedException {
        wait("#add-button");
        find("#add-button").click(); // Show add topic form.
        find("#add-topic-form input[type='text']").sendKeys(name);
        find("#add-topic-form button").click();
        asyncWait();
    }

    public void filter(String filter) {
        find("#name-filter").sendKeys(filter);
    }

    public void itemsShouldExist(int count) {
        List<WebElement> rows = findAll(".table__row");
        assertEquals(count, rows.size());
    }

    public void deleteItem() throws InterruptedException {
        find("#delete-button").click();
        acceptConfirm();
        asyncWait();
    }
}
