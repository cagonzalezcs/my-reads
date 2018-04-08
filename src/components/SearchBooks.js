import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
	query = ''

	/**
    * @description updateQuery function will be called onChange of input search box in the component. Makes a call to searchQuery after updating query variable
    * @param {object} event - DOM event after user generated input in input element
    */
	updateQuery = (event) => {
		this.query = event.target.value
		this.searchQuery()
    }
    /**
    * @description clearQuery function called when user leaves the component using the <Link /> component element. Makes a call to searchQuery to empty the booksQueried.props element
    */
    clearQuery = () => {
    	this.query = ''
    	this.searchQuery()
    }
    /**
    * @description searchQuery function used to make a call to the searchAPI.props function. Uses the component's current query value.
    */
    searchQuery = () => {
    	this.props.searchAPI(this.query)
    }
	render() {
		const { booksQueried, changeShelf } = this.props
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to="/"
						className="close-search"
						onClick={this.clearQuery}
					>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={this.updateQuery}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{booksQueried && (
						<ol className="books-grid">
							{booksQueried.map( (book) => (
								<li key={book.id}>
									<Book
										book={ book }
										changeShelf={changeShelf}
									/>
								</li>
							))}
						</ol>
					)}
					{booksQueried.length === 0 && this.query !== '' && (
						<div className="no-results">Your Search Provided No Results</div>
					)}
				</div>
			</div>
		)
	}
}

export default SearchBooks