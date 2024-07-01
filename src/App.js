import  React,{useState,useEffect} from 'react';
import  './App.css';
import Details  from './Details';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link,useParams } from "react-router-dom";
import {Container,Dimmer,Loader,Card,Grid, Item}from'semantic-ui-react';
import { FaRegThumbsUp } from "react-icons/fa";
import Navbar from './Navbar';
//import {images} from '../public/images'
//import { useNavigate } from "react-router-dom";
//import { Link } from 'react-router-dom';
function App(){
  const [people ,setPeople] = useState([]);
  const [countUp, setCountUp] = useState(() => {
    const initialCountUp = {};
    for (let i = 1; i <= localStorage.length; i++) {
      const key = localStorage.key(i - 1);
      if (key.startsWith('countUp_')) {
        const id = parseInt(key.split('_')[1], 10);
        initialCountUp[id] = parseInt(localStorage.getItem(key), 10);
      }
    }
    return initialCountUp;
  });

 
 // const id = 2;
 // const navigate = useNavigate()
 // const navigate = useNavigate();
  useEffect(()=>{
    async function fetchPeople(){
      let res = await fetch('https://swapi.dev/api/people');
      let data = await res.json();
      let peopleWithImages = data.results.map((person, index) => ({
        ...person,
        id: index + 1,
        image: `/images/img${index + 1}.jpg`, // Assuming images are in public/images/ folder
        count: parseInt(localStorage.getItem(`countUp_${index + 1}`), 10) || 0
      }));
      setPeople(peopleWithImages);
      
      
    }
    fetchPeople();
    
  },[]);
  

  console.log("people",people)

  const handleCountUp = (id) => {
    const updatedCount = {
      ...countUp,
      [id]: (countUp[id] || 0) + 1
    };
    setCountUp(updatedCount);
    localStorage.setItem(`countUp_${id}`, updatedCount[id]);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Scroll to the height of the document
      behavior: 'smooth' // Optional: animated smooth scroll
    });
  };
  
  return (
  <BrowserRouter>
    <>
        <Navbar/>
     <h1>People</h1>
    <Grid Columns={3}>
      
      {people.map((data,i)=>{
        return(
        <Grid.Column key={i}>
          <Card>
           <Card.Content >
            <Card.Header>{data.name}</Card.Header>
            <Card.Description>
              <p><img src={process.env.PUBLIC_URL + data.image} alt="person" /></p>
            <p>{data.height}</p>
              <strong>Height</strong>
              <p>{data.height}</p>
              <strong>Mass</strong>
              <p>{data.mass}</p>
              <strong>Hair Color</strong>
              <p>{data.hair_color}</p>
              <strong>Gender</strong>
              <p>{data.gender}</p> 
              <button onClick={() => handleCountUp(data.id)}>
                      <FaRegThumbsUp />{`${countUp[data.id] === undefined ? '' : countUp[data.id]}`}
                </button>
              <button onClick={scrollToBottom}>
                <Link to={`/Details/${data.id}?image=${encodeURIComponent(process.env.PUBLIC_URL + data.image)}`}>Show more</Link>
              </button>
              
            </Card.Description>
          </Card.Content>
         </Card> 
        </Grid.Column>
        );
      })}
    </Grid>
    </> 
    <Routes>
         <Route path="/Details/:id/" element={<Details/>}/>
        </Routes>
     </BrowserRouter>
  );
}
export default App;