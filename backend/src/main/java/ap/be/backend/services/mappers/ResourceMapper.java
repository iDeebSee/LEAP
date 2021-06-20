package ap.be.backend.services.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.createdtos.ResourceCreateDto;
import ap.be.backend.dtos.editdtos.ResourceEditDto;
import ap.be.backend.dtos.readdtos.ResourceReadDto;
import ap.be.backend.models.Resource;
import ap.be.backend.repositories.ResourceRepository;

@Service
public class ResourceMapper {
    
    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private ModelMapper modelMapper;

    private Converter<Resource, String> resourceToIdConverter() {
        return new Converter<Resource, String>() {
            @Override
            public String convert(MappingContext<Resource, String> ctx) {
                if(ctx.getSource() != null) {
                    return ctx.getSource().getId();
                } else {
                    return null;
                }
            }
        };
    }

    private Converter<String, Resource> idToResourceConverter() {
        return new Converter<String, Resource>() {
            @Override
            public Resource convert(MappingContext<String, Resource> ctx) {
                if(resourceRepository.existsById(ctx.getSource()))
                {
                    return resourceRepository.findById(ctx.getSource()).get();
                } else {
                    return null;
                }
            }
        };
    }

    public ResourceReadDto convertToReadDto(Resource resource) {
        modelMapper.addConverter(resourceToIdConverter());
        return modelMapper.map(resource, ResourceReadDto.class);
    }

    public Resource convertFromCreateDto(ResourceCreateDto resourceCreateDto) {
        modelMapper.addConverter(idToResourceConverter());
        return modelMapper.map(resourceCreateDto, Resource.class);
    }

    public Resource convertFromEditDto(ResourceEditDto resourceEditDto) {
        modelMapper.addConverter(idToResourceConverter());
        return modelMapper.map(resourceEditDto, Resource.class);
    }
}
