import React, {useState, useEffect, useRef} from "react";

const SpotifyPlayer = () => {

    const [songs, setSongs] = useState([]);
    const [songId, setSongId] = useState(null);
    const [playingSong, setPlayingSong] = useState(false);
    //const [url, setUrl] = useState("");
    const audio = useRef();
    const songURL = 'https://playground.4geeks.com/apis/fake/sound/';

    async function getSongsData() {
       try {
        let response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs') //hacer la petición
        let data = await response.json();//convertir info a json
        setSongs(data) //guarda datos en song
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSongsData();
    }, [])

    function reproducir(url, id) {
        console.log(url, id);
        setSongId(id); //guardo el id
        let urlCompleta = songURL+url;
        audio.current.src = urlCompleta;
        audio.current.play(); // con current accedo a la html tag, audio es un obj
        audio.current.volume=0.05;
        setPlayingSong(true);
    }

    function play() {
        audio.current.play();
        setPlayingSong(true);

    }

    function pausar() {
        audio.current.pause();
        setPlayingSong(false);
    }

    function next() {
        if(songId >= 1 && songId < songs.length - 2) {
        console.log("IDDDD:" + songId);
        setSongId(songId + 1)
        console.log(songId)
        let urlCompleta = songURL + songs[songId].url;
        audio.current.src = urlCompleta;
        audio.current.play();
        setPlayingSong(true);
        } else {
            setSongId(1);
            let urlCompleta = songURL + songs[songId - 1].url;
            audio.current.src = urlCompleta;
            audio.current.play();
            setPlayingSong(true);
        }
    }

    function prev() {
        if(songId < songs.length && songId >= 2) {
            setSongId(songId - 1)
            console.log(songId)
            let urlCompleta = songURL + songs[songId].url;
            audio.current.src = urlCompleta;
            audio.current.play();
            setPlayingSong(true);
        } else {
            setSongId(19);
            let urlCompleta = songURL + songs[songId - 1].url;
            audio.current.src = urlCompleta;
            audio.current.play();
            setPlayingSong(true);
        }  
    }

console.log(songs);
    

    return (
        <div className="container d-flex justify-content-center">
            <ul className="list-group" id="songList">
                {songs.map(function(song, index) //map
                {return <li className="list-group-item" key={index} onClick={()=> reproducir(song.url, song.id)}><span>{song.id +" "}</span>{song.name}</li>})}
                <div className="bg-success" id="playerControl">
                    <span className="mx-2"><i className="fa fa-backward-step" onClick={prev}></i></span>
                    {/* <span className="mx-2"><i className={playingSong ? "fa fa-pause" : "fa fa-play"} onClick={pausar}></i></span> */}
                    {playingSong === false 
                        ? <span className="mx-2"><i className="fa fa-play" onClick={play}></i></span>
                        : <span className="mx-2"><i className="fa fa-pause" onClick={pausar}></i></span>
                    }
                    {/* <span className="mx-2"><i className="fa fa-play"></i></span> */}
                    <span className="mx-2"><i className="fa fa-forward-step" onClick={next}></i></span>
                </div>
                <audio ref={audio} src="">
                </audio>
            </ul>
        </div>
    );
};

export default SpotifyPlayer;