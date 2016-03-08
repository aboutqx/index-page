'use strict';

const React = require('react-native');
import Video from 'react-native-video';

const {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  
} = React;
import Orientation from 'react-native-orientation';

const BGWASH = 'rgba(255,255,255,0.8)';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://baidu.com';

const PlayMovie=React.createClass({
  getInitialState: function() {
    return {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      
    };
  },
  componentWillMount:function(){
    Orientation.lockToLandscape();
  },
  componentWillUnmount: function() {
    
  },
  onLoad: function(data) {
    this.setState({duration: data.duration});
  },

  onProgress: function(data) {
    this.setState({currentTime: data.currentTime});
  },
	render: function(){

		return (
			<View style={styles.container}>
		    
		      {this.renderPlayMovie()}

		  </View>
      );

	},
	renderPlayMovie:function(){
    return (
      <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
        <Video source={{uri:  this.props.movieSrc}}
           style={styles.fullScreen}
           rate={this.state.rate}
           paused={this.state.paused}
           volume={this.state.volume}
           muted={this.state.muted}
           resizeMode={this.state.resizeMode}
           onLoad={this.onLoad}
           onProgress={this.onProgress}
           onEnd={() => { console.log('Done!') }}
           repeat={true} />
      </TouchableOpacity>
    );
  },
 
});

const styles=StyleSheet.create({
	container: {
		flex:1,
		justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
	},
	webView: {
    backgroundColor: BGWASH,
    height: 350,
  },

  srcText: {
  	color:'red'
  },
  fullScreen: {
    position:'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top:0,

  },
})

module.exports=PlayMovie;