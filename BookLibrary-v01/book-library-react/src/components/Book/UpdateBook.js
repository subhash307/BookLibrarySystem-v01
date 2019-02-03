import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBook, addBook } from "../../actions/bookAction";

class UpdateBook extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      bookName: "",
      description: "",
      author: "",
      numberOfBooks: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const updatedBook = {
      id: this.state.id,
      bookName: this.state.bookName,
      description: this.state.description,
      author: this.state.author,
      numberOfBooks: this.state.numberOfBooks
    };
    this.props.addBook(updatedBook, this.props.history);
  }
  componentDidMount() {
    const { book_id } = this.props.match.params;
    this.props.getBook(book_id);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, bookName, description, author, numberOfBooks } = nextProps.book;

    this.setState({
      id,
      bookName,
      description,
      author,
      numberOfBooks
    });
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="updateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="/" className="btn btn-light">
                Back to Board
              </a>
              <h4 className="display-6 text-center">Update book </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="bookName"
                    placeholder="Enter book name"
                    value={this.state.bookName}
                    onChange={this.onChange}
                  />
                  {
                    errors.summary && (
                      <div className="invalid-feedback">{errors.summary}</div>
                    )
                  }
                </div>
                <div className="form-group">
                  <textarea
                    type="text-area"
                    className="form-control form-control-lg"
                    name="description"
                    placeholder="Description about book"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="author"
                    placeholder="Enter author name"
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    name="numberOfBooks"
                    placeholder="Enter number of books"
                    value={this.state.numberOfBooks}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UpdateBook.propTypes = {
  book: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  book: state.book.book,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBook, addBook }
)(UpdateBook);
