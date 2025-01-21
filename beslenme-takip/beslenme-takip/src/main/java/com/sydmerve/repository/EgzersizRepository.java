package com.sydmerve.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sydmerve.entities.Egzersiz;

@Repository
public interface EgzersizRepository extends JpaRepository<Egzersiz, Long> {

}
