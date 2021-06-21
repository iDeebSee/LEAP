package ap.be.backend.ControllerTests;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import ap.be.backend.models.Capability;
import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.services.CapabilityService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
public class CapabilityControllerTest {
    @Mock
    private CapabilityRepository capabilityRepository;

    @InjectMocks
    private CapabilityService capabilityService;

    @Test
    void findCapabilityById(){
        final String id ="1";
        final Capability capability = new Capability("test", "test capability 1", null, null);

        given(capabilityRepository.findById(id)).willReturn(Optional.of(capability));

        final Optional<Capability> expected  = capabilityService.findCapabilityById(id);
        assertThat(expected).isNotNull();
    }

    @Test
    void returnAllCapabilities() {
        
        List<Capability> capabilities = new ArrayList<>();
        capabilities.add(new Capability("test1", "test capability 1", null, null));
        capabilities.add(new Capability("test2", "test capability 2", null, null));
        capabilities.add(new Capability("test3", "test capability 3", null, null));
        capabilities.add(new Capability("test4", "test capability 4", null, null));

        given(capabilityRepository.findAll()).willReturn(capabilities);

        List<Capability> expected = capabilityService.findAllCapabilities();

        assertEquals(expected, capabilities);
    }

    @Test
    void updateCapability() {
        final Capability capability = new Capability("test1", "test capability 1", null, null);

        given(capabilityRepository.save(capability)).willReturn(capability);

        final Capability expected = capabilityService.updateCapability(capability);

        assertThat(expected).isNotNull();

        verify(capabilityRepository).save(any(Capability.class));
    }

    @Test
    void deleteCapability() {
        final String id="1";

        capabilityService.deleteCapabilityById(id);
        capabilityService.deleteCapabilityById(id);
        
        verify(capabilityRepository, times(2)).deleteById(id);
        
    }

    @Test
    void addCapability() {
        final Capability capability = new Capability("test1", "test capability 1", null, null);

        given(capabilityRepository.save(capability)).willAnswer(invocation -> invocation.getArgument(0));

        Capability savedCapability = capabilityService.addCapability(capability);

        assertThat(savedCapability).isNotNull();

        verify(capabilityRepository).save(any(Capability.class));
        

    }
}
