package cz.michalstruna.questiongenerator.model.dto;

public class NewQuestion {

    private String name;
    private String answer;
    private int topicId;

    public NewQuestion() {

    }

    public NewQuestion(String name, String answer, int topicId) {
        this.name = name;
        this.answer = answer;
        this.topicId = topicId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }
}
