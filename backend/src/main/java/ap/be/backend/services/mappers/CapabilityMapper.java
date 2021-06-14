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
import ap.be.backend.repositories.CapabilityRepository;

@Service
public class CapabilityMapper {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CapabilityRepository capabilityRepository;

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

    public Capability convertFromCreateDto(CapabilityCreateDto newCapability) {
        modelMapper.addConverter(idToParentConverter());
        return modelMapper.map(newCapability, Capability.class);
    }

    public Capability convertFromEditDto(CapabilityEditDto capabilityEditDto) {
        modelMapper.addConverter(idToParentConverter());
        return modelMapper.map(capabilityEditDto, Capability.class);
    }

    public CapabilityReadDto convertToReadDto(Capability capability) {
        Condition<Capability, CapabilityReadDto> notNull = ctx -> ctx.getSource() != null;
        modelMapper.typeMap(Capability.class, CapabilityReadDto.class).addMappings(mapper -> mapper.when(notNull).map(src -> src.getParent().getId(), CapabilityReadDto::setParent));
        return modelMapper.map(capability, CapabilityReadDto.class);
    }
}
