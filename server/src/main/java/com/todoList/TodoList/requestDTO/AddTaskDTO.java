package com.todoList.TodoList.requestDTO;

import com.todoList.TodoList.enumPackage.Priority;
import com.todoList.TodoList.enumPackage.Status;
import lombok.Data;

import java.util.Date;

@Data
public class AddTaskDTO {
    private String taskName;
    private String taskDescription;
    private Priority priority;
    private String completionDate; //Give the Date in the yyyy-MM-dd format
}
