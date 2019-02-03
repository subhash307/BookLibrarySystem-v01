import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteBook } from "../../actions/bookAction";

class BooksList extends Component {

  onDeleteClick(book_id) {
    this.props.deleteBook(book_id);
  }
  render() {
    const { book } = this.props;
    return (
      <tbody>
        <tr>
          <th scope="row">{book.id}</th>
          <td>{book.bookName}</td>
          <td>{book.description}</td>
          <td>{book.author}</td>
          <td>{book.numberOfBooks}</td>
          <td>
            <Link to={`updateBook/${book.id}`} className="btn btn-secondary btn-sm">
              <i className="fa fa-edit" /> Edit
            </Link>
            <a href="/" className="btn btn-danger float-right btn-sm"  onClick={this.onDeleteClick.bind(this, book.id)}>
              <i className="fa fa-trash" /> Delete Book
            </a>
          </td>
        </tr>
      </tbody>
    );
  }
}

BooksList.propTypes = {
  deleteBook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(BooksList);
