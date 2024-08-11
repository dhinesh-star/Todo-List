package com.todoList.TodoList.transformer;

import com.todoList.TodoList.responseDTO.TaskResponseTO;

public class AddTaskResponseDTOTransformer {
    public static TaskResponseTO addTaskResponseDTOTransformer(String taskId, String msg){
        TaskResponseTO addResponseDTO = TaskResponseTO.builder()
                .taskId(taskId)
                .message(msg)
                .build();
        return addResponseDTO;
    }
}
