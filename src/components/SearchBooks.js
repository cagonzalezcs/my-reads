import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'

class SearchBooks extends Component {
	query = ''
	state = {
		booksQueried: []
	}

	searchAPI = (event) => {
		this.query = event.target.value

		if(this.query) {
            BooksAPI.search(this.query).then( (response) => {
                if(response.error) {
                    this.setState( state => ({
                        booksQueried: []
                    }))
                } else {
                    this.setState( (state) => ({
                        booksQueried: response.map( (elem) => {
                        	let bookReferenced = this.props.booksReferenced.find( (bookReferenced) => bookReferenced.id === elem.id )
                        	return bookReferenced || elem
                        })
                    }))
                }
            })
        } else {
        	this.setState( state => ({
            	booksQueried: []
            }))
        }
    }
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to="/"
						className="close-search"
					>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={this.searchAPI}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{this.state.booksQueried && (
						<ol className="books-grid">
							{this.state.booksQueried.map( (book) => (
								<li key={book.id}>
									<Book
										book={ book }
										changeShelf={this.props.changeShelf}
									/>
								</li>
							))}
						</ol>
					)}
					{this.state.booksQueried.length === 0 && this.query !== '' && (
						<div className="no-results">Your Search Provided No Results</div>
					)}
				</div>
			</div>
		)
	}
}

export default SearchBooks