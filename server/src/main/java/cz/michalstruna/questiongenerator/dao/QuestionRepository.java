package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Page<Question> findAllByNameContainingIgnoreCase(Pageable pageable, String filter);

    Page<Question> findAllByNameContainingIgnoreCaseAndTopic(String name, Topic topic, Pageable pageable);

}