package com.todoList.TodoList.requestDTO;

import lombok.Data;

@Data
public class AddNewUserDTO {
    private String emailId;
    private String userName;
    private String password;
}