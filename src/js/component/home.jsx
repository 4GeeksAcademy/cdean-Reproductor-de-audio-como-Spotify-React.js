import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import SpotifyPlayer from "./spotifyPlayer";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Spotify Player</h1>
			<SpotifyPlayer/>
		</div>
	);
};

export default Home;
