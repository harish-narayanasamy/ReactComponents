import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
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
  }
  delMovie = (id) => {
    console.log(id);
    this.setState({ movie: deleteMovie(id) });
  };

  render() {
    if (this.state.movies.length === 0) return <div>No Movies in Database</div>;

    return (
      <div>
        <h1>Showing {this.state.movies.length} Movies From the Database</h1>

        <table style={this.tablestyles}>
          <tbody>
            <tr style={this.tabledata}>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </tbody>

          <tbody>
            {this.state.movies.map((movies) => (
              <tr key={movies._id} style={this.tabledata}>
                <td key={movies.title}>{movies.title} </td>
                <td key={movies.genre.name}>{movies.genre.name} </td>
                <td key={movies.numberInStock}>{movies.numberInStock} </td>
                <td key={movies.dailyRentalRate}>{movies.dailyRentalRate} </td>
                <td>
                  <button
                    onClick={() => {
                      this.delMovie(movies._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
