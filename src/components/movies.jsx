import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { paginate } from "../utils/paginate";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
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
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }
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
    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      console.log(ex);
      toast.error("Error");

      if (ex.repsonse && ex.repsonse.status === 404) {
        toast.error("This Movie has been already deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    const likedMovies = [...this.state.movies];

    for (let i = 0; i < likedMovies.length; i++) {
      if (likedMovies[i]._id === movie._id) {
        likedMovies[i].like = !likedMovies[i].like;
      }
    }
    this.setState({ movies: likedMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, filter: "", currentPage: 1 });
  };

  handleFilter = (searchQuery) => {
    this.setState({
      selectedGenre: "",
      searchQuery: searchQuery,
      currentPage: 1,
    });
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
            onLike={this.handleLike}
            onDelete={this.handleDelete}
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
