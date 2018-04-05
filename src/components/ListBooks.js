import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
	render() {
    const { bookShelves, booksReferenced, changeShelf } = this.props
		return (
			<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <div className="list-books-content">
            {bookShelves.map(bookShelf => (
              <div key={bookShelf.id}>
                <BookShelf
                  title={bookShelf.title}
                  bookShelf={bookShelf.id}
                  booksReferenced={booksReferenced}
                  changeShelf={changeShelf}
                />
              </div>
            ))}
          </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
		)
	}
}

export default ListBooks