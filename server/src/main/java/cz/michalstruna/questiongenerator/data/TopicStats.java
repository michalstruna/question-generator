package cz.michalstruna.questiongenerator.data;

public class TopicStats extends Stats {

    protected int questionsCount;

    public TopicStats(int correct, int wrong, int time, int questionsCount) {
        super(correct, wrong, time);
        this.questionsCount = questionsCount;
    }

    public int getQuestionsCount() {
        return questionsCount;
    }

    public void setQuestionsCount(int questionsCount) {
        this.questionsCount = questionsCount;
    }

}