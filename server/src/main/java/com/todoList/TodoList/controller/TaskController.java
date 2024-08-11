package com.todoList.TodoList.controller;

import com.todoList.TodoList.entity.Task;
import com.todoList.TodoList.requestDTO.AddTaskDTO;
import com.todoList.TodoList.requestDTO.StatusAndCompletionPercentageRequestDTO;
import com.todoList.TodoList.responseDTO.AllTaskResponseDTO;
import com.todoList.TodoList.responseDTO.ErrorResponseDTO;
import com.todoList.TodoList.responseDTO.TaskResponseTO;
import com.todoList.TodoList.service.TaskService;
import com.todoList.TodoList.transformer.AddTaskResponseDTOTransformer;
import com.todoList.TodoList.transformer.AllTaskResponseDTOTransformer;
import com.todoList.TodoList.transformer.ErrorResponseDTOTransformer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("task")
@Slf4j
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity addTask(@RequestBody AddTaskDTO addTaskDTO, @RequestParam("username") String userName){
        try {
            String newTaskAddedTaskId = taskService.addTask(addTaskDTO, userName);
            TaskResponseTO addTaskresponse = AddTaskResponseDTOTransformer.addTaskResponseDTOTransformer(newTaskAddedTaskId, "New TaskAdded Successfully");
            log.info(addTaskresponse.toString());
            return new ResponseEntity<>(addTaskresponse, HttpStatus.CREATED);
        }
        catch (Exception e){
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTOTransformer.errorResponseDTOTransformer(e.getMessage());
            log.warn(errorResponseDTO.toString());
            return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/delete")
    public ResponseEntity deleteTask(@RequestParam("taskId") String taskId){
        try{
            String responseMsg = taskService.deleteTask(taskId);
            TaskResponseTO deleteTaskResponse = AddTaskResponseDTOTransformer.addTaskResponseDTOTransformer(taskId, responseMsg);
            log.info(deleteTaskResponse.toString());
            return new ResponseEntity<>(deleteTaskResponse, HttpStatus.CREATED);
        }catch (Exception e){
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTOTransformer.errorResponseDTOTransformer(e.getMessage());
            log.warn(errorResponseDTO.toString());
            return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllTask")
    public ResponseEntity getAllTask(@RequestParam("username") String userName){
        try {
            List<Task> taskList = taskService.getAllTask(userName);
            AllTaskResponseDTO allTaskResponseDTO = AllTaskResponseDTOTransformer.allTaskResponseDTOTransformer(taskList);
            log.info(allTaskResponseDTO.toString());
            return new ResponseEntity<>(allTaskResponseDTO,HttpStatus.OK);
        }catch (Exception e){
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTOTransformer.errorResponseDTOTransformer(e.getMessage());
            log.warn(errorResponseDTO.toString());
            return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/updateBasedOnKey")
    public ResponseEntity updateBasedOnKey(@RequestParam("taskId")String taskId, @RequestParam("key") String key, @RequestParam("value") Object value){
        try{
            Task task = taskService.updateBasedOnKey(taskId, key, value);
            return new ResponseEntity<>(task, HttpStatus.OK);
        }catch (Exception e){
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTOTransformer.errorResponseDTOTransformer(e.getMessage());
            log.warn(errorResponseDTO.toString());
            return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getTaskBasedOnTaskId")
    public ResponseEntity getTaskBasedOnTaskId(@RequestParam("taskId") String taskId){
        try {
            Task task = taskService.getTaskBasedOnTaskId(taskId);
            return new ResponseEntity<>(task, HttpStatus.OK);
        }catch (Exception e){
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTOTransformer.errorResponseDTOTransformer(e.getMessage());
            log.warn(errorResponseDTO.toString());
            return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getTimeExceedTasks")
    public ResponseEntity getTimeExceedTasks(@RequestParam("username") String userName){
        try{
            List<Task> taskList = taskService.getTimeExceedTasks(userName);
            AllTaskResponseDTO allTaskResponseDTO = AllTaskResponseDTOTransformer.allTaskResponseDTOTransformer(taskList);
            log.info(allTaskResponseDTO.toString());
            return new ResponseEntity<>(allTaskResponseDTO, HttpStatus.OK);
        }catch (Exception e){
            ErrorResponseDTO errorResponseDTO = ErrorResponseDTOTransformer.errorResponseDTOTransformer(e.getMessage());
            log.warn(errorResponseDTO.toString());
            return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
        }
    }
}
