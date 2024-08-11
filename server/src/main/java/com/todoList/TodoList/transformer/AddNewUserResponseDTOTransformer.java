package com.todoList.TodoList.transformer;

import com.todoList.TodoList.responseDTO.AddNewUserResponseDTO;

public class AddNewUserResponseDTOTransformer {
    public static AddNewUserResponseDTO addNewUserResponseDTO(String userName, String msg){
        AddNewUserResponseDTO addNewUserResponseDTO = AddNewUserResponseDTO.builder()
                .userName(userName)
                .message(msg)
                .build();
        return addNewUserResponseDTO;
    }
}
