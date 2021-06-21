package ap.be.backend.services.mappers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ap.be.backend.dtos.createdtos.BussinesProcesCreateDto;
import ap.be.backend.dtos.editdtos.BussinesProcesEditDto;
import ap.be.backend.dtos.readdtos.BussinesProcesReadDto;
import ap.be.backend.models.BussinesProces;
import ap.be.backend.repositories.BussinesProcesRepository;

@Service
public class BussinesProcesMapper {
    
    @Autowired
    private BussinesProcesRepository bussinesProcesRepository;

    @Autowired
    private ModelMapper modelMapper;

    private Converter<BussinesProces, String> BussinesProcesToIdConverter() {
        return new Converter<BussinesProces, String>() {
            @Override
            public String convert(MappingContext<BussinesProces, String> ctx) {
                if(ctx.getSource() != null) {
                    return ctx.getSource().getId();
                } else {
                    return null;
                }
            }
        };
    }

    private Converter<String, BussinesProces> idToBussinesProcesConverter() {
        return new Converter<String, BussinesProces>() {
            @Override
            public BussinesProces convert(MappingContext<String, BussinesProces> ctx) {
                if(bussinesProcesRepository.existsById(ctx.getSource()))
                {
                    return bussinesProcesRepository.findById(ctx.getSource()).get();
                } else {
                    return null;
                }
            }
        };
    }

    public BussinesProcesReadDto convertToReadDto(BussinesProces bussinesProces) {
        modelMapper.addConverter(BussinesProcesToIdConverter());
        return modelMapper.map(bussinesProces, BussinesProcesReadDto.class);
    }

    public BussinesProces convertFromCreateDto(BussinesProcesCreateDto bussinesProcesCreateDto) {
        modelMapper.addConverter(idToBussinesProcesConverter());
        return modelMapper.map(bussinesProcesCreateDto, BussinesProces.class);
    }

    public BussinesProces convertFromEditDto(BussinesProcesEditDto BussinesProcesEditDto) {
        modelMapper.addConverter(idToBussinesProcesConverter());
        return modelMapper.map(BussinesProcesEditDto, BussinesProces.class);
    }
}
