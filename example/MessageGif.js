import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Lightbox from "react-native-lightbox";

import Image from "react-native-image-progress";

export default class MessageGif extends React.Component {
    render() {
        const { width, height } = Dimensions.get("window");
        const { image } = this.props.currentMessage;

        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Lightbox
                    underlayColor="white"
                    navigator={this.props.navigator}
                    activeProps={{
                        style: [styles.imageActive]
                    }}
                >
                    <Image
                        {...this.props.imageProps}
                        source={{ uri: image.url }}
                        resizeMode="contain"
                        style={[
                            styles.image,
                            { width: width * 0.66, height: image.height / (image.width / (width * 0.66)) }
                        ]}
                    />
                </Lightbox>
                <Image
                    style={{ position: "absolute", left: 5, bottom: -13, width: 200 / 2, height: 22 / 2 }}
                    source={
                        this.props.position == "left"
                            ? require("./assets/PoweredBy_200px-White_HorizText.png")
                            : require("./assets/PoweredBy_200px-Black_HorizText.png")
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    image: {
        borderRadius: 13,
        margin: 3
    },
    imageActive: {
        flex: 1,
        borderRadius: 13,
        margin: 3
    }
});

MessageGif.defaultProps = {
    currentMessage: {
        image: null
    },
    containerStyle: {},
    imageProps: {},
    lightboxProps: {}
};

MessageGif.propTypes = {
    currentMessage: React.PropTypes.object,
    containerStyle: View.propTypes.style,
    imageProps: React.PropTypes.object,
    lightboxProps: React.PropTypes.object
};
