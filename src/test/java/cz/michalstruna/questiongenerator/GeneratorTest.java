package cz.michalstruna.questiongenerator;

import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.QuestionInstance;
import cz.michalstruna.questiongenerator.model.database.Topic;
import cz.michalstruna.questiongenerator.model.dto.Answer;
import cz.michalstruna.questiongenerator.model.dto.AnswerCheck;
import cz.michalstruna.questiongenerator.service.GeneratorService;
import cz.michalstruna.questiongenerator.service.QuestionService;
import cz.michalstruna.questiongenerator.service.TopicService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static cz.michalstruna.questiongenerator.testutil.Creator.save;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GeneratorTest {

    private static final String TOPIC_NAME = "gen_test_topic_name_";
    private static final String QUESTION_NAME = "gen_test_topic_name_";

    @Autowired
    QuestionService questionService;

    @Autowired
    TopicService topicService;

    @Autowired
    GeneratorService generatorService;

    @Test
    public void testGenerator() throws InterruptedException {
        Topic[] topics = new Topic[] {
                (Topic) save(new Topic(TOPIC_NAME + 1)),
                (Topic) save(new Topic(TOPIC_NAME + 2))
        };

        Question[] questions = new Question[] {
                (Question) save(new Question(QUESTION_NAME + 1, "a|abc", topics[0])),
                (Question) save(new Question(QUESTION_NAME + 2, "a|abc", topics[0])),
                (Question) save(new Question(QUESTION_NAME + 3, "a|abc", topics[1])),
                (Question) save(new Question(QUESTION_NAME + 4, "a|abc", topics[1])),
                (Question) save(new Question(QUESTION_NAME + 5, "a|abc", topics[1]))
        };

        List<Integer> selectedTopics = new ArrayList<>();
        selectedTopics.add(topics[0].getId());

        for (int i = 0; i < 6; i++) {
            QuestionInstance instance = generatorService.generateQuestion(selectedTopics);
            assertEquals(instance.getQuestion().getTopic().getId(), (int) selectedTopics.get(0)); // Test topic.

            Thread.sleep(300);

            boolean isCorrect = i < 4; // 0, 1, 2, 3 will be correct, 4, 5 will be wrong answers (so 66,66 success).
            Answer answer = new Answer(isCorrect ? (i == 0 ? "a" : "abc") : "ab");
            AnswerCheck answerCheck = generatorService.answerQuestion(instance.getId(), answer);
            assertEquals(answerCheck.getIsCorrect(), isCorrect);
        }

        Question question1 = questionService.getById(questions[0].getId());
        Question question2 = questionService.getById(questions[1].getId());

        long time = question1.getTotalTime() + question2.getTotalTime();
        int correct = question1.getCorrect() + question2.getCorrect();
        int wrong = question1.getWrong() + question2.getWrong();
        int answersCount = question1.getAnswersCount() + question2.getAnswersCount();
        double success = Math.floor(100 * (question1.getAnswersCount() * question1.getSuccess() + question2.getAnswersCount() * question2.getSuccess())) / (100 * answersCount);
        double timePerAnswer = (question1.getTimePerAnswer() + question2.getTimePerAnswer()) / 2;

        assertEquals(time, 1500, 500);
        assertEquals(4, correct);
        assertEquals(2, wrong);
        assertEquals(300, timePerAnswer, 200);
        assertEquals(66.66, success, 1);
        assertEquals(6, answersCount);

        Topic topic = topicService.getById(selectedTopics.get(0));

        assertEquals(1500, topic.getTotalTime(), 500);
        assertEquals(4, topic.getCorrect(), 4);
        assertEquals(300, topic.getTimePerAnswer(), 200);
        assertEquals(66.66, topic.getSuccess(), 1);
        assertEquals(6, topic.getAnswersCount());

    }

}