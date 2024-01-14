import './App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import { BsTrash, BsCheck, BsPlusLg } from 'react-icons/bs';

function App() {
  return (
  <div className='App'>
    
    <Pages/>
  </div>
  );
}

function Pages() {
  //state
  const [data, setData] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);
  //Fetch data
  useEffect(() => {
    fetch('http://localhost:8080/list',{    
      method: 'GET'  
    })
      .then((response) => response.json())
      .then((json) => {setData(json)})
      .catch((error) => console.error(error));
  }, []);

  console.log('dat: ');
  console.log(data);
  console.log('end');
  let listItems =  LISTS.lists.map(list =>
    <Tab.Pane eventKey={list.listName}><ToDoList key={list.listName} listData={list.items} listId={9}/></Tab.Pane>
  );
  let tabNames = LISTS.lists.map(list => list.listName);
  //process data into props that can be passed down
  if (data != null) {
  listItems =  data.lists.map(list =>
    <Tab.Pane eventKey={list.listName}><ToDoList key={list.listName} listData={list.items} listId={list.listId}/></Tab.Pane>
  );
  tabNames = data.lists.map(list => list.listName);
  }

  //test to api add item
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'new todo',  list: currentTab})
  };
  function func() {
    console.log('new todo');
  fetch('http://localhost:8080/new_todo', requestOptions)
    .then(response => response.json());
    console.log(currentTab + ":tabName");
  }

  //return component
  return (
  <div className="list-tabs">
  <Tab.Container id="lt" defaultActiveKey="first" activeKey={currentTab}
      onSelect={(k) => {setCurrentTab(k)}}>
    <ListTabs tabs={tabNames}/>
    <hr/>  
    <Tab.Content>
      {listItems}
    </Tab.Content>
    <div className='enter'>
      <ToDoEnter func={func}/>
    </div>
  </Tab.Container>
  </div>
  );
}

function ToDoList({listData, listId}) {
  let ToDo = "fhfh";
  let toDoListRow = listData.map( row =>
    <Row>
      <ToDoRow ToDo={row.itemName} thisListId={listId} thisItemId={row.itemId}/>
    </Row>
  );
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

function ToDoRow({ToDo, thisListId, thisItemId}) {
  const completeData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'complete', listId: thisListId, itemId: thisItemId})
  };
  const deleteData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item: 'deleted', listId: thisListId, itemId: thisItemId})
  };
  function complete() {
    fetch('http://localhost:8080/complete', completeData)
    .then(response => response.json());
    console.log('data');
  }
  function deleteToDo() {
    fetch('http://localhost:8080/delete', deleteData)
    .then(response => response.json());
    console.log('data');
  }
  

  return(
  <Stack direction="horizontal" gap={2}>
    <p className="itemText me-auto">{ToDo}</p>
    <Button variant="success" onClick={complete.bind()}><BsCheck/></Button>
    <Button variant="danger" onClick={deleteToDo.bind()}> <BsTrash/></Button>
  </Stack>
  );
}

function ListTabs({tabs}) {
  let listItems = tabs.map(tab =>
    <Nav.Item>
      <Nav.Link eventKey={tab}>{tab}</Nav.Link>
    </Nav.Item>
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'new tab' })
  };
  function func() {
    fetch('http://localhost:8080/add_item', requestOptions)
  }

  return(
  <Nav variant="underline">
    {listItems}
    <Button variant="link" onClick={func.bind()}><BsPlusLg/></Button>
  </Nav>
  );
}

function ToDoEnter({func}) {
  
  return(
  <Stack direction="horizontal" gap={2} className="align-bottom">
    
      <Form.Control type="add-todo" className="me-auto" placeholder="New ToDo"  />
      <Button variant="primary" type="submit" onClick={func.bind()}><BsPlusLg/></Button>
    
  </Stack>
  );
}

const LISTS = {"lists":[{listName:"liuu33", items:[{itemName:"a",completed:false},{itemName:"b",completed:false},{itemName:"c",completed:false}]},
{listName:"listB", items:[{itemName:"d",completed:false},{itemName:"e",completed:false}]}]};


export default App;
