import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

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
      <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
    </div>
  }
}

export default App;
