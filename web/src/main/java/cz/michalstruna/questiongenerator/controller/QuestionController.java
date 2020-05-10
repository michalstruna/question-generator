package cz.michalstruna.questiongenerator.controller;

import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.dto.NewQuestion;
import cz.michalstruna.questiongenerator.model.dto.UpdatedQuestion;
import cz.michalstruna.questiongenerator.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/{questionId}")
    public Question get(@PathVariable int questionId) {
        return questionService.get(questionId);
    }

    @GetMapping(value = "/")
    public Page<Question> getAll(
            Pageable pageable,
            @RequestParam(defaultValue = "", required = false) String nameFilter,
            @RequestParam(required = false) Integer topicIdFilter
    ) {
        if (topicIdFilter != null) {
            return questionService.getAllByTopic(pageable, nameFilter, topicIdFilter);
        } else {
            return questionService.getAll(pageable, nameFilter);
        }
    }

    @PostMapping("/")
    public Question add(@RequestBody NewQuestion question) {
        return questionService.add(question);
    }

    @PutMapping("/{questionId}")
    public Question update(@PathVariable("questionId") int id, @RequestBody NewQuestion newQuestion) {
        UpdatedQuestion question = new UpdatedQuestion();
        question.setName(newQuestion.getName());
        question.setAnswer(newQuestion.getAnswer());

        return questionService.update(id, question);
    }

    @PutMapping("/{questionId}/reset")
    public Question reset(@PathVariable("questionId") int id) {
        return questionService.reset(id);
    }

    @DeleteMapping("/{questionId}")
    public void remove(@PathVariable("questionId") int id) {
        questionService.remove(id);
    }

}
