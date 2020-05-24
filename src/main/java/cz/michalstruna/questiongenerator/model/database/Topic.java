package cz.michalstruna.questiongenerator.model.database;

import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.List;

@Entity(name = "topic")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column()
    private int correct;

    @Column
    private int wrong;

    @Column
    private int questionsCount;

    @Column
    private int totalTime;

    @Formula("coalesce(100 * correct / NULLIF(correct + wrong, 0), 100)")
    private double success;

    @Formula("correct + wrong")
    private int answersCount;

    @Formula("coalesce(total_time / NULLIF((correct + wrong), 0), 0)")
    private double timePerAnswer;

    //@OneToMany(mappedBy = "topic", cascade = CascadeType.REMOVE, orphanRemoval = true)
    //private List<Question> questions;

    public Topic() {

    }

    public Topic(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public int getWrong() {
        return wrong;
    }

    public void setWrong(int wrong) {
        this.wrong = wrong;
    }

    public int getQuestionsCount() {
        return questionsCount;
    }

    public void setQuestionsCount(int questionsCount) {
        this.questionsCount = questionsCount;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int time) {
        this.totalTime = time;
    }

    public double getSuccess() {
        return success;
    }

    public int getAnswersCount() {
        return answersCount;
    }

    public double getTimePerAnswer() {
        return timePerAnswer;
    }

}
