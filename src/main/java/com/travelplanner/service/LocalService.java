// LocalService.java
package com.travelplanner.service;

import com.travelplanner.model.Local;
import com.travelplanner.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;

    public List<Local> findAllLocais() {
        return localRepository.findAll();
    }

    public Optional<Local> findLocalById(Long id) {
        return localRepository.findById(id);
    }

    public Local saveLocal(Local local) {
        return localRepository.save(local);
    }

    public void deleteLocal(Long id) {
        localRepository.deleteById(id);
    }

    public List<Local> findLocaisByClient(String client) {
        return localRepository.findByClient(client);
    }
}
