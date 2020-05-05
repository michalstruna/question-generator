package cz.michalstruna.questiongenerator.model.dto;

public class NewTopic {

    protected String name;

    public NewTopic() {

    }

    public NewTopic(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
