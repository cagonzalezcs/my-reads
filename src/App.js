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
        currentlyReading: [],
        booksQueried: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            console.log(books)
        })
    }
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookShelf />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks />
                )} />
            </div>
        )
    }
}

export default BooksApp
