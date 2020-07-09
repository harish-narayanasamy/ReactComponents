import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["t1", "t2", "t3"],
  };

  styles = {
    fontSize: 6,
    fontWeight: "bold",
  };
  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  handleIncrement = (product) => {
    console.log(product);
    this.setState({ count: this.state.count + 1 });
  };
  renderTags() {
    if (this.state.tags.length === 0) {
      return <p> There are No Tags!</p>;
    } else {
      return (
        <ul>
          <li>
            {this.state.tags.map((tag) => (
              <li key={tag}>{tag} </li>
            ))}
          </li>
        </ul>
      );
    }
  }
  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h1>Zero</h1> : count;
  }

  getBadge() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }
  render() {
    return (
      <div>
        <span style={this.styles} className={this.getBadge()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => {
            this.handleIncrement({ id: 1 });
          }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        {this.renderTags()}
      </div>
    );
  }
}

export default Counter;
