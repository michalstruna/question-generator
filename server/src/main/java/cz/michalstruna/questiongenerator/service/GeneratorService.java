package cz.michalstruna.questiongenerator.service;

import cz.michalstruna.questiongenerator.dao.QuestionInstanceRepository;
import cz.michalstruna.questiongenerator.dao.QuestionRepository;
import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.QuestionInstance;
import cz.michalstruna.questiongenerator.model.dto.AnswerCheck;
import cz.michalstruna.questiongenerator.model.dto.UpdatedQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneratorService {

    @Autowired
    QuestionInstanceRepository questionInstanceRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    QuestionService questionService;

    public QuestionInstance generateQuestion(List<Integer> topicIds) {
        Question question = questionRepository.findById(1).orElseThrow();
        QuestionInstance instance = new QuestionInstance();
        instance.setStartTime(System.currentTimeMillis());
        instance.setQuestion(question);
        instance = questionInstanceRepository.save(instance);
        instance.getQuestion().setAnswer(null);
        return instance;
    }

    public AnswerCheck answerQuestion(int generatedQuestionId, String answer) {
        QuestionInstance instance = questionInstanceRepository.findById(generatedQuestionId).orElseThrow();

        String correctAnswer = instance.getQuestion().getAnswer();
        boolean isCorrect = isCorrectAnswer(answer, instance.getQuestion().getAnswer());
        int time = (int) (System.currentTimeMillis() - instance.getStartTime());

        UpdatedQuestion updatedQuestion = new UpdatedQuestion();
        updatedQuestion.setTime(instance.getQuestion().getTotalTime() + time);

        if (isCorrect) {
            updatedQuestion.setCorrect(instance.getQuestion().getCorrect() + 1);
        } else {
            updatedQuestion.setWrong(instance.getQuestion().getWrong() + 1);
        }

        questionInstanceRepository.deleteById(generatedQuestionId);
        questionService.update(instance.getQuestion().getId(), updatedQuestion);

        return new AnswerCheck(isCorrect, correctAnswer, time);
    }

    private boolean isCorrectAnswer(String answer, String correctAnswer) {
        return answer.equals(correctAnswer); // TODO: Lower case, remove spaces, regexp?
    }

}
