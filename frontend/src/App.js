import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import ListItem from './components/ListItem';

function App() {
  const [state,setState] = useState({loading:true})
  useEffect(()=>{
    axios.get('/getIntents').then((res)=>{
      console.log(res.data)
      setState({...state,loading:false,data:res.data.intent})
    }).catch(err=>setState({...state,loading:false,error:true}))
  },[])
  return (
    <div className="App">
      <div data-tilt></div>
      <h1 className="heading">FriendlyBot</h1>

      {
        state["loading"] // check if request is completed
        ?
        <div>
          <div class="loader"></div>
        </div>
        :
        <div  style={{maxWidth:"750px",margin:"auto"}}>
          {state['data']
          ? // check for data
          state['data'].map((obj,index)=>(
            <ListItem text={obj.displayName} index={index}/>
          ))
          : // if data not found display this message
          <div className="error">Something Went Wrong</div>
        }
        </div>
      }

    </div>
  );
}

export default App;
