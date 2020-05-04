package cz.michalstruna.questiongenerator.controller;

import cz.michalstruna.questiongenerator.data.Topic;
import cz.michalstruna.questiongenerator.data.TopicStats;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

    @GetMapping("/topics")
    public Topic[] getAll() {
        return new Topic[]{
                new Topic("topicId", "TopicName", new TopicStats(1, 2, 3, 4))
        };
    }

}
