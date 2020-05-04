package cz.michalstruna.questiongenerator.data;

public class Stats {

    protected int correct;
    protected int wrong;
    protected int time;

    public Stats(int correct, int wrong, int time) {
        this.correct = correct;
        this.wrong = wrong;
        this.time = time;
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

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }
}