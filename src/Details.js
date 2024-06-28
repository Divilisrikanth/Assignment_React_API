import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import {Card,Grid}from'semantic-ui-react';
const Details = ()=>{
    const [planets, setPlanets] = useState([]);
    
 
  useEffect(() => {
    async function fetchData(){
      let res = await fetch('[https://swapi.dev/api/people/1/');
      let data = await res.json();
      setPlanets(data.results);

    }
    fetchData();
  }, []);
  console.log("planets",planets)
  return (
     <>
     <h1>Details</h1>
     <Grid Columns={3}>
        {planets.map((data,i)=>{
        return(
        <Grid.Column key={i}>
          <Card>
           <Card.Content >
            <Card.Header>{data.name}</Card.Header>
            <Card.Description>
            <strong>rotation period</strong>
                <p>{data.rotation_periodt}</p>
                <strong>orbital period</strong>
                <p>{data.orbital_period}</p>
                <strong>diameter</strong>
                <p>{data.diameter}</p>
                <strong>climate</strong>
                <p>{data.climate}</p>
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
export default Details;


