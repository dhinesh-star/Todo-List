package com.todoList.TodoList.service;

import com.todoList.TodoList.entity.User;
import com.todoList.TodoList.repository.UserRepository;
import com.todoList.TodoList.requestDTO.AddNewUserDTO;
import com.todoList.TodoList.requestDTO.AuthenicateUserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public String addNewTask(AddNewUserDTO addNewUserDTO) throws Exception{
        User checkUserExist = userRepository.findUserByUserName(addNewUserDTO.getUserName());
        if(checkUserExist != null) return "User Already exist! Please enter other user";
        String rawPassword = addNewUserDTO.getPassword();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = bCryptPasswordEncoder.encode(rawPassword);
        User newUserCreated = new User();
        newUserCreated.setEmailId(addNewUserDTO.getEmailId());
        newUserCreated.setUserName(addNewUserDTO.getUserName());
        newUserCreated.setEncodedPassword(encodedPassword);
        userRepository.save(newUserCreated);
        return "New User Added Successfully";
    }
    public String authenicateUser(String userName, String rawPassword){
        User user = userRepository.findUserByUserName(userName);
        if(user!=null){
            String encodedPassword = user.getEncodedPassword();
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if(bCryptPasswordEncoder.matches(rawPassword, encodedPassword) == true){
                return "Authenicated User";
            }
            return "Invalid Password";
        }
        return "Username not found";
    }
}
