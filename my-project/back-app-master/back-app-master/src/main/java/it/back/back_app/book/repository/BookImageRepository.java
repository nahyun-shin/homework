package it.back.back_app.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.back.back_app.book.entity.BookImageEntity;

public interface BookImageRepository extends JpaRepository<BookImageEntity, Integer>{
    
}
