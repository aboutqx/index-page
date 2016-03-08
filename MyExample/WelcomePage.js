'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image
} = React;

var WelcomePage=React.createClass({
	render:function(){
		return (
			<View style={styles.container}>
		    <Text style={styles.welcome}>
		      欢迎来到电影预告片应用!
		    </Text>
		    <Image
		      source={require('./welcome.jpg')}
		      style={styles.welcomeImg}

        />
		  </View>
      );

	},
});

const styles=StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	},
	welcome:{
		
	},
	welcomeImg:{
		width:190,
		height:180,
		marginTop:20
	}
})

module.exports=WelcomePage;