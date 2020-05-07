package cz.michalstruna.questiongenerator.controller;

import cz.michalstruna.questiongenerator.model.database.QuestionInstance;
import cz.michalstruna.questiongenerator.model.dto.AnswerCheck;
import cz.michalstruna.questiongenerator.service.GeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("*")
public class GeneratorController {

    @Autowired
    GeneratorService generatorService;

    @GetMapping("/random")
    public QuestionInstance getRandom(@RequestParam List<Integer> topicIds) {
        return generatorService.generateQuestion(topicIds);
    }

    @PutMapping("/{generatedQuestionId}/answer")
    public AnswerCheck answer(@PathVariable int generatedQuestionId, @RequestBody String answer) {
        return generatorService.answerQuestion(generatedQuestionId, answer);
    }

}
