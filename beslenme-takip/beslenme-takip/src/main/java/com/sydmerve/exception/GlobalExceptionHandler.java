package com.sydmerve.exception;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.itextpdf.text.DocumentException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // KullaniciNotFoundException için özel handler
    @ExceptionHandler(KullaniciNotFoundException.class)
    public ResponseEntity<String> handleKullaniciNotFoundException(KullaniciNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // TarifNotFoundException için özel handler
    @ExceptionHandler(TarifNotFoundException.class)
    public ResponseEntity<String> handleTarifNotFoundException(TarifNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // EgzersizNotFoundException için özel handler
    @ExceptionHandler(EgzersizNotFoundException.class)
    public ResponseEntity<String> handleEgzersizNotFoundException(EgzersizNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // SuTuketimiNotFoundException için özel handler
    @ExceptionHandler(SuTuketimiNotFoundException.class)
    public ResponseEntity<String> handleSuTuketimiNotFoundException(SuTuketimiNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    
    // BeslenmeGunluguNotFoundException için özel handler
    @ExceptionHandler(BeslenmeGunluguNotFoundException.class)
    public ResponseEntity<String> handleBeslenmeGunluguNotFoundException(BeslenmeGunluguNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Genel bir Exception handler (isteğe bağlı)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>("Bir hata oluştu: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
    
    // Validation hatalarını yakalayan handler
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler({IOException.class, DocumentException.class})
    public ResponseEntity<String> handlePdfGenerationException(Exception ex) {
        return new ResponseEntity<>("PDF oluşturulurken bir hata oluştu: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(EgzersizPdfGenerationException.class)
    public ResponseEntity<String> handleEgzersizPdfGenerationException(EgzersizPdfGenerationException ex) {
        return new ResponseEntity<>("Egzersiz PDF'i oluşturulurken bir hata oluştu: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
