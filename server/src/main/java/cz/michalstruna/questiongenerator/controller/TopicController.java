package cz.michalstruna.questiongenerator.controller;

import cz.michalstruna.questiongenerator.data.NewTopic;
import cz.michalstruna.questiongenerator.data.Topic;
import cz.michalstruna.questiongenerator.data.UpdatedTopic;
import cz.michalstruna.questiongenerator.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    TopicService topicService;

    @GetMapping("/{topicId}")
    public Topic get(@PathVariable int topicId) {
        return topicService.get(topicId);
    }

    @GetMapping("/")
    public Topic[] getAll() {
        return topicService.getAll();
    }

    @PostMapping("/")
    public Topic add(@RequestBody NewTopic topic) {
        return topicService.add(topic);
    }

    @PutMapping("/{id}")
    public Topic update(@PathVariable("id") int id, @RequestBody NewTopic newTopic) {
        UpdatedTopic topic = new UpdatedTopic();
        topic.setName(newTopic.getName());

        return topicService.update(id, topic);
    }

    @PutMapping("/{id}/reset")
    public Topic reset(@PathVariable("id") int id) {
        UpdatedTopic topic = new UpdatedTopic();
        topic.setCorrect(0);
        topic.setTime(0);
        topic.setWrong(0);

        return topicService.update(id, topic);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable("id") int id) {
        topicService.remove(id);
    }

}
