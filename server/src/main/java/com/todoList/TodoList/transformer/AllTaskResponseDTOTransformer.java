package com.todoList.TodoList.transformer;

import com.todoList.TodoList.entity.Task;
import com.todoList.TodoList.responseDTO.AllTaskResponseDTO;

import java.util.List;

public class AllTaskResponseDTOTransformer {
    public static AllTaskResponseDTO allTaskResponseDTOTransformer(List<Task> taskList){
        AllTaskResponseDTO allTaskResponseDTO = AllTaskResponseDTO.builder()
                .taskList(taskList)
                .build();
        return allTaskResponseDTO;
    }
}