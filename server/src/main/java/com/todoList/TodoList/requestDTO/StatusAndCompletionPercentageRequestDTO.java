package com.todoList.TodoList.requestDTO;

import com.todoList.TodoList.enumPackage.Status;
import lombok.Data;

@Data
public class StatusAndCompletionPercentageRequestDTO {
    private String taskId;
    private Status status;
    private Integer completionPercentage;
}
