package com.todoList.TodoList.repository;

import com.todoList.TodoList.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task,String> {
    @Query(value = "{'completionDate' : {'$lt' : ?0}, 'userName' : ?1}")
    List<Task> getTimeExceedTasks(Long completionData, String userName);

    @Query(value ="{'userName' : ?0}")
    List<Task> getUsersTask(String userName);
}
