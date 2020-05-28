package cz.michalstruna.questiongenerator.ui;

import cz.michalstruna.questiongenerator.testutil.UI;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.junit.Assert.*;

public class TopicTest {

    private static final String TOPIC_NAME = "test_topic";

    @Test
    public void testCreateAndDeleteTopic() throws InterruptedException {
        UI ui = new UI();
        ui.login("user", "nnpia");
        ui.find("#nav nav a:last-of-type").click(); // Go to database view.
        ui.find("#add-button").click(); // Show add topic form.
        ui.find("#add-topic-form input[type='text']").sendKeys(TOPIC_NAME);
        ui.find("#add-topic-form button").click();
        ui.asyncWait();
        ui.find("#name-filter").sendKeys(TOPIC_NAME);

        List<WebElement> rows = ui.findAll(".table__row");
        assertEquals(1, rows.size());

        ui.find("#delete-button").click();
        ui.acceptConfirm();

        ui.asyncWait();
        rows = ui.findAll(".table__row");
        assertEquals(0, rows.size());

        ui.close();
    }

}
