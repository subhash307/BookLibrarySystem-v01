import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBook } from "../../actions/bookAction";
import classnames from "classnames";

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      description: "",
      author: "",
      numberOfBooks: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newBook = {
      bookName: this.state.bookName,
      description: this.state.description,
      author: this.state.author,
      numberOfBooks: this.state.numberOfBooks
    };
  //  console.log(newBook);
    this.props.addBook(newBook, this.props.history);

  }
  render() {
    const { errors } = this.state;
    return (
      <div className="addBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-light">
                Back to Board
              </Link>
              <h4 className="display-6 text-center">Add book to library </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.bookName
                    })}
                    name="bookName"
                    value={this.state.bookName}
                    placeholder="Enter book name"
                    onChange={this.onChange}
                  />
                  {errors.bookName && (
                    <div className="invalid-feedback">{errors.bookName}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    name="description"
                    value={this.state.description}
                    placeholder="Book Description"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.author
                    })}
                    name="author"
                    value={this.state.author}
                    placeholder="Write the book author"
                    onChange={this.onChange}
                  />
                  {errors.author && (
                    <div className="invalid-feedback">{errors.author}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    name="numberOfBooks"
                    value={this.state.numberOfBooks}
                    placeholder="Number of books"
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

AddBook.propTypes = {
  addBook: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBook }
)(AddBook);
