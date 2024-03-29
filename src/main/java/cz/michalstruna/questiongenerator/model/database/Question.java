package cz.michalstruna.questiongenerator.model.database;

import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.List;

@Entity(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    //@OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE, orphanRemoval = true)
    //private List<QuestionInstance> instances;

    @Column()
    private int correct;

    @Column
    private int wrong;

    @Column
    private int totalTime;

    @Column
    private String answer;

    @ManyToOne
    private Topic topic;

    @Formula("coalesce(100.0 * correct / NULLIF(correct + wrong, 0), 100.0)")
    private double success;

    @Formula("correct + wrong")
    private int answersCount;

    @Formula("coalesce(total_time / NULLIF(correct + wrong, 0), 0)")
    private double timePerAnswer;

    public Question() {

    }

    public Question(String name, String answer, Topic topic) {
        this.name = name;
        this.answer = answer;
        this.topic = topic;
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

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int time) {
        this.totalTime = time;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
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

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
