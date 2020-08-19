import React, { Component } from "react";
import Like from "../components/common/like";
import Table from "../components/common/table";
import { Link} from "react-router-dom";

class Moviestable extends Component {
  columns = [
    { path: "title", label: "Title", content: movie =><Link to ={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movies) => (
        <Like
          liked={movies.like}
          onClick={() => {
            this.props.onLike(movies);
          }}
        />
      ),
    },
    {
      key: "delete",
      content: (movies) => (
        <button
          onClick={() => {
            this.props.onDelete(movies);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default Moviestable;
