package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {

    Page<Topic> findAllByNameContainingIgnoreCase(Pageable pageable, String filter);

}