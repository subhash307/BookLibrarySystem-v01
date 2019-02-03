import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksList from "./Book/BooksList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBacklog, getBook, deleteAllBooks } from "../actions/bookAction";

class BookLibrary extends Component {

  onDeleteClick(){
    this.props.deleteAllBooks();
  }

  componentDidMount() {
    this.props.getBacklog();
  }

  // handleClick(books){


  //  let searchItem = document.getElementById("srch").value;
  //  books.map((book) => (
  //    searchItem == book.id ? this.props.getBook(searchItem, this.props.history) :""
  //  //console.log(book.id==searchItem)
  //   // searchItem == book.id ? console.log("hello") :console.log("hi")
  //  ))
  // }
  render() {
    //  console.log(state.book);

    const { books } = this.props.books;
    let LibraryContent;
    let bookItems = [];

    const LibraryAlgorithm = books => {
      if (books.length < 1) {
        return (
          <div className="alert alert-info text-center" role="alert">
            No book available on this library.
          </div>
        );
      } else {
        const library = books.map(book => (
          <BooksList key={book.id} book={book} />
        ));

        for (let i = 0; i < library.length; i++) {
          bookItems.push(library[i]);
        }
        return (
          <React.Fragment>
          {
		       // 		<input ref="search" id="srch" type="search" placeholder="Search criteria"/>
		        //		<button onClick={this.handleClick.bind(this, books)}>Go</button>
          }
          <a id="myDiv" href="/" disabled={true} className="btn btn-danger float-right mb-3" 
          onClick={this.onDeleteClick.bind(this)}>
              <i className="fa fa-trash" /> Delete all books
            </a>

            <table className="table table-bordered table-striped">
              <thead className="table-secondary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Book Name</th>
                  <th scope="col" className="column-width">Description</th>
                  <th scope="col">Author</th>
                  <th scope="col">Number of books</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {bookItems}
            </table>
          </React.Fragment>
        );
      }
    };
    LibraryContent = LibraryAlgorithm(books);
    return (
      <div className="container">
        <Link to="./addBook" className="btn btn-info mb-3">
          <i className="fas fa-plus-circle" /> Add new book
        </Link>

        <hr />
        {LibraryContent}
      </div>
    );
  }
}
BookLibrary.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  getBook: PropTypes.func.isRequired,
  deleteAllBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  books: state.book
});

export default connect(
  mapStateToProps,
  { getBacklog, getBook, deleteAllBooks }
)(BookLibrary);
