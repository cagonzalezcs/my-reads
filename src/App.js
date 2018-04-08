import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class BooksApp extends Component {
    state = {
        booksReferenced: [],
        booksQueried: []
    }
    bookShelves = [
        {
            id: 'currentlyReading',
            title: 'Currently Reading'
        },
        {
            id: 'wantToRead',
            title: 'Want to Read'
        },
        {
            id: 'read',
            title: 'Read'
        }
    ]
    /**
    * @description componentDidMount Lifecycle hook to populate books already referenced by user in state variable booksReferenced with an array of objects of 'books' pulled from JSON response of the API
    */
    componentDidMount() {
        BooksAPI.getAll().then( (books) => {
            this.setState({ booksReferenced: books })
        })
    }
    /**
    * @description Makes a call to the BooksAPI to update the shelf that this book is assigned to. Takes a 'book' object and assigns the passed shelf value to it's shelf property. The State is then updated to review the books referenced, and the book is only added to the array of referenced books if it is not already in the array.
    * @param {object} book - book object which will have its shelf updated
    * @param {string} shelf - The Shelf that the Book will be added to
    */
    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then( (response) => {
            book.shelf = shelf;
            this.setState( (state) => ({
                booksReferenced: state.booksReferenced.filter(
                    item => item.id !== book.id
                ).concat([book])
            }))
        })
    }
    /**
    * @description Takes in a string 'query' and makes a call to the search function of BooksAPI. State variable, booksQueried, is then updated based on the response that is provided by the API. If the API returns an error, then the booksQueried state variable is updated to an empty array.
    * @param {string} query - String that will be queried in BooksAPI.search
    */
    searchAPI = (query) => {
        if(query) {
            BooksAPI.search(query).then( (response) => {
                if(response.error) {
                    this.setState( (state) =>({
                        booksQueried: []
                    }))
                } else {
                    this.setState( (state) =>({
                        booksQueried: response.map( (elem) => {
                            let book = this.state.booksReferenced.find( (book) => book.id === elem.id)
                            return book || elem
                        })
                    }))
                }
            })
        } else {
            this.setState( (state) =>({
                booksQueried: []
             }))
        }
    }
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks
                        booksReferenced={this.state.booksReferenced}
                        bookShelves={this.bookShelves}
                        changeShelf={this.changeShelf}
                    />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks
                        booksQueried={this.state.booksQueried}
                        changeShelf={this.changeShelf}
                        searchAPI={this.searchAPI}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
