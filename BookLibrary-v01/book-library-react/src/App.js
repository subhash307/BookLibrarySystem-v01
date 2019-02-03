import React, { Component } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import BookLibrary from "./components/BookLibrary";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AddBook from "./components/Book/AddBook";
import store from "./store";
import UpdateBook from "./components/Book/UpdateBook";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={BookLibrary} />
            <Route exact path="/addBook" component={AddBook} />
            <Route exact path="/updateBook/:book_id" component={UpdateBook} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
