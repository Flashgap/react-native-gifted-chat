import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { Composer } from "react-native-gifted-chat";
import GifScroller from "./GifScroller";

export default class GifInputToolbar extends React.Component {
    constructor() {
        super();

        this.handleGifSelect = this.handleGifSelect.bind(this);
    }

    handleGifSelect(gif) {
        this.props.onSend({ image: gif }, true);
    }

    renderActions() {
        if (this.props.renderActions) {
            return this.props.renderActions(this.props);
        } else if (this.props.onPressActionButton) {
            return <Actions {...this.props} />;
        }
        return null;
    }

    renderComposer() {
        return <Composer {...this.props} multiline={false} placeholder={"Rechecher des GIFs..."} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <GifScroller inputText={this.props.text} handleGifSelect={this.handleGifSelect} />
                <View style={styles.primary}>
                    {this.renderActions()}
                    {this.renderComposer()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: "#b2b2b2",
        backgroundColor: "#FFFFFF"
    },
    primary: {
        flexDirection: "row",
        alignItems: "flex-end"
    }
});

GifInputToolbar.defaultProps = {};

GifInputToolbar.propTypes = {};
