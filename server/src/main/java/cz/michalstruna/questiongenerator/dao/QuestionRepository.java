package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.Question;
import cz.michalstruna.questiongenerator.model.database.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Page<Question> findAllByNameContainingIgnoreCase(String filter, Pageable pageable);

    Page<Question> findAllByNameContainingIgnoreCaseAndTopic(String name, Topic topic, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE question q SET q.correct = 0, q.wrong = 0, q.totalTime = 0 WHERE topic = :topic")
    void resetAllByTopic(Topic topic);

    @Query("SELECT q FROM question q WHERE q.topic.id IN :topicIds ORDER BY function('RAND')")
    List<Question> getRandom(@Param("topicIds") List<Integer> topicIds);

}