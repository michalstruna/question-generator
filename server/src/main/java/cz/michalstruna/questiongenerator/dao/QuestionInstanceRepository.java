package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.QuestionInstance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionInstanceRepository extends JpaRepository<QuestionInstance, Integer> {

}
