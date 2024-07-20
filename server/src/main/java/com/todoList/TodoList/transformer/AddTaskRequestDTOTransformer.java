package com.todoList.TodoList.transformer;

import com.todoList.TodoList.entity.Task;
import com.todoList.TodoList.enumPackage.Status;
import com.todoList.TodoList.requestDTO.AddTaskDTO;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

public class AddTaskRequestDTOTransformer {
    public static Task addTaskRequestDTOTransformer(AddTaskDTO addTaskDTO) throws ParseException {
        //Convert Date to epoch Time
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = formatter.parse(addTaskDTO.getCompletionDate());
        Instant instant = date.toInstant();
        long epochTime = instant.getEpochSecond();


        Task task = Task.builder()
                .taskName(addTaskDTO.getTaskName())
                .taskDescription(addTaskDTO.getTaskDescription())
                .priority(addTaskDTO.getPriority())
                .completionDate(epochTime)
                .status(Status.Todo)
                .completedPercentage(0)
                .build();

        return task;
    }
}
