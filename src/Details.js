import React, { useState, useEffect } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const [person, setPerson] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPersonDetails() {
      try {
        let res = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!res.ok) {
          throw new Error('Failed to fetch person details');
        }
        let data = await res.json();
        setPerson(data); // Assuming data is an object
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    }
    fetchPersonDetails();
  }, [id]);

  return (
    <>
      <h1>Details</h1>
      <Grid columns={3}>
        <Grid.Column>
          <Card>
            <Card.Content>
              <Card.Header>{person.name}</Card.Header>
              <Card.Description>
              <p><img src='/images/img7.jpg'/></p>
                <strong>Height:</strong>
                <p>{person.height}</p>
                <strong>Mass:</strong>
                <p>{person.mass}</p>
                <strong>Hair Color:</strong>
                <p>{person.hair_color}</p>
                <strong>Skin Color:</strong>
                <p>{person.skin_color}</p>
                <strong>Eye Color:</strong>
                <p>{person.eye_color}</p>
                <strong>Birth Year:</strong>
                <p>{person.birth_year}</p>
                <strong>Gender:</strong>
                <p>{person.gender}</p>
                <strong>Homeworld:</strong>
                <p>{person.homeworld}</p>
                <strong>Films:</strong>
                {person.films && person.films.map((film, i) => <p key={i}>{film}</p>)}
                <strong>Species:</strong>
                {person.species && person.species.map((species, i) => <p key={i}>{species}</p>)}
                <strong>Vehicles:</strong>
                {person.vehicles && person.vehicles.map((vehicle, i) => <p key={i}>{vehicle}</p>)}
                <strong>Starships:</strong>
                {person.starships && person.starships.map((starship, i) => <p key={i}>{starship}</p>)}
                <strong>Created:</strong>
                <p>{person.created}</p>
                <strong>Edited:</strong>
                <p>{person.edited}</p>
                <strong>URL:</strong>
                <p>{person.url}</p>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Details;
