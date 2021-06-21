package ap.be.backend.services.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.createdtos.StrategyCreateDto;
import ap.be.backend.dtos.editdtos.StrategyEditDto;
import ap.be.backend.dtos.readdtos.StrategyReadDto;
import ap.be.backend.models.Environment;
import ap.be.backend.models.Strategy;
import ap.be.backend.repositories.EnvironmentRepository;

@Service
public class StrategyMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired 
    private EnvironmentRepository environmentRepository;

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

    private Converter<Environment, String> environmentToIdConverter() {
        return new Converter<Environment, String>() {
            @Override
            public String convert(MappingContext<Environment, String> ctx) {
                if(ctx.getSource() != null) {
                    return ctx.getSource().getId();
                } else {
                    return null;
                }
            }
        };
    }

    public Strategy convertFromCreateDto(StrategyCreateDto strategyCreateDto) {
        modelMapper.addConverter(idtoEnvironmentConverter());
        return modelMapper.map(strategyCreateDto, Strategy.class);
    }

    public Strategy convertFromEditDto(StrategyEditDto strategyEditDto) {
        modelMapper.addConverter(idtoEnvironmentConverter());
        return modelMapper.map(strategyEditDto, Strategy.class);
    }



    public StrategyReadDto convertToReadDto(Strategy strategy) {
        modelMapper.addConverter(environmentToIdConverter());
        return modelMapper.map(strategy, StrategyReadDto.class);
    }
}
