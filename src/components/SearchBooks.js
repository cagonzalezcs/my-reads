import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book';
import * as BooksAPI from '../utils/BooksAPI'

class SearchBooks extends Component {
	state = {
		query: '',
		booksQueried: []
	}
	componentDidMount() {

	}
	/**
	 * @description Updates Query Property of this Component's State
     * 		uses callback function on setState to make an API through App.js
     *		which will send an array of objects, queried using the search function from BooksAPI,
     *		as a prop to SearchBooks Component
     * @param query - Value set by user input which will be used to query objects within BooksAPI
	 */
	updateQuery = (query) => {
		this.setState({ query: query },
		() => {
			this.findBooks(this.state.query)
		})
	}
	findBooks(query) {
        if(query) {
            BooksAPI.search(query).then( response => {
                if(response.error) {
                    this.setState( state => ({
                        booksQueried: []
                    }))
                } else {
                    this.setState( state => ({
                        booksQueried: response
                    }))
                }
                console.log(response)
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
						{/*
						NOTES: The search from BooksAPI is limited to a particular set of search terms.
						You can find these search terms here:
						https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
						However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
						you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.booksQueried.map((book) => (
							<li key={book.id}>
								<Book
									book={ book }
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks