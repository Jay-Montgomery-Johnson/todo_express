import { useAuth0 } from "@auth0/auth0-react";
import {getListItems, getTabs, newToDo, getMaxId} from '../../apis/requests.js';
import { useState, useEffect, useCallback} from 'react';

export const useContentPage = () => {

    const [data, setData] = useState([{listname:'name',listid:1}]);
    const [currentTab, setCurrentTab] = useState(1);
    const [listItems, setListItems] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const fetchPageData = () => {getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: "read:current_user",
        },
        }).then( token => {
      getTabs(token)
        .then((response) => response.json())
        .then((json) => {setData(json.lists)})
        .catch((error) => console.error(error));
  
      getListItems(currentTab, token)
        .then((response) => response.json())
        .then((json) => {setListItems(json.lists)})
        .catch((error) => console.error(error));
      })
    };
    
    
    
    const handleTabChange = useCallback((k) => {
        getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: "read:current_user",
          },
        }).then(token => {
        setCurrentTab(k, token);
        getListItems(k, token)
          .then((response) => response.json())
          .then((json) => {setListItems(json.lists)})
          .catch((error) => console.error(error));
        });
      }, [getAccessTokenSilently]);

    const handleNewToDoSubmit = (tab, val, token) => {
        newToDo(tab, val, token);
    
        console.log('items start');
        let maxId = getMaxId(tab, token)
          .then((response) => response.json())
          .then((json) => {
            setListItems(oldItems => [...oldItems, {
              "listid": tab,
              "itemname": val,
              "itemid": json.maxId[0].itemid + 1, //+1 to give the idem a unique id
              "completed": false
          }])
          })
          .catch((error) => console.error(error)); 
    };

    const getTabNames = () => {
      return data.map(list => list.listname); 
    };

    const getTabIds = () => {
      return data.map(list => list.listid); 
    };

    return {
        fetchPageData,
        handleTabChange,
        handleNewToDoSubmit,
        setListItems,
        getTabNames,
        getTabIds,
        data,
        currentTab,
        listItems
    };
};