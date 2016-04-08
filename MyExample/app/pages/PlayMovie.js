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
  Dimensions,
  ToastAndroid,
  ProgressBarAndroid,
  StatusBar,
} = React;
import Orientation from 'react-native-orientation';

const BGWASH = 'rgba(255,255,255,0.8)';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://baidu.com';
const {height, width} = Dimensions.get('window');

const PlayMovie=React.createClass({
  getInitialState: function() {
    return {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      loading:1,
      hidden:true,
    };
  },
  componentWillMount:function(){
    Orientation.lockToLandscape();
  },
  componentWillUnmount: function() {
    
  },
  onLoad: function(data) {
    this.setState({duration: data.duration});
    console.warn('loaded');
    this.setState({loading:0});
  },
  onLoadStart:function(){
    console.warn('loadstart');
  },
  onError:function(data){
    //ToastAndroid.show('无法播放该视频', ToastAndroid.SHORT)
    
  },
  onProgress: function(data) {
    this.setState({currentTime: data.currentTime});
  },
	render: function(){

		return (
			<View style={styles.container}>
		     <StatusBar
          hidden={this.state.hidden}
        />
		    {this.renderPlayMovie()}

		  </View>
      );

	},
	renderPlayMovie:function(){
    return (
      <View style={styles.fullScreen}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video source={{uri: this.props.movieSrc}}
             style={styles.fullScreen}
             rate={this.state.rate}
             paused={this.state.paused}
             volume={this.state.volume}
             muted={this.state.muted}
             resizeMode={this.state.resizeMode}
             onLoad={this.onLoad}
             onLoadStart={this.onLoadStart}
             onProgress={this.onProgress}
             onError={this.onError}
             onEnd={() => { console.log('Done!') }}
             repeat={true} />
        </TouchableOpacity>
        <ProgressBarAndroid styleAttr="Inverse" style={[styles.loading,{opacity:this.state.loading}]} color="#e1e1e1"/>
      </View>
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
  loading:{
    position: 'absolute',
    left: height/2,
    top: width/2,
    width:70,
    height:70,
    marginTop:-35,
    marginLeft:-35,
  },
  srcText: {
  	color:'red'
  },
  text:{
    color:'#fff'
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