package ap.be.backend.services.mappers;

import org.modelmapper.Condition;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.createdtos.CapabilityCreateDto;
import ap.be.backend.dtos.editdtos.CapabilityEditDto;
import ap.be.backend.dtos.readdtos.CapabilityReadDto;
import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;
import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvironmentRepository;

@Service
public class CapabilityMapper {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CapabilityRepository capabilityRepository;

    @Autowired
    private EnvironmentRepository environmentRepository;

    private Converter<String, Capability> idToParentConverter() {
        return new Converter<String, Capability>() {
            @Override
            public Capability convert(MappingContext<String, Capability> ctx) {
                if(capabilityRepository.existsById(ctx.getSource())) {
                    return capabilityRepository.findById(ctx.getSource()).get();
                } else {
                    return null;
                }
            }
        };
    }

    private Converter<String, Environment> idtoEnvironmentConverter() {
        return new Converter<String, Environment>() {
            @Override
            public Environment convert(MappingContext<String, Environment> ctx) {
                if(environmentRepository.existsById(ctx.getSource())) {
                    return environmentRepository.findById(ctx.getSource()).get();
                } else {
                    return null;
                }
            }
        };
    }

    private Converter<Capability, String> parentToIdConverter() {
        return new Converter<Capability, String>() {
            @Override
            public String convert(MappingContext<Capability, String> ctx) {
                if(ctx.getSource() != null) {
                    return ctx.getSource().getId();
                } else {
                    return null;
                }
            }
        };
    }

    public Capability convertFromCreateDto(CapabilityCreateDto newCapability) {
        modelMapper.addConverter(idtoEnvironmentConverter());
        return modelMapper.map(newCapability, Capability.class);
    }

    public Capability convertFromEditDto(CapabilityEditDto capabilityEditDto) {
        modelMapper.addConverter(idToParentConverter());
        modelMapper.addConverter(idtoEnvironmentConverter());
        return modelMapper.map(capabilityEditDto, Capability.class);
    }

    public CapabilityReadDto convertToReadDto(Capability capability) {
        modelMapper.addConverter(parentToIdConverter());
        return modelMapper.map(capability, CapabilityReadDto.class);
    }
}
