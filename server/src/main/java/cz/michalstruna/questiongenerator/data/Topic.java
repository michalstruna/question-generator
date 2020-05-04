package cz.michalstruna.questiongenerator.data;

public class Topic extends UpdatedTopic {

    private int id;

    public Topic(int id, String name, Integer questionsCount, Integer correct, Integer wrong, Integer time) {
        super(name, questionsCount, correct, wrong, time);
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}