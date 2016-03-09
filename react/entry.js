var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = React.createClass({
	getInitialState :function(){
		console.log('init');
		return {
			word:'initState'
		}
	},
	componentDidMount:function(){
		console.log('didMount')
	},
	componentWillMount:function(){
    console.log('willMount')
	},
  render: function() {
  	console.log('render');
    return (
      <div className="commentBox">
        {this.state.word}
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('example')
);