'use strict';

const React = require('react-native');
import MovieList from '../pages/MovieList';
import PlayMovie from '../pages/PlayMovie';
import Orientation from 'react-native-orientation';
import Splash from '../pages/Splash';
const {
  Component,
  View,
  Navigator,
  BackAndroid,
} = React;

const DEV=false;

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const BaseConfig = Navigator.SceneConfigs.FloatFromRight;

const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});
const CustomSceneConfig = Object.assign({}, BaseConfig, {
    // A very tighly wound spring will make this transition fast
    springTension: 100,
    springFriction: 1,
    // Use our custom gesture defined above
    gestures: {
      pop: CustomLeftToRightGesture,
    }
});

const MovieTrailer=React.createClass({
  
  
  getInitialState:function() {

    return null;
    
  },
  componentWillMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress);
    Orientation.lockToPortrait();
  },
 
  render:function() {

    return (
      <Navigator
        initialRoute={{id: 'Splash',component:Splash }}
        renderScene={this._renderScene}
        configureScene={this._configureScene}
        
      />
    );

  },
  _renderScene:function(route,navigator){
    if(DEV) {
      return <PlayMovie navigator={navigator} movieSrc={'http://download.wavetlan.com/SVV/Media/HTTP/3GP/Media-Convert/Media-Convert_test2_3GPv4_H263_xbit_352x288_AR1.22_24fps_KFx_327kbps_AAC-LC_Stereo_22050Hz_56.6kbps.3gp'} />
      
    }
    this.canback=false;
    this.navigator=navigator;
    
    if (route.id==='PlayMovie'){
      this.canback=true;
      return <PlayMovie navigator={navigator} movieSrc={route.movieSrc} />
    }
    let Component = route.component;
    return (
      <Component navigator={navigator} route={route} />
    );
  },
  _configureScene(route) {
    return CustomSceneConfig;
  },
  _handleBackButtonPress:function() {
    if (this._overrideBackPressForDrawerLayout) {
      // This hack is necessary because drawer layout provides an imperative API
      // with open and close methods. This code would be cleaner if the drawer
      // layout provided an `isOpen` prop and allowed us to pass a `onDrawerClose` handler.
      this.drawer && this.drawer.closeDrawer();
      return true;
    }
    if(this.canback){
      Orientation.lockToPortrait();
      this.navigator.pop();
      return true;
    }
    return false;
  },
});

export default MovieTrailer;