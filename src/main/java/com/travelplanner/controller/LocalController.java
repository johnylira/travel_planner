// LocalController.java
package com.travelplanner.controller;

import com.travelplanner.model.Local;
import com.travelplanner.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locais")
public class LocalController {

    @Autowired
    private LocalService localService;

    @GetMapping
    public List<Local> getAllLocais() {
        return localService.findAllLocais();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Local> getLocalById(@PathVariable Long id) {
        return localService.findLocalById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Local> createLocal(@RequestBody Local local) {
        Local savedLocal = localService.saveLocal(local);
        return ResponseEntity.ok(savedLocal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocal(@PathVariable Long id) {
        localService.deleteLocal(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Local> updateLocal(@PathVariable Long id, @RequestBody Local localDetails) {
        return localService.findLocalById(id)
                .map(existingLocal -> {
                    // Aqui você pode atualizar as propriedades de existingLocal
                    // com os valores de localDetails, por exemplo:
                    existingLocal.setNome(localDetails.getNome());
                    // Continue com outras propriedades conforme necessário

                    Local updatedLocal = localService.saveLocal(existingLocal);
                    return new ResponseEntity<>(updatedLocal, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
