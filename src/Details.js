import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const [personDetails, setPersonDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function fetchPersonDetails() {
      let res = await fetch(`https://swapi.dev/api/people/${id}/`);
      let data = await res.json();

      const filmRequests = data.films.map(async (filmUrl) => {
        let filmRes = await fetch(filmUrl);
        let filmData = await filmRes.json();
        return filmData.title;
      });

      
      const films = await Promise.all(filmRequests);
      data.films = films;
      setPersonDetails(data);
    }
    fetchPersonDetails();

    // Extract image URL from location search query
    const searchParams = new URLSearchParams(location.search);
    const imageUrl = searchParams.get('image');
    setImageUrl(imageUrl);
  }, [id, location.search]);

  if (!personDetails) return <p>Loading...</p>;

  return (
    <div class="detail">
      <h2>{personDetails.name}</h2>
      {imageUrl && <img src={imageUrl} alt="person" />}
      <p><strong>Height:</strong> {personDetails.height}</p>
      <p><strong>Mass:</strong> {personDetails.mass}</p>
      <p><strong>Hair Color:</strong> {personDetails.hair_color}</p>
      <p><strong>Gender:</strong> {personDetails.gender}</p>
      <p><strong>Skin Color:</strong> {personDetails.skin_color}</p>
      <p><strong>Eye Color:</strong> {personDetails.eye_color}</p>
      <p><strong>Birth Year:</strong> {personDetails.birth_year}</p>
      <p><strong>Homeworld:</strong> {personDetails.homeworld}</p>
      <p><strong>Films:</strong> {personDetails.films && personDetails.films.join(', ')}</p>
      <p><strong>Films url:</strong> {personDetails.url}</p>
      <p><strong>Species:</strong> {personDetails.species && personDetails.species.join(', ')}</p>
      <p><strong>Vehicles:</strong> {personDetails.vehicles && personDetails.vehicles.join(', ')}</p>
      <p><strong>Starships:</strong> {personDetails.starships && personDetails.starships.join(', ')}</p>
      <p><strong>Created:</strong> {personDetails.created}</p>
      <p><strong>Edited:</strong> {personDetails.edited}</p>
      <p><strong>URL:</strong> {personDetails.url}</p>
    </div>
  );
}

export default Details;
