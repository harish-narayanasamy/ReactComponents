import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";

import { paginate } from "../utils/paginate";

import {
  getMovies,
  deleteMovie,
  likeMovie,
} from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _, { filter } from "lodash";
import SearchBox from "../components/common/searchbox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount = () => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  };
  tablestyles = {
    borderCollapse: "collapse",
    width: "100%",
  };
  tabledata = {
    border: "1px solid black",
    width: "100%",
  };
  constructor() {
    super();
    this.delMovie = this.delMovie.bind(this);
    this.likeMovie = this.likeMovie.bind(this);
  }

  delMovie = (id) => {
    this.setState({ movie: deleteMovie(id) });
  };

  likeMovie = (id) => {
    this.setState({ movie: likeMovie(id) });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, filter: "", currentPage: 1 });
  };

  handleFilter = (searchQuery) => {
    this.setState({ selectedGenre: "", searchQuery: searchQuery, currentPage: 1 });
  };

  sort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleClick = () => {
    console.log("text");
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        String(m.title.toLowerCase()).startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <div>No Movies in Database</div>;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link to="/movies/new">
            <button
              className="btn btn-primary"
              type="button"
              style={{ marginBottom: 20 }}
            >
              New Movie{" "}
            </button>
          </Link>

          <h5>Showing {totalCount} Movies From the Database</h5>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleFilter}
          />

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.likeMovie}
            onDelete={this.delMovie}
            onSort={this.sort}
            onItemSelect={this.handleGenreSelect}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
