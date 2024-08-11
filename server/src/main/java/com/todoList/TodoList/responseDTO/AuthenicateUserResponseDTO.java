package com.todoList.TodoList.responseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenicateUserResponseDTO {
    private String userName;
    private String message;
}
