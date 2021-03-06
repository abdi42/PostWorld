import React, {Component} from 'react'
import {Text, TouchableHighlight,TouchableOpacity, View,StyleSheet,AsyncStorage} from 'react-native'
import { Container, Left, Body, Right,Row,Button, Icon,Content,Card,CardItem,Form,Textarea,Thumbnail } from 'native-base'
import Modal from 'react-native-modal'
import PostCard from './PostModal'

class PostModal extends Component {
	constructor(props){
		super(props)
		this.state ={ modalVisible: false,content:''}
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible})
	}

	submit(){
		this.props.onSubmit(this.state.content)
		this.setModalVisible(false)
	}

	render() {
		const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png'
		let addContent = this.props.children

		if(this.props.topClose === true){
			addContent = (
				<View style={{flex:1}}>
					<Button
						onPress={() => this.props.closePost()}
						transparent
						style={{alignSelf: 'flex-start'}}>
						<Icon type="FontAwesome" name="times-circle" style={{color:'#fff',fontSize:30}}></Icon>
					</Button>
					{this.props.children}
				</View>
			)
		} else {
			addContent = (
				<View style={{flex:1}}>
					{this.props.children}
					<Button
						onPress={() => this.props.closePost()}
						transparent
						style={{alignSelf: 'flex-start'}}>
						<Icon type="FontAwesome" name="times-circle" style={{color:'#fff',fontSize:30}}></Icon>
					</Button>
				</View>
			)
		}

		return (
			<View>
				<Modal
					animationType="slide"
					animationOut="slideOutDown"
					isVisible={this.props.visible}
					style={[styles.modal,this.props.style]}
					backdropOpacity={this.props.opacity}
					backdropColor="#4F6EFD">
					<Container>
						<Content contentContainerStyle={styles.modalContent}>
							{addContent}
						</Content>
					</Container>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	modal:{
		top:10,
		flex:1,
		margin:10,
	},
	modalContent: {
		borderRadius:10,
		backgroundColor:'#4F6EFD',
		padding:7,
		paddingBottom:2
	},
})


export default PostModal
