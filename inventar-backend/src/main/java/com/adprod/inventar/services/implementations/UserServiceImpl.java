package com.adprod.inventar.services.implementations;

import com.adprod.inventar.models.LoginResponse;
import com.adprod.inventar.models.ResponseMessage;
import com.adprod.inventar.models.User;
import com.adprod.inventar.models.UserRequest;
import com.adprod.inventar.models.enums.Role;
import com.adprod.inventar.repositories.UserRepository;
import com.adprod.inventar.security.JwtManager;
import com.adprod.inventar.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final JwtManager jwtManager;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, JwtManager jwtManager, AuthenticationManager authenticationManager, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.repository = repository;
        this.jwtManager = jwtManager;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public ResponseEntity register(UserRequest request) {
        Optional<User> userOptional = repository.findByUsername(request.getUsername());
        if(userOptional.isEmpty()) {
            User user = new User(
                    request.getUsername(),
                    passwordEncoder.encode(request.getPassword()),
                    Role.USER
            );
            repository.save(user);
            return new ResponseEntity(new ResponseMessage("Registration Successful"), HttpStatus.OK);
        }
        return new ResponseEntity(new ResponseMessage("Username already in use"), HttpStatus.CONFLICT);
    }

    @Override
    public ResponseEntity login(UserRequest userRequest) {
        Optional<User> userOptional = repository.findByUsername(userRequest.getUsername());
        if(userOptional.isPresent()) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword()));
            final String jwt = jwtManager.createToken(userOptional.get());
            return new ResponseEntity(new LoginResponse(userRequest.getUsername(), jwt), HttpStatus.OK);
        }
        return new ResponseEntity(new ResponseMessage("An Error Occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity getAllUsers() {
        return null;
    }

    @Override
    public ResponseEntity deleteUser(String userID) {
        return null;
    }

    @Override
    public ResponseEntity<Object> updateUser(String newUsername, String username) {
        return null;
    }
}