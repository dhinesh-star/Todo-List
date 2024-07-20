package com.todoList.TodoList.transformer;

import com.todoList.TodoList.responseDTO.ErrorResponseDTO;

public class ErrorResponseDTOTransformer {
    public static ErrorResponseDTO errorResponseDTOTransformer(String msg){
        ErrorResponseDTO errorResponseDTO = ErrorResponseDTO.builder()
                .errorMsg(msg)
                .build();
        return errorResponseDTO;
    }
}
