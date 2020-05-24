package cz.michalstruna.questiongenerator.model.dto;

import org.springframework.stereotype.Component;

public class Answer {

    private String value;

    public Answer() {

    }

    public Answer(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
