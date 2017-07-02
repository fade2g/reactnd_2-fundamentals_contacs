import React, {Component} from 'react';
import ListContacts from './ListContacts';
import { Route } from 'react-router-dom';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts}); // short form for { contacts: contacts }
    })
  };

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((currentContact) => currentContact.id !== contact.id)
    }));

    ContactsAPI.remove(contact);  // remove from backend as well
  };

  render() {
    return <div>
      <Route exact path="/" render={() => (
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts}
        />
      )} />
      <Route path="/create" component={CreateContact} />
    </div>
  }
}

export default App;
