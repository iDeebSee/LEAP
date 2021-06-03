package ap.be.backend.services;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.UserDto;
import ap.be.backend.models.Role;
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

        modelMapper.addConverter(new Converter<Role, String>() {
            @Override
            public String convert(MappingContext<Role, String> ctx) {
                return ctx.getSource() == null ? null : ctx.getSource().getName().name().toLowerCase();
            }
        });

        UserDto userDto = modelMapper.map(user, UserDto.class);

        return userDto;
    }
}
