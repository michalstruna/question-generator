package cz.michalstruna.questiongenerator.model.dto;

public class AnswerCheck {

    private boolean isCorrect;
    private String correctAnswer;
    private long totalTime;

    public AnswerCheck() {

    }

    public AnswerCheck(boolean isCorrect, String correctAnswer, long totalTime) {
        this.isCorrect = isCorrect;
        this.correctAnswer = correctAnswer;
        this.totalTime = totalTime;
    }

    public boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(long totalTime) {
        this.totalTime = totalTime;
    }
}
