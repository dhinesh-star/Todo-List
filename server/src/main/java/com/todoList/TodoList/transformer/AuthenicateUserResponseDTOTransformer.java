package com.todoList.TodoList.transformer;

import com.todoList.TodoList.requestDTO.AuthenicateUserRequestDTO;
import com.todoList.TodoList.responseDTO.AuthenicateUserResponseDTO;

public class AuthenicateUserResponseDTOTransformer {
    public static AuthenicateUserResponseDTO authenicateUserResponseDTO(String userName, String message){
        AuthenicateUserResponseDTO authenicateUserResponseDTO = AuthenicateUserResponseDTO.builder()
                .userName(userName)
                .message(message)
                .build();
        return authenicateUserResponseDTO;
    }
}
