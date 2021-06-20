package ap.be.backend.services.mappers;

import ap.be.backend.dtos.createdtos.ApplicationCreateDto;
import ap.be.backend.dtos.editdtos.ApplicationEditDto;
import ap.be.backend.dtos.readdtos.ApplicationReadDto;
import ap.be.backend.models.Application;
import ap.be.backend.repositories.ApplicationRepository;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationMapper {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ModelMapper modelMapper;

    private Converter<Application, String> ApplicationToIdConverter() {
        return new Converter<Application, String>() {
            @Override
            public String convert(MappingContext<Application, String> ctx) {
                if(ctx.getSource() != null) {
                    return ctx.getSource().getId();
                } else {
                    return null;
                }
            }
        };
    }

    private Converter<String, Application> idToApplicationConverter() {
        return new Converter<String, Application>() {
            @Override
            public Application convert(MappingContext<String, Application> ctx) {
                if(applicationRepository.existsById(ctx.getSource()))
                {
                    return applicationRepository.findById(ctx.getSource()).get();
                } else {
                    return null;
                }
            }
        };
    }

    public ApplicationReadDto convertToReadDto(Application application) {
        modelMapper.addConverter(ApplicationToIdConverter());
        return modelMapper.map(application, ApplicationReadDto.class);
    }

    public Application convertFromCreateDto(ApplicationCreateDto applicationCreateDto) {
        modelMapper.addConverter(idToApplicationConverter());
        return modelMapper.map(applicationCreateDto, Application.class);
    }

    public Application convertFromEditDto(ApplicationEditDto applicationEditDto) {
        modelMapper.addConverter(idToApplicationConverter());
        return modelMapper.map(applicationEditDto, Application.class);
    }
}
