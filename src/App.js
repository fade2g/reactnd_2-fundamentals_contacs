import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    screen: 'list',   // Could be "Create" as well
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
      {this.state.screen === 'list' && (
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts}
          onNavigate={() => {
            this.setState({screen: 'create'})
          }}
        />
      )}
      {this.state.screen === 'create' && (
        <CreateContact />
      )}
    </div>
  }
}

export default App;
