package cz.michalstruna.questiongenerator.model.dto;

public class UpdatedTopic extends NewTopic {

    private Integer questionsCount;
    private Integer correct;
    private Integer wrong;
    private Integer time;

    public UpdatedTopic() {
        super();
    }

    public Integer getQuestionsCount() {
        return questionsCount;
    }

    public void setQuestionsCount(Integer questionsCount) {
        this.questionsCount = questionsCount;
    }

    public Integer getCorrect() {
        return correct;
    }

    public void setCorrect(Integer correct) {
        this.correct = correct;
    }

    public Integer getWrong() {
        return wrong;
    }

    public void setWrong(Integer wrong) {
        this.wrong = wrong;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

}
