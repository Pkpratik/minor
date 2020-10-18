import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props){
        super(props);
        console.log("this"+props);
        this.state = {
            selected: null
        }
    }
    displayBooks(){
        console.log(this.props);
        console.log(this.props.data);
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading books...</div> );
        } else {
            console.log(">>>>>>>>>>>>>"+data.books)
            return data.books.map(book => {
                return(
                    <li key={ book.id } onClick={ (e) => this.setState({ selected: book.id }) }>{ book.name }</li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetails bookId={ this.state.selected } />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
