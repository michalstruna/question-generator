package cz.michalstruna.questiongenerator.service;

import cz.michalstruna.questiongenerator.dao.QuestionRepository;
import cz.michalstruna.questiongenerator.dao.TopicRepository;
import cz.michalstruna.questiongenerator.model.database.Topic;
import cz.michalstruna.questiongenerator.model.dto.NewTopic;
import cz.michalstruna.questiongenerator.model.dto.UpdatedTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Topic get(int topicId) {
        return topicRepository.findById(topicId).orElseThrow(); // TODO: 404
    }

    public Page<Topic> getAll(Pageable pageable, String filter) {
        return topicRepository.findAllByNameContainingIgnoreCase(pageable, filter);
    }

    public Topic add(NewTopic newTopic) {
        Topic topic = new Topic();
        topic.setName(newTopic.getName());
        topic.setCorrect(0);
        topic.setWrong(0);
        topic.setQuestionsCount(0);

        return topicRepository.save(topic);
    }

    public Topic reset(int topicId) {
        UpdatedTopic topic = new UpdatedTopic();
        topic.setCorrect(0);
        topic.setTime(0);
        topic.setWrong(0);

        Topic newTopic = update(topicId, topic);
        questionRepository.resetAllByTopic(newTopic);
        return newTopic;
    }

    public Topic update(int topicId, UpdatedTopic updatedTopic) {
        Topic topic = topicRepository.findById(topicId).orElseThrow();

        if (updatedTopic.getName() != null) {
            topic.setName(updatedTopic.getName());
        }

        if (updatedTopic.getCorrect() != null) {
            topic.setCorrect(updatedTopic.getCorrect());
        }

        if (updatedTopic.getQuestionsCount() != null) {
            topic.setQuestionsCount(updatedTopic.getQuestionsCount());
        }

        if (updatedTopic.getWrong() != null) {
            topic.setWrong(updatedTopic.getWrong());
        }

        if (updatedTopic.getTime() != null) {
            topic.setTotalTime(updatedTopic.getTime());
        }

        return topicRepository.save(topic);
    }

    public void remove(int topicId) {
        topicRepository.deleteById(topicId);
    }

}
