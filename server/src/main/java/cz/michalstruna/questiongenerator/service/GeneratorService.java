package cz.michalstruna.questiongenerator.service;

import cz.michalstruna.questiongenerator.dao.QuestionInstanceRepository;
import cz.michalstruna.questiongenerator.dao.QuestionRepository;
import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.QuestionInstance;
import cz.michalstruna.questiongenerator.model.dto.Answer;
import cz.michalstruna.questiongenerator.model.dto.AnswerCheck;
import cz.michalstruna.questiongenerator.model.dto.UpdatedQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeneratorService {

    @Autowired
    QuestionInstanceRepository questionInstanceRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    QuestionService questionService;

    public QuestionInstance generateQuestion(List<Integer> topicIds) {
        Question question = questionRepository.getRandom(topicIds).get(0);
        QuestionInstance instance = new QuestionInstance();
        instance.setStartTime(System.currentTimeMillis());
        instance.setQuestion(question);
        instance = questionInstanceRepository.save(instance);
        instance.getQuestion().setAnswer(null);
        return instance;
    }

    public AnswerCheck answerQuestion(int generatedQuestionId, Answer answer) {
        QuestionInstance instance = questionInstanceRepository.findById(generatedQuestionId).orElseThrow();

        String correctAnswer = instance.getQuestion().getAnswer();
        boolean isCorrect = isCorrectAnswer(answer.getValue(), instance.getQuestion().getAnswer());
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
        Pattern pattern = Pattern.compile("^" + correctAnswer.toLowerCase() + "$");
        Matcher matcher = pattern.matcher(answer);
        return matcher.matches();
    }

}
