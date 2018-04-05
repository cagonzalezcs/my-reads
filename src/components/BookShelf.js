import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
	render() {
		const { title, bookShelf, booksReferenced, changeShelf } = this.props
		return (
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksReferenced.filter(book => book.shelf === bookShelf).map((book) => (
					<li key={book.id}>
						<Book
							book={book}
							changeShelf={changeShelf}
						/>
					</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
		)
	}
}

export default BookShelf