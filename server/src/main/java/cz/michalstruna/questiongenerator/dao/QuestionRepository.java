package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface QuestionRepository extends JpaRepository<Question, Integer> {

}