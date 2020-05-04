package cz.michalstruna.questiongenerator.service;

import cz.michalstruna.questiongenerator.data.NewTopic;
import cz.michalstruna.questiongenerator.data.Topic;
import cz.michalstruna.questiongenerator.data.UpdatedTopic;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    private List<Topic> topics = new ArrayList<>();

    public Topic get(int topicId) {
        return topics.stream().filter(topic -> topic.getId() == topicId).findFirst().get();
    }

    public Topic[] getAll() {
        return topics.toArray(Topic[]::new);
    }

    public Topic add(NewTopic newTopic) {
        Topic topic = new Topic(topics.size(), newTopic.getName(), 0, 0, 0, 0);
        topics.add(topic);

        return topic;
    }

    public Topic update(int topicId, UpdatedTopic updatedTopic) {
        for (Topic topic : topics) {
            if (topic.getId() == topicId) {

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
                    topic.setTime(updatedTopic.getTime());
                }

                return topic;
            }
        }

        return null;
    }

    public void remove(int topicId) {
        Topic topic = get(topicId);
        topics.remove(topic);
    }

}
