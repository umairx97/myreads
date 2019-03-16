import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    searchText: "",
    filteredBooks: this.props.books
  };

  updateSearch = event => {
    // this.setState({ searchText: text.trim() });

    this.setState(
      {
        searchText: event.target.value.trim()
      },
      () => {
        if (this.state.searchText.length > 0 && this.state.filteredBooks) {
          BooksAPI.search(this.state.searchText, 40).then(books => {
            this.setState({
              filteredBooks: books
            });
          });
        } else {
          this.setState({
            filteredBooks: this.props.books
          });
        }
      }
    );
  };

  render() {
    const { updateShelf } = this.props;
    return (
      <div className="search-books">

        {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={event => this.updateSearch(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <h2 className="bookshelf-title">Searched Books:</h2>

          <ol className="books-grid">
            {this.state.filteredBooks.length > 0 &&
              this.state.filteredBooks.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          onChange={event =>
                            updateShelf(book, event.target.value)
                          }
                        >
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option
                            value="currentlyReading"
                            selected={book.shelf === "currentlyReading"}
                          >
                            Currently Reading
                          </option>
                          <option
                            value="wantToRead"
                            selected={book.shelf === "wantToRead"}
                          >
                            Want to Read
                          </option>
                          <option value="read" selected={book.shelf === "read"}>
                            Read
                          </option>
                          <option value="none" selected={book.shelf === "none"}>
                            None
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
