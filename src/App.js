import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class BooksApp extends Component {
    state = {
        booksReferenced: []
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
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ booksReferenced: books })
            console.log(this.state.booksReferenced)
        })
    }
    changeShelf(book, shelf) {
        BooksAPI.update(book, shelf).then((response) => {
            book.shelf = shelf;
            this.setState( state => ({
                booksReferenced: state.booksReferenced.filter(
                    item => item.id !== book.id
                ).concat([book])
            }))
        })
    }
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListBooks
                        bookShelves={this.bookShelves}
                        booksReferenced={this.state.booksReferenced}
                        changeShelf={this.changeShelf}
                    />
                )} />
                <Route path="/search" render={() => (
                    <SearchBooks
                        changeShelf={this.changeShelf}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
