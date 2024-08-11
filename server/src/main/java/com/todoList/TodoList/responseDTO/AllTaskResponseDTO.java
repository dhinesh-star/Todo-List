package com.todoList.TodoList.responseDTO;

import com.todoList.TodoList.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllTaskResponseDTO {
    private List<Task> taskList;
}
