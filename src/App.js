import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  };

  componentDidMount() {
    this.getBookShelf();
  }

  getBookShelf() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books,
        currentlyReading: books.filter(
          book => book.shelf === "currentlyReading"
        ),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      this.getBookShelf();
    });
  };

  render() {
    const { currentlyReading, wantToRead, read, books } = this.state;
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              updateShelf={this.updateShelf}
            />
          )}
        />

        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks updateShelf={this.updateShelf} books={books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
