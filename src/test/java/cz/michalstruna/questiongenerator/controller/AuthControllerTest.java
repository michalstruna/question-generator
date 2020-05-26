package cz.michalstruna.questiongenerator.controller;

import cz.michalstruna.questiongenerator.model.database.User;
import cz.michalstruna.questiongenerator.model.dto.Credentials;
import cz.michalstruna.questiongenerator.model.dto.Identity;
import cz.michalstruna.questiongenerator.testutil.Creator;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthControllerTest {

    @Autowired
    private Creator creator;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private AuthController authController;

    @Test
    public void testRegister() {
        Credentials credentials = getCredentials();

        Identity identity = authController.register(credentials);

        assertEquals(credentials.getName(), identity.getName());
        assertNotNull(identity.getToken());
    }

    @Test
    public void testLogin() {
        Credentials credentials = getCredentials();

        User user = new User(credentials.getName(), encoder.encode(credentials.getPassword()));
        creator.saveEntity(user);

        Identity identity = authController.auth(credentials);

        assertEquals(credentials.getName(), identity.getName());
        assertNotNull(identity.getToken());
    }

    private Credentials getCredentials() {
        String username = "test_user";
        String password = "pass123";
        return new Credentials(username, password);
    }

}