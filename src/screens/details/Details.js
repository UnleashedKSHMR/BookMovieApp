import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import axios from "axios";
import "./Details.css";
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
  NativeSelect,
  MenuItem,
} from "@material-ui/core";
import YouTube from "react-youtube";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import yellow from "@material-ui/core/colors/yellow";

function Details() {
  const { id } = useParams();

  const [movieData, setMovieData] = useState(null);
  useEffect(() => {
    async function getMovieById() {
      //API
      try {
        const res = await axios.get(
          `http://localhost:8085/api/v1/movies/${id}`
        );
        const movieData = res.data;
        setMovieData(movieData);
      } catch (err) {
        console.log("#", err);
      }
    }

    getMovieById();
  }, []);

  const videoOptions = {
    height: "390",
    width: "100%",
  };

  const videoId = movieData && movieData.trailer_url.split("v=")[1];

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //     flexDirection: "column",

  //     "& > * + *": {
  //       marginTop: theme.spacing(1),
  //     },
  //   },
  //   emptyStar: {
  //     color: "white",
  //   },
  // }));
  // const Star = () => {
  //   const classes = useStyles();
  //   return (
  //     <div className={classes.root}>
  //       <Rating
  //         name="half-rating-read"
  //         defaultValue={3.5}
  //         precision={0.5}
  //         readOnly
  //         emptyIcon={
  //           <StarBorderIcon fontSize="inherit" className={classes.emptyStar} />
  //         }
  //       />
  //     </div>
  //   );
  // };

  const [starOne, setStarOne] = useState(false);
  const [starTwo, setStarTwo] = useState(false);
  const [starThree, setStarThree] = useState(false);
  const [starFour, setStarFour] = useState(false);
  const [starFive, setStarFive] = useState(false);

  const handleStars = (number) => {
    switch (number) {
      case 1:
        setStarOne(true);
        setStarTwo(false);
        setStarThree(false);
        setStarFour(false);
        setStarFive(false);
        break;

      case 2:
        setStarOne(true);
        setStarTwo(true);
        setStarThree(false);
        setStarFour(false);
        setStarFive(false);
        break;

      case 3:
        setStarOne(true);
        setStarTwo(true);
        setStarThree(true);
        setStarFour(false);
        setStarFive(false);
        break;

      case 4:
        setStarOne(true);
        setStarTwo(true);
        setStarThree(true);
        setStarFour(true);
        setStarFive(false);
        break;

      case 5:
        setStarOne(true);
        setStarTwo(true);
        setStarThree(true);
        setStarFour(true);
        setStarFive(true);
        break;

      default:
        break;
    }
  };

  return (
    <Fragment>
      <div className="sub-header">
        <Link to="/">
          <Typography variant="p">
            {" "}
            <ArrowBackIosIcon /> Back to Home
          </Typography>
        </Link>
      </div>

      <div className="splitscreen">
        <div className="firstPane">
          {movieData && <img src={movieData.poster_url} alt="None" />}
        </div>

        <div className="secondPane">
          {movieData && (
            <Card className="" variant="outlined">
              <CardContent>
                <Typography variant="h3">{movieData.title} </Typography>

                <div className="row">
                  <b>Genre: </b>

                  {movieData.genres.map((genre) => {
                    return <span>{genre},</span>;
                  })}
                </div>

                <div className="row">
                  <b>Duration: </b>
                  <span>{movieData.duration}</span>
                </div>

                <div className="row">
                  <b>Release Date: </b>
                  <span>{movieData.release_date}</span>
                </div>

                <div className="row">
                  <b>Rating: </b>
                  <span>{movieData.rating}</span>
                </div>

                <div className="row space">
                  <b>Plot: </b>
                  <span>
                    <Link to={movieData.wiki_url}>(Wiki Link)</Link>
                    {movieData.storyline}
                  </span>
                </div>

                <div className="row trailer">
                  <b>Trailer: </b>

                  <YouTube
                    className="youtube-player"
                    videoId={videoId}
                    opts={videoOptions}
                    onReady={_onReady}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="thirdPane">
          <Typography variant="h6">Rate This Movie:</Typography>

          <div>
            <StarBorderIcon
              style={{ color: starOne ? yellow[700] : "#000" }}
              onClick={() => handleStars(1)}
            />

            <StarBorderIcon
              style={{ color: starTwo ? yellow[700] : "#000" }}
              onClick={() => handleStars(2)}
            />

            <StarBorderIcon
              style={{ color: starThree ? yellow[700] : "#000" }}
              onClick={() => handleStars(3)}
            />

            <StarBorderIcon
              style={{ color: starFour ? yellow[700] : "#000" }}
              onClick={() => handleStars(4)}
            />

            <StarBorderIcon
              style={{ color: starFive ? yellow[700] : "#000" }}
              onClick={() => handleStars(5)}
            />
          </div>

          <Typography variant="h6">Artists:</Typography>

          {movieData && (
            <GridList cellHeight="250" cols="1">
              {movieData.artists !== null ? (
                movieData.artists
                  .filter((item, index) => index < 2)
                  .map((item) => (
                    <GridListTile>
                      <img src={item.profile_url} alt="None" />
                      <GridListTileBar
                        title={`${item.first_name} ${item.last_name}`}
                      />
                    </GridListTile>
                  ))
              ) : (
                <span>No data available</span>
              )}
            </GridList>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Details;
