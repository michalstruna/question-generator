package cz.michalstruna.questiongenerator.ui;

import cz.michalstruna.questiongenerator.testutil.AuthControl;
import cz.michalstruna.questiongenerator.testutil.DatabasePage;
import cz.michalstruna.questiongenerator.testutil.PageObject;
import org.junit.Test;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TopicTest {

    private static final String TOPIC_NAME = "test_topic";

    @Test
    public void testCreateAndDeleteTopic() throws InterruptedException {
        FirefoxDriver driver = PageObject.createDriver();
        AuthControl auth = new AuthControl(driver);
        DatabasePage db = new DatabasePage(driver);

        auth.login("user", "nnpia");
        db.goTo();
        db.addTopic(TOPIC_NAME);
        db.filter(TOPIC_NAME);
        db.itemsShouldExist(1);
        db.deleteItem();
        db.itemsShouldExist(0);

        driver.close();
    }

}
