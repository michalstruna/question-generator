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
    public Page<Question> getAll(Pageable pageable) {
        return questionService.getAll(pageable);
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
        question.setTopicId(newQuestion.getTopicId());

        return questionService.update(id, question);
    }

    @PutMapping("/{topicId}/reset")
    public Question reset(@PathVariable("questionId") int id) {
        UpdatedQuestion question = new UpdatedQuestion();
        question.setCorrect(0);
        question.setTime(0);
        question.setWrong(0);

        return questionService.update(id, question);
    }

    @DeleteMapping("/{questionId}")
    public void remove(@PathVariable("questionId") int id) {
        questionService.remove(id);
    }

}
