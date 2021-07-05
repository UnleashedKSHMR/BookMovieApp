import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

function Home() {
  const history = useHistory();
  const [movies, setMovies] = useState(null);
  const [releasedMovies, setReleasedMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [artists, setArtists] = useState(null);

  const handleNavigation = (id) => {
    history.push(`/movie/${id}`);
  };

  useEffect(() => {
    async function getUpcomingMovies() {
      //API
      try {
        const res = await axios.get("http://localhost:8085/api/v1/movies", {
          params: {
            limit: 50,
            status: "PUBLISHED",
          },
        });
        const movies = res.data.movies;
        setMovies(movies);
      } catch (err) {
        console.log(err);
      }
    }

    async function getReleasedMovies() {
      //API
      try {
        const res = await axios.get("http://localhost:8085/api/v1/movies", {
          params: {
            limit: 10,
            status: "RELEASED",
          },
        });
        const movies = res.data.movies;
        setReleasedMovies(movies);
      } catch (err) {
        console.log(err);
      }
    }

    async function getGenres() {
      //API
      try {
        const res = await axios.get("http://localhost:8085/api/v1/genres");
        const genres = res.data.genres;
        setGenres(genres);
      } catch (err) {
        console.log(err);
      }
    }

    async function getArtists() {
      //API
      try {
        const res = await axios.get("http://localhost:8085/api/v1/artists");
        const artists = res.data.artists;
        setArtists(artists);
      } catch (err) {
        console.log(err);
      }
    }

    getUpcomingMovies();
    getReleasedMovies();
    getGenres();
    getArtists();
  }, []);

  return (
    <Fragment>
      <div className="h1">
        <h1 className="h2">Upcoming Movies</h1>
      </div>

      <GridList cellHeight="250" cols="6" style={{ flexWrap: "nowrap" }}>
        {!movies && <div>Loading...</div>}

        {movies &&
          movies.map((item) => {
            return (
              <GridListTile
                onClick={() => handleNavigation(item.id)}
                key={item.id}
              >
                <img src={item.poster_url} alt="None" />
                <GridListTileBar
                  title={item.title}
                  actionIcon={
                    <IconButton>
                      {/* <StarBorderIcon className={classes.title} /> */}
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })}
      </GridList>

      <div class="row">
        <div class="column left">
          <GridList cellHeight="350" cols="3">
            {releasedMovies &&
              releasedMovies.length !== 0 &&
              releasedMovies.map((item) => {
                return (
                  <GridListTile
                    onClick={() => handleNavigation(item.id)}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={item.poster_url} alt="None" />
                    <GridListTileBar
                      title={item.title}
                      actionIcon={
                        <IconButton>
                          {/* <StarBorderIcon className={classes.title} /> */}
                        </IconButton>
                      }
                    />
                  </GridListTile>
                );
              })}

            {releasedMovies && releasedMovies.length === 0 && (
              <h3>No movie found for applied filters</h3>
            )}
          </GridList>
        </div>

        {genres && (
          <Filters
            genres={genres}
            artists={artists}
            setReleasedMovies={setReleasedMovies}
          />
        )}
      </div>
    </Fragment>
  );
}

const Filters = ({ genres, artists, setReleasedMovies }) => {
  const [genreValue, setGenreValue] = useState("");
  const [artistValue, setArtistValue] = useState("");
  const [titleValue, setTitleValue] = useState("");

  const handleGenreChange = (event) => {
    setGenreValue(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtistValue(event.target.value);
  };

  const handleTitle = (event) => {
    setTitleValue(event.target.value);
  };

  const filterMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8085/api/v1/movies", {
        params: {
          limit: 100,
          status: "RELEASED",
          genre: genreValue,
          artists: artistValue,
          title: titleValue,
        },
      });
      const movies = res.data.movies;
      setReleasedMovies(movies);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="column right">
      <Card className="" variant="outlined">
        <CardContent>
          <h4>FIND MOVIES BY:</h4>
          <FormControl style={{ width: `100%` }}>
            <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
            <Input
              id="movie-name"
              aria-describedby="my-helper-text"
              onChange={handleTitle}
            />
          </FormControl>
          <br />
          <FormControl style={{ width: `100%` }}>
            <InputLabel htmlFor="genre">Genres</InputLabel>
            <Select id="genre" value={genreValue} onChange={handleGenreChange}>
              {genres &&
                genres.map((option) => (
                  <MenuItem key={option.id} value={option.genre}>
                    {option.genre}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ width: `100%` }}>
            <InputLabel htmlFor="Artist">Artists</InputLabel>
            <Select
              id="artists"
              value={artistValue}
              onChange={handleArtistChange}
            >
              {artists &&
                artists.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={`${option.first_name} ${option.last_name}`}
                  >
                    {`${option.first_name} ${option.last_name}`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: `100%` }}>
            <InputLabel htmlFor="releaseDate" shrink>
              Release Date Start
            </InputLabel>
            <Input
              id="releaseDate"
              aria-describedby="my-helper-text"
              type="date"
            />
          </FormControl>
          <FormControl style={{ width: `100%` }}>
            <InputLabel htmlFor="endDate" shrink>
              Release Date End
            </InputLabel>
            <Input id="endDate" aria-describedby="my-helper-text" type="date" />
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={filterMovies}
          >
            APPLY
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Home;
