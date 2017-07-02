import React from 'react';
import PropTypes from 'prop-types';
import {Component} from "react/lib/ReactBaseClasses";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class ListContacts extends Component {
  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({query: query.trim()});
  };

  resetQuery = () => {
    this.setState({query: ''})
  };

  render() {
    const {contacts, onDeleteContact, onNavigate} = this.props;
    const {query} = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input className="search-contacts"
                 type="text"
                 placeholder="Query contacts"
                 value={query}
                 onChange={(event) => this.updateQuery(event.target.value)}/>
          <a href="#create" onClick={() => onNavigate()} className="add-contact">Add contact</a>
        </div>
        { showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.resetQuery}>Show all</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}>
              </div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className="contact-remove">
                remove
              </button>
            </li>
          ))}
        </ol>
      </div>)
  }
}

export default ListContacts;
