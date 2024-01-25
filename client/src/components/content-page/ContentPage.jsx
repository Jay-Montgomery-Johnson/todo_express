import { AddToDoForm } from "../add-to-do-form/AddToDoForm.jsx";
import { ToDoList } from "../to-do-list/ToDoList.jsx";
import { ListNameTabs } from "../list-name-tabs/ListNameTabs.jsx"
import { useContentPage } from "./useContentPage.js";
import { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';


export default function ContentPage() {
    const {
        fetchPageData,
        handleTabChange,
        handleNewToDoSubmit,
        setListItems,
        getTabNames,
        getTabIds,
        data,
        currentTab,
        listItems
    } = useContentPage();

    useEffect(() => {fetchPageData()},[]);

    let lists=<Tab.Pane eventKey={1}><p>fdfjd</p></Tab.Pane>;
    if (data != null) {
    lists =  data.map(list =>
    <Tab.Pane eventKey={list.listid}><ToDoList items={listItems} listId={list.listid} setListItems={setListItems}/></Tab.Pane>
    );
    }
    
    return (
    <div className="list-tabs">
    <Tab.Container id="lt" defaultActiveKey="first" activeKey={currentTab}
        onSelect={(k) => {handleTabChange(k)}}>
      <ListNameTabs tabs={getTabNames()} ids={getTabIds()}/>
      <hr/>  
      <Tab.Content>
        {lists}
      </Tab.Content>
      <div className='enter'>
        <AddToDoForm currentTab={currentTab} handleNewToDoSubmit={handleNewToDoSubmit}/>
      </div>
    </Tab.Container>
    </div>
    );
}

const LISTS = {"lists":[{listName:"liuu33", items:[{itemName:"a",completed:false},{itemName:"b",completed:false},{itemName:"c",completed:false}]},
{listName:"listB", items:[{itemName:"d",completed:false},{itemName:"e",completed:false}]}]};