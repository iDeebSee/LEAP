package ap.be.backend.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.UserDto;
import ap.be.backend.models.User;
import ap.be.backend.repositories.UserRepository;

@Service
public class UserMapper {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    public UserDto convertToDTO(String id) {
        User user = userRepository.findById(id).orElseThrow(RuntimeException::new);

        UserDto userDto = modelMapper.map(user, UserDto.class);

        return userDto;
    }
}
