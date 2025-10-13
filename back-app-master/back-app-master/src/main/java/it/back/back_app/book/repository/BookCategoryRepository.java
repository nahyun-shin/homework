package it.back.back_app.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import it.back.back_app.book.entity.BookCategoryEntity;

import java.util.List;
import java.util.Optional;

public interface BookCategoryRepository extends JpaRepository<BookCategoryEntity, Integer> {
    List<BookCategoryEntity> findAll();
}
