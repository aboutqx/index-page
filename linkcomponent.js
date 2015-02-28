var LinkPart = React.createClass({
   getInitialState: function() {
    return {data: []};
  },
	 loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    var postNodes=this.state.data.map(function(post){
    return (
      <div className="post">
	  <LinkTitle title={post.title}/>
	  <LinkLink link={post.link}/>
		<LinkDesprition head={post.head} desprition={post.description}/>
		<LinkCode codes={post.codes}/>
      </div>
    );
		});
		return (<section className="main">{postNodes}</section>);
  }
});
var LinkTitle=React.createClass({
  render:function(){
	 return  (
	   <h2>{this.props.title}</h2>
	 )
  }
});

var LinkLink=React.createClass({
  render:function(){
    return (
      <a href={this.props.link}>{this.props.link}</a>
	)
  }
});
var LinkDesprition=React.createClass({
  render:function(){
	var head='';
	if (this.props.head)
	{
	  head=this.props.head;
	}
    return (
		<div>
		<h3>{head} </h3>
		<p>{this.props.desprition}</p>
		</div>
	)
  }
});
var LinkCode=React.createClass({
	render:function(){
    return (
			<div>
			<p>main code:</p>
			<pre>
			<code dangerouslySetInnerHTML={{__html: this.props.codes}} />
			</pre>
			</div>
		)
	}
});
var data=[{title:'a',link:'b',head:'x',description:'d',codes:'e'}];
React.render(
  <LinkPart url="linkcomponent/posts.json"/>,
  document.getElementById('container')
);