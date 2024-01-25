//import { useAuth0 } from "@auth0/auth0-react";
const SERVER = process.env.REACT_APP_SERVER;

export let getListItems = (listId, token) => fetch(`${SERVER}items`,
{
  method: 'GET',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, id:listId}
});

export let getMaxId = (listId, token) => fetch(`${SERVER}max_id`,
{
  method: 'GET',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` ,id:listId}
});

export let getTabs = (token) => fetch(`${SERVER}list`,
{
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': 'http://localhost:3000/'}
});

export let newToDo = (currentTab, todoText, token) => { 
    fetch(`${SERVER}new_todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}`},
        body: JSON.stringify({ action: 'new todo',  listId: currentTab, text: todoText})
    });
};

export let newList = (Name, token) => {
    fetch(`${SERVER}new_list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}`},
        body: JSON.stringify({ name: Name })
    })
};

export let completeToDo = (listId, itemId, boolComplete, setItems, token) => {
    //console.log(token);
    fetch(`${SERVER}complete`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}`,},
        body: JSON.stringify({ action: 'complete', listId: listId, itemId: itemId, completed: !boolComplete})
    }).then(
    setItems(items => {
        return items.map(item => {if (item.itemid === itemId) {item.completed = !boolComplete}; return item; });
    })).catch(error => console.log(error));
};

export let deleteToDo = (listId, itemId, setItems, token) => {
    fetch(`${SERVER}delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify({ item: 'deleted', listId: listId, itemId: itemId})
    });
    setItems(items => {
        return items.filter(item => item.itemid !== itemId)
    });
};

export let deleteList = (listId, token) => {
    fetch(`${SERVER}delete_list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify({ item: 'delete list', listId: listId})
    });
    //set lists......
    //setItems(items => {
    //    return items.filter(item => item.itemid !== itemId)
    //});
}

export let checkUser = (userId, token) => {
    fetch(`${SERVER}check_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify({ action: 'checkUser', userId: userId})
    });
}

