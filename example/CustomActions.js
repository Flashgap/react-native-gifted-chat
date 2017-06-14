import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";

import CameraRollPicker from "react-native-camera-roll-picker";
import NavBar, { NavButton, NavButtonText, NavTitle } from "react-native-nav";

export default class CustomActions extends React.Component {
    constructor(props) {
        super(props);
    }

    renderIcon() {
        if (this.props.icon) {
            return this.props.icon();
        }
        return (
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
                <Text style={[styles.iconText, this.props.iconTextStyle]}>
                    {this.props.isSearch ? ">" : "+"}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.props.onActionsPress}>
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10
    },
    wrapper: {
        borderRadius: 13,
        borderColor: "#b2b2b2",
        borderWidth: 2,
        flex: 1
    },
    iconText: {
        color: "#b2b2b2",
        fontWeight: "bold",
        fontSize: 16,
        backgroundColor: "transparent",
        textAlign: "center"
    }
});

CustomActions.contextTypes = {
    actionSheet: React.PropTypes.func
};

CustomActions.defaultProps = {
    onSend: () => {},
    options: {},
    icon: null,
    containerStyle: {},
    wrapperStyle: {},
    iconTextStyle: {}
};

CustomActions.propTypes = {
    onSend: React.PropTypes.func,
    options: React.PropTypes.object,
    icon: React.PropTypes.func,
    containerStyle: View.propTypes.style,
    wrapperStyle: View.propTypes.style,
    iconTextStyle: Text.propTypes.style
};
