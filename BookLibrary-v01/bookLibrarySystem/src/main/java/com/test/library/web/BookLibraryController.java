package com.test.library.web;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.library.domain.BookLibrary;
import com.test.library.service.BookLibraryService;

@RestController
@RequestMapping("/api/board")
@CrossOrigin
public class BookLibraryController {
	
	@Autowired
	private BookLibraryService bookLibraryService;
	
	@PostMapping("")
	public ResponseEntity<?> addBookToLibrary(@Valid @RequestBody BookLibrary bookLibrary, BindingResult result){
		
		if(result.hasErrors()) {
			Map<String, String> errorMap = new HashMap<>();
			
			for(FieldError error: result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		BookLibrary newBook = bookLibraryService.saveOrUpdate(bookLibrary);
		return new ResponseEntity<BookLibrary>(newBook, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public Iterable<BookLibrary> getAllBooks(){
		return bookLibraryService.findAll();
	}
	
	@GetMapping("/{book_id}")
	public ResponseEntity<?> getBookById(@PathVariable Long book_id){
		BookLibrary bookLibrary = bookLibraryService.findById(book_id);
		return new ResponseEntity<BookLibrary>(bookLibrary, HttpStatus.OK);
	}
	
	@DeleteMapping("/{book_id}")
	public ResponseEntity<?> deleteBook(@PathVariable Long book_id){
		bookLibraryService.delete(book_id);
		return new ResponseEntity<String>("Book got deleted", HttpStatus.OK);
	}
	@DeleteMapping("/delete-all")
	public ResponseEntity<?> deleteAllBooks() {
		bookLibraryService.deleteAllBooks();
		return new ResponseEntity<String>("All Books got deleted ", HttpStatus.OK);
	} 
	
}