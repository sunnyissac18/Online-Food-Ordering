package com.sunny.service;

import com.sunny.config.JwtProvider;
import com.sunny.model.User;
import com.sunny.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {

        String email=jwtProvider.getEmailFromJwtToken(jwt);
        User user =userRepository.findFirstByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user =userRepository.findFirstByEmail(email);
        if(user==null){
            throw new Exception("User Not Found");
        }
        return user;
    }
}
