package cz.michalstruna.questiongenerator.controller;

import cz.michalstruna.questiongenerator.model.database.Topic;
import cz.michalstruna.questiongenerator.model.dto.NewTopic;
import cz.michalstruna.questiongenerator.model.dto.UpdatedTopic;
import cz.michalstruna.questiongenerator.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin("*")
public class TopicController {

    @Autowired
    TopicService topicService;

    @GetMapping("/{topicId}")
    public Topic get(@PathVariable int topicId) {
        return topicService.get(topicId);
    }

    @GetMapping(value = "/")
    public Page<Topic> getAll(Pageable pageable, @RequestParam(defaultValue = "", required = false) String filter) {
        return topicService.getAll(pageable, filter);
    }

    @PostMapping("/")
    public Topic add(@RequestBody NewTopic topic) {
        return topicService.add(topic);
    }

    @PutMapping("/{topicId}")
    public Topic update(@PathVariable("topicId") int id, @RequestBody NewTopic newTopic) {
        UpdatedTopic topic = new UpdatedTopic();
        topic.setName(newTopic.getName());

        return topicService.update(id, topic);
    }

    @PutMapping("/{topicId}/reset")
    public Topic reset(@PathVariable("topicId") int id) {
        return topicService.reset(id);
    }

    @DeleteMapping("/{topicId}")
    public void remove(@PathVariable("topicId") int id) {
        topicService.remove(id);
    }

}
