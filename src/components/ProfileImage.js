import React from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage,View } from 'react-native'
import { Thumbnail,Badge,Text } from 'native-base'
class ProfileImage extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAlgCWAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApGYKpZiAAMkntS1V1GMSWM2S3yoSMHGeO/rQBNJPDEQJJUQnpuYClaWNApaRVDdMnGaq3EbtcvIhgOyMZVxk9Sfw+tN/d3EjvIg2m2UqCOgOc/0oAv0VTcsdLWQyFHEavuz3AzzT7F2lgMrsSzsSVz93tigCxuG4LkZIyBTPtEPmeX50e/ONu4Z/KofLCamrgsS0TZyc916elQqHhfzf3EiPMQNoywycDmgC8siM5RXUsvUA8inVnW6qq2DKAHYHcQOT8uTn8cVo0AFFFFABRRRQAUUUUAFFFFABRRRQAU10WSNkcZVhgj2p1FAEMtrDOwaRMkDHUjI9D60sttDNt8yMHaMDtx6fSpaKAGPEkihXXKgggfTpQkaRs5UYLnc3PU0+igBpRTIJMfMAVB9jj/AAFRi1gE3miP585zk4z646ZqaigCKO2hikMiIAx7/wCelS0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=',
			notifications:null
		}
	}


	shouldComponentUpdate(nextProps,nextState) {
		return nextState.image !== this.state.image
	}

	componentDidMount(){
		this.fetchImage()
	}

	fetchImage(){
		AsyncStorage.getItem('userToken',(err,result) => {
			if(result !== null){
				result = JSON.parse(result)

				this.setState({image:result.image,notifications:2})
			}
		})
	}

	badge(){
		if(this.props.disableBadge !== true && this.state.notifications !== null){
			return (
				<Badge style={{ position: 'absolute',zIndex:2, right: -10, paddingTop: 0, paddingBottom: 3, paddingLeft:4, paddingRight:4, borderRadius: 100, height: 22}}>
					<Text style={{ height: 16, fontSize: 13 }}>2</Text>
				</Badge>
			)
		}
	}

	render () {
		return (
			<View>
				<Thumbnail source={{uri: this.state.image}} style={this.props.style} />
			</View>
		)
	}
}

export default ProfileImage
