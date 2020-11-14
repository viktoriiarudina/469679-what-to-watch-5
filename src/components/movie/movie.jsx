import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviePropTypes from "./movie-props";
import {Link, withRouter} from "react-router-dom";
import Tabs from "../tabs/tabs";
import withTabs from "../../hocs/with-tabs/with-tabs";
import MoviesList from "../movies-list/movies-list";
import {SIMILAR_MOVIES_COUNT} from "../../const";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list";
import Header from "../header/header";

const MoviesListWrapper = withMoviesList(MoviesList);
const TabsWrapper = withTabs(Tabs);

class Movie extends PureComponent {
  constructor(props) {
    super(props);
  }

  handlePlayButtonClick(movieID) {
    this.props.history.push(`/player/${movieID}`);
  }

  render() {
    const {match: {params: {id}}, movies} = this.props;
    const movie = movies.find((item) => item.id === parseInt(id, 10));
    const similarMovies = movies
    .filter((item) => item.genre === movie.genre && item.id !== movie.id)
    .slice(0, SIMILAR_MOVIES_COUNT);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{background: `${movie.backgroundColor}`}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt={movie.name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <Header />
            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.released}</span>
                </p>
                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button" onClick={() => this.handlePlayButtonClick(movie.id)}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
              </div>
              <div className="movie-card__desc">
                <TabsWrapper movie={movie}/>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesListWrapper movies={similarMovies} />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <Link to={`/`} className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

Movie.propTypes = {
  movies: PropTypes.arrayOf(MoviePropTypes).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default withRouter(Movie);
