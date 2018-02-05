import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class BooksApp extends Component {
    state = {
        read: [],
        wantToRead: [],
        currentlyReading: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            console.log(books)
        })
    }
    searchBooks(query) {
        BooksAPI.search('Linux').then((booksQueried) => {
            return booksQueried
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookShelf />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks
                        onSearchBooks={(query) => {
                            this.searchBooks(query)
                        }}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
