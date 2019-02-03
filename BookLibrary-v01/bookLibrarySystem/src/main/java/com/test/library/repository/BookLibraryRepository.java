package com.test.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.test.library.domain.BookLibrary;

public interface BookLibraryRepository extends JpaRepository<BookLibrary, Long>{

	BookLibrary getById(Long id);

}
