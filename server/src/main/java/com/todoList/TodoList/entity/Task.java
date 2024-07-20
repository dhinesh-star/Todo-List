package com.todoList.TodoList.entity;

import com.todoList.TodoList.enumPackage.Priority;
import com.todoList.TodoList.enumPackage.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private String id;

    @Indexed(unique = true)
    private String taskName;

    private String taskDescription;

    private Integer completedPercentage;

    private Long completionDate;

    private Priority priority;

    private Status status;
}