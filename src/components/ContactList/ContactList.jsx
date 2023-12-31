import PropTypes from 'prop-types';
import { List, Item, Btn, Contacts } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts } from 'redux/Contacts/Selectors';
import { getFilter } from 'redux/Contacts/FilterSlice';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const contactItem = () =>
    filter
      ? contacts.filter(({ name }) => name.toLowerCase().includes(filter))
      : contacts;

  return (
    <List>
      {contactItem().map(({ id, name, number }) => (
        <Item key={id}>
          <Contacts>
            {' '}
            {`${name}:`}
            <br />
            {`${number}`}
          </Contacts>
          {
            <Btn type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Btn>
          }
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
};
export default ContactList;
