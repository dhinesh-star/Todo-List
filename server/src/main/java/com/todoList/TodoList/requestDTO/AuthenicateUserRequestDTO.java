package com.todoList.TodoList.requestDTO;

import lombok.Data;

@Data
public class AuthenicateUserRequestDTO {
    private String userName;
    private String password;
}
