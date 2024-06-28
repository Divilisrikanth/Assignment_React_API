import  React,{useState,useEffect} from 'react';
import  './App.css';
import Details  from './Details';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import {Container,Dimmer,Loader,Card,Grid}from'semantic-ui-react';
import { FaRegThumbsUp } from "react-icons/fa";
import Navbar from './Navbar.js';

function App(){
  const [people ,setPeople] = useState([]);
  const [countUp, setCountUp] = useState(0)
 // const navigate = useNavigate();
  useEffect(()=>{
    async function fetchPeople(){
      let res = await fetch('https://swapi.dev/api/people');
      let data = await res.json();
      setPeople(data.results);

    }
    fetchPeople();
    
  },[])
  console.log("people",people)
 
  return (
    <>
    <BrowserRouter>
       <Navbar/>
       <Routes>
        <Route path="/details" element={<Details/>}/>
       </Routes>
    </BrowserRouter>
    
     <h1>People</h1>
    <Grid Columns={3}>
      {people.map((data,i)=>{
        return(
        <Grid.Column key={i}>
          <Card>
           <Card.Content >
            <Card.Header>{data.name}</Card.Header>
            <Card.Description>
              <strong>Height</strong>
              <p>{data.height}</p>
              <strong>Mass</strong>
              <p>{data.mass}</p>
              <strong>Hair Color</strong>
              <p>{data.hair_color}</p>
              <strong>Gender</strong>
              <p>{data.gender}</p> 
              <button onClick={()=>setCountUp(countUp + 1)}>
              <FaRegThumbsUp />{`${countUp===0 ?'':countUp}`}</button>
              <button>
                  Show more
              </button>
              
            </Card.Description>
          </Card.Content>
         </Card> 
        </Grid.Column>
        );
      })}
    </Grid>
    </> 
  );
}
export default App;
