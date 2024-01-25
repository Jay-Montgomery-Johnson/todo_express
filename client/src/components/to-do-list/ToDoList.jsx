import { ToDoRow } from "../to-do-row/ToDoRow.jsx";
import { DeleteListButton } from '../delete-list-button/DeleteListButton.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export function ToDoList({items, listId, setListItems}) {
    //state
    let toDoListRow = <p>list-null</p>;
  
    if (items != null) {
    toDoListRow = items.map( row =>
      <Row>
        <ToDoRow ToDo={row.itemname} thisListId={listId} thisItemId={row.itemid} thisItemCompleted={row.completed} listItems={items} setListItems={setListItems}/>
      </Row>
    );
    
    let listContent;//these 3 lines should be inline conditional rendering in the return statement
    if (toDoListRow.length === 0) {
      toDoListRow = <DeleteListButton listId={listId}/>;
    }//
  
    }
    return (
    <div className="itemss">
    <div className='overall'>
    <div className='list'>
    <Container>
      {toDoListRow}
    </Container>
    </div>
    </div>
    </div>    
    );
  }