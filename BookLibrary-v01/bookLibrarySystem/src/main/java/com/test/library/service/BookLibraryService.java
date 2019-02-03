package com.test.library.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.library.domain.BookLibrary;
import com.test.library.repository.BookLibraryRepository;

@Service
public class BookLibraryService {
	
	@Autowired
	private BookLibraryRepository bookLibraryRepository;
	
	public BookLibrary saveOrUpdate(BookLibrary bookLibrary) {
		
		return bookLibraryRepository.save(bookLibrary);
	}

	public Iterable<BookLibrary> findAll() {
		return bookLibraryRepository.findAll();
	}

	public BookLibrary findById(Long book_id) {
		return bookLibraryRepository.getById(book_id);
	}

	public void delete(Long book_id) {
		BookLibrary bookLibrary = findById(book_id);
//		int numberOfBooks = bookLibrary.getNumberOfBooks()-1;
//		if(numberOfBooks > 0  ) {
//		bookLibrary.setNumberOfBooks(numberOfBooks);
//		bookLibraryRepository.save(bookLibrary);	
//		} else {
//			bookLibraryRepository.delete(bookLibrary);
//		}
		bookLibraryRepository.delete(bookLibrary);
		
	}

	public void deleteAllBooks() {
		
		bookLibraryRepository.deleteAll();
		
	}
	

}
