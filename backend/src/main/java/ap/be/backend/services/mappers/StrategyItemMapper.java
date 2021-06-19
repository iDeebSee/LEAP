package ap.be.backend.services.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.createdtos.StrategyItemCreateDto;
import ap.be.backend.dtos.editdtos.StrategyItemEditDto;
import ap.be.backend.dtos.readdtos.StrategyItemReadDto;
import ap.be.backend.models.Strategy;
import ap.be.backend.models.StrategyItem;
import ap.be.backend.repositories.StrategyRepository;

@Service
public class StrategyItemMapper {
    
    @Autowired
    private StrategyRepository strategyRepository;

    @Autowired
    private ModelMapper modelMapper;

    private Converter<Strategy, String> strategyToIdConverter() {
        return new Converter<Strategy, String>() {
            @Override
            public String convert(MappingContext<Strategy, String> ctx) {
                if(ctx.getSource() != null) {
                    return ctx.getSource().getId();
                } else {
                    return null;
                }
            }
        };
    }

    private Converter<String, Strategy> idToStrategyConverter() {
        return new Converter<String, Strategy>() {
            @Override
            public Strategy convert(MappingContext<String, Strategy> ctx) {
                if(strategyRepository.existsById(ctx.getSource()))
                {
                    return strategyRepository.findById(ctx.getSource()).get();
                } else {
                    return null;
                }
            }
        };
    }

    public StrategyItemReadDto convertToReadDto(StrategyItem strategyItem) {
        modelMapper.addConverter(strategyToIdConverter());
        return modelMapper.map(strategyItem, StrategyItemReadDto.class);
    }

    public StrategyItem convertFromCreateDto(StrategyItemCreateDto strategyItemCreateDto) {
        modelMapper.addConverter(idToStrategyConverter());
        return modelMapper.map(strategyItemCreateDto, StrategyItem.class);
    }

    public StrategyItem convertFromEditDto(StrategyItemEditDto strategyItemEditDto) {
        modelMapper.addConverter(idToStrategyConverter());
        return modelMapper.map(strategyItemEditDto, StrategyItem.class);
    }
}
