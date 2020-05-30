package cz.michalstruna.questiongenerator.service;

import cz.michalstruna.questiongenerator.dao.QuestionRepository;
import cz.michalstruna.questiongenerator.dao.TopicRepository;
import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.Topic;
import cz.michalstruna.questiongenerator.model.dto.NewQuestion;
import cz.michalstruna.questiongenerator.model.dto.UpdatedQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicService topicService;

    public Question getById(int questionId) {
        var question = questionRepository.findById(questionId);

        if (question.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return question.get();
    }

    public Page<Question> getAll(Pageable pageable, String nameFilter) {
        return questionRepository.findAllByNameContainingIgnoreCase(nameFilter, pageable);
    }

    public Page<Question> getAllByTopic(Pageable pageable, String nameFilter, int topicIdFilter) {
        Topic topic = topicService.getById(topicIdFilter);
        return questionRepository.findAllByNameContainingIgnoreCaseAndTopic(nameFilter, topic, pageable);
    }

    public Question add(NewQuestion newQuestion) {
        Question question = new Question();
        question.setName(newQuestion.getName());
        question.setCorrect(0);
        question.setWrong(0);
        question.setTotalTime(0);
        question.setAnswer(newQuestion.getAnswer());

        Topic topic = topicService.getById(newQuestion.getTopicId());
        topic.setQuestionsCount(topic.getQuestionsCount() + 1);
        question.setTopic(topic);
        topicRepository.save(topic);

        return questionRepository.save(question);
    }

    public Question reset(int questionId) {
        UpdatedQuestion question = new UpdatedQuestion();
        question.setCorrect(0);
        question.setTime(0);
        question.setWrong(0);

        return update(questionId, question);
    }

    public Question update(int questionId, UpdatedQuestion updatedQuestion) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        Topic topic = question.getTopic();

        if (updatedQuestion.getName() != null) {
            question.setName(updatedQuestion.getName());
        }

        if (updatedQuestion.getCorrect() != null) {
            topic.setCorrect(topic.getCorrect() + updatedQuestion.getCorrect() - question.getCorrect());
            question.setCorrect(updatedQuestion.getCorrect());
        }

        if (updatedQuestion.getWrong() != null) {
            topic.setWrong(topic.getWrong() + updatedQuestion.getWrong() - question.getWrong());
            question.setWrong(updatedQuestion.getWrong());
        }

        if (updatedQuestion.getTime() != null) {
            topic.setTotalTime(topic.getTotalTime() + updatedQuestion.getTime() - question.getTotalTime());
            question.setTotalTime(updatedQuestion.getTime());
        }

        topicRepository.save(topic);

        return questionRepository.save(question);
    }

    public void remove(int questionId) {
        Question question = getById(questionId);
        Topic topic = question.getTopic();
        topic.setQuestionsCount(topic.getQuestionsCount() - 1);
        topic.setCorrect(topic.getCorrect() - question.getCorrect());
        topic.setWrong(topic.getWrong() - question.getWrong());
        topic.setTotalTime(topic.getTotalTime() - question.getTotalTime());
        topicRepository.save(topic);

        questionRepository.deleteById(questionId);
    }

}
