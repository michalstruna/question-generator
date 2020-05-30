package cz.michalstruna.questiongenerator.service;

import cz.michalstruna.questiongenerator.dao.QuestionRepository;
import cz.michalstruna.questiongenerator.dao.TopicRepository;
import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.Topic;
import cz.michalstruna.questiongenerator.model.dto.NewQuestion;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuestionServiceTest {

    @Autowired
    private QuestionService questionService;

    @MockBean
    private QuestionRepository questionRepository;

    @MockBean
    private TopicRepository topicRepository;

    @Test
    public void whenAddQuestion_thenUpdateTopicStatistics() {
        Topic topic = new Topic("Topic");
        topic.setId(1);
        topic.setQuestionsCount(10);

        when(topicRepository.findById(1)).thenReturn(Optional.of(topic));

        NewQuestion question = new NewQuestion("Question", "Answer", 1);

        questionService.add(question);

        ArgumentCaptor<Topic> topicCaptor = ArgumentCaptor.forClass(Topic.class);
        verify(topicRepository).save(topicCaptor.capture());

        assertEquals(10 + 1, topicCaptor.getValue().getQuestionsCount());
    }

    @Test
    public void whenRemoveQuestion_thenUpdateTopicStatistics() {
        Topic topic = new Topic("Topic");
        topic.setTotalTime(110);
        topic.setWrong(12);
        topic.setCorrect(15);
        topic.setQuestionsCount(10);

        Question question = new Question("Question", "Answer", topic);
        question.setTotalTime(20);
        question.setWrong(2);
        question.setCorrect(1);

        when(questionRepository.findById(1)).thenReturn(Optional.of(question));

        questionService.remove(1);

        ArgumentCaptor<Topic> topicCaptor = ArgumentCaptor.forClass(Topic.class);
        verify(topicRepository).save(topicCaptor.capture());

        System.out.println(topic.getTotalTime());

        assertEquals(110 - question.getTotalTime(), topicCaptor.getValue().getTotalTime());
        assertEquals(12 - question.getWrong(), topicCaptor.getValue().getWrong());
        assertEquals(15 - question.getCorrect(), topicCaptor.getValue().getCorrect());
        assertEquals(10 - 1, topicCaptor.getValue().getQuestionsCount());
    }


}