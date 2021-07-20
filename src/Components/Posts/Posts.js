import React from "react";
import { connect } from "react-redux";
import { createPostAction } from "../../Store/Actions/PostAction";

class Posts extends React.Component {
    onCreateData() {
      this.props.createData ()
  }
  render() {
    const posts = [];
    for (let post of this.props.data) {
      posts.push(
        <>
          <table key={post.id} border="5px">
            <tr>
              <th>Name</th>
              <th>phoneNumber</th>
              <th>email</th>
            </tr>
            <tr>
              <td>{post.fullName}</td>
              <td>{post.phoneNumber}</td>
              <td>{post.email}</td>
            </tr>
          </table>{" "}
        </>
      );
    }
    return (
      <div>
        <button onClick={this.onCreateData.bind(this)}> Add Data</button>
        {posts}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createData : () => dispatch(createPostAction(   ))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
