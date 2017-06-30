import React from 'react';


/* stateless functional component
   - Only a function
   - props is first argument
   - works for components with only render method
   - function returns the jsx code
*/
function ListContacts(props) {
  return <ol className="contact-list">
    {props.contacts.map(contact => (
      <li key={contact.id} className="contact-list-item">
        <div className="contact-avatar" style={{
          backgroundImage: `url(${contact.avatarURL})`
        }}>
        </div>
        <div className="contact-details">
          <p>{contact.name}</p>
          <p>{contact.email}</p>
        </div>
        <button className="contact-remove">
          remove
        </button>
      </li>
    ))}
  </ol>
}

export default ListContacts;
