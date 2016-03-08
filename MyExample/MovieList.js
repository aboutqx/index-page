'use strict';

const React = require('react-native');

var {
  AppRegistry,
  Image,
  Component,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;
var PAGE_URL="http://video.mtime.com/trailer/";


var MovieList=React.createClass({
  getInitialState:function() {
    this.movies=[];
    
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      
      movieSrc:'',
    };
  },

  componentDidMount:function() {
    this.fetchData();
  },
  

  fetchData:function(){
    var self=this;
    fetch(PAGE_URL)
      .then((response) => response.text())
      .then((responseText) => {
        
        var snippet=responseText.match(/(<ul id="ulWeekVideos"){1}(.|\r|\n)+?(<\/ul>){1}/gm)[0];
        
        var tmp=snippet.split('</li>')
        tmp.forEach(function(v,i){
          if(i==tmp.length-1) return;
          var linkDeptPart=v.split('</a>')[0];
          var link=linkDeptPart.match(/href=".+?"/)[0].substr(5).slice(1,-1);

          var dept=linkDeptPart.match(/_blank\">.+/)[0].substr(8);
          var imgSrc=v.match(/src=".+?"/)[0].substr(4).slice(1,-1);
          console.log(imgSrc);
          var movieId=link.split('/')[3];
          var videoId=link.split('/')[5].slice(0,-5);
          var tmpDate=new Date();
          var tParam=tmpDate.getFullYear()+""+(tmpDate.getMonth()+1)+tmpDate.getDate()+tmpDate.getTime();
          var movieInfoLink='http://api.mtime.com/Service/Video.api?Ajax_CallBack=true&Ajax_CallBackType=Mtime.Api.Pages.VideoService&Ajax_CallBackMethod=GetVideoInfo&Ajax_CrossDomain=1&Ajax_RequestUrl=http://http://video.mtime.com/'+videoId+'/?mid='+movieId+'&t='+tParam+'&Ajax_CallBackArgument0='+videoId;
        /* 
          fetch(movieInfoLink,{}).then(function(response){
              return response.text().then(function(text){
                //eval(''+text+'');
                
                var movieSrc=text.match(/mp4URL":.+?"/)[0].slice(9,-1);
               
                self.movies.push({movieSrc:movieSrc,dept:dept,imgSrc:imgSrc});
                
                console.log(self.movies);
                self.setState({
                  dataSource: self.state.dataSource.cloneWithRows(self.movies),
                  loaded: true,
                });
                

              })
          }).catch((error) => {
            console.warn(error);
          });
        */
          self.movies.push({movieInfoLink:movieInfoLink,dept:dept,imgSrc:imgSrc});
                  
          console.log(self.movies);
          self.setState({
            dataSource: self.state.dataSource.cloneWithRows(self.movies),
            loaded: true,
          });
        })
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  render:function(){

    if (!this.state.loaded) {
      //return this.renderLoadingView();
    }
    return (
    <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView} 
      />

    );
  },
  renderLoadingView:function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  renderMovie:function(movie:object) {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this._pressRow(movie.movieInfoLink)}>
        <Image
          source={{uri: movie.imgSrc}}
          style={styles.thumbnail}
          
        />
        </TouchableHighlight>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.dept}</Text>
        </View>
      </View>
    );
  },
  _pressRow:function(movieInfoLink:string) {
    console.log(movieInfoLink);
    var self=this;
    fetch(movieInfoLink,{}).then(function(response){
        return response.text().then(function(text){
          
          var movieSrc=text.match(/mp4URL":.+?"/)[0].slice(9,-1);

          self.props.navigator.push({movieSrc:movieSrc,id:'PlayMovie'});

        })
    }).catch((error) => {
      console.warn(error);
    });
  },
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    marginBottom:2,
    paddingBottom:2,
  },
  rightContainer: {
    flex: 1,
    alignItems:'flex-start',
    flexWrap:'wrap',
    overflow:'visible',
  },
  title: {
    fontSize: 16,
    lineHeight:26,
    marginBottom: 8,
    textAlign: 'center',
    color:'#000',
    opacity:.87,
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 120,
    height: 90,
  },
  listView: {
    paddingTop:2,
    backgroundColor: '#F5FCFF',
  },
});

module.exports=MovieList;