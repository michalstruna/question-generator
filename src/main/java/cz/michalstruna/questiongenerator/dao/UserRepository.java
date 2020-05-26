package cz.michalstruna.questiongenerator.dao;

import cz.michalstruna.questiongenerator.model.database.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String name);

}