import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";



const Player = () => {
  const { id } = useParams(); // Extract id from URL params
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTBhYjRkMmJkODc4MmI4NmE3MTY2MTQ0ZDMzMzA1YyIsIm5iZiI6MTc1ODg2OTIyOC41NjYwMDAyLCJzdWIiOiI2OGQ2MzZlYzNhY2Y1NGNlYTY2OWM4ODQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.B4r6EEzJrzyLg6VZwtuoYDUsOGiXUlH_ioV5jkYMxC0",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
