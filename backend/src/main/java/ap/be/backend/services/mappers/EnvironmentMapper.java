package ap.be.backend.services.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.createdtos.EnvironmentCreateDto;
import ap.be.backend.dtos.editdtos.EnvironmentEditDto;
import ap.be.backend.dtos.readdtos.EnvironmentReadDto;
import ap.be.backend.models.Environment;

@Service
public class EnvironmentMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public EnvironmentReadDto convertToReadDto(Environment environment) {
        return modelMapper.map(environment, EnvironmentReadDto.class);
    }

    public Environment convertFromCreateDto(EnvironmentCreateDto newEnvironment) {
        return modelMapper.map(newEnvironment, Environment.class);
    }

    public Environment convertFromEditDto(EnvironmentEditDto updatedEnvironment) {
        return modelMapper.map(updatedEnvironment, Environment.class);
    }
}
