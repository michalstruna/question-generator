package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface TopicRepository extends JpaRepository<Topic, Integer> {

}