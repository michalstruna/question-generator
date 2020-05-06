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
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicService topicService;

    public Question get(int questionId) {
        return questionRepository.findById(questionId).orElseThrow(); // TODO: 404
    }

    public Page<Question> getAll(Pageable pageable) {
        return questionRepository.findAll(pageable);
    }

    public Question add(NewQuestion newQuestion) {
        Question question = new Question();
        question.setName(newQuestion.getName());
        question.setCorrect(0);
        question.setWrong(0);
        question.setTotalTime(0);
        question.setAnswer(newQuestion.getAnswer());

        Topic topic = topicService.get(newQuestion.getTopicId());
        topic.setQuestionsCount(topic.getQuestionsCount() + 1);
        question.setTopic(topic);
        topicRepository.save(topic);

        return questionRepository.save(question);
    }

    public Question update(int questionId, UpdatedQuestion updatedQuestion) {
        Question question = questionRepository.findById(questionId).orElseThrow();

        if (updatedQuestion.getName() != null) {
            question.setName(updatedQuestion.getName());
        }

        if (updatedQuestion.getCorrect() != null) {
            question.setCorrect(updatedQuestion.getCorrect());
        }

        if (updatedQuestion.getWrong() != null) {
            question.setWrong(updatedQuestion.getWrong());
        }

        if (updatedQuestion.getTime() != null) {
            question.setTotalTime(updatedQuestion.getTime());
        }

        if (updatedQuestion.getTopicId() != null) {
            question.setTopic(topicService.get(updatedQuestion.getTopicId()));
        }

        remove(questionId);

        Topic topic = question.getTopic();
        topic.setQuestionsCount(topic.getQuestionsCount() + 1);
        topic.setCorrect(topic.getCorrect() + question.getCorrect());
        topic.setWrong(topic.getWrong() + question.getWrong());
        topic.setTotalTime(topic.getTotalTime() + question.getTotalTime());
        topicRepository.save(topic);

        return questionRepository.save(question);
    }

    public void remove(int questionId) {
        Question question = get(questionId);
        Topic topic = question.getTopic();
        topic.setQuestionsCount(topic.getQuestionsCount() - 1);
        topic.setCorrect(topic.getCorrect() - question.getCorrect());
        topic.setWrong(topic.getWrong() - question.getWrong());
        topic.setTotalTime(topic.getTotalTime() - question.getTotalTime());
        topicRepository.save(topic);

        questionRepository.deleteById(questionId);
    }

}
