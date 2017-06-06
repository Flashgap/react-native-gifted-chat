import React from "react";
import { Platform, ActivityIndicator, Text, Clipboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import MessageText from "./MessageText";
import MessageImage from "./MessageImage";
import Time from "./Time";

import { isSameUser, isSameDay, warnDeprecated, MessageStatus } from "./utils";

export default class Bubble extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
    }

    handleBubbleToNext() {
        if (
            isSameUser(this.props.currentMessage, this.props.nextMessage) &&
            isSameDay(this.props.currentMessage, this.props.nextMessage)
        ) {
            return StyleSheet.flatten([
                styles[this.props.position].containerToNext,
                this.props.containerToNextStyle[this.props.position]
            ]);
        }
        return null;
    }

    handleBubbleToPrevious() {
        if (
            isSameUser(this.props.currentMessage, this.props.previousMessage) &&
            isSameDay(this.props.currentMessage, this.props.previousMessage)
        ) {
            return StyleSheet.flatten([
                styles[this.props.position].containerToPrevious,
                this.props.containerToPreviousStyle[this.props.position]
            ]);
        }
        return null;
    }

    renderMessageText() {
        if (this.props.currentMessage.text) {
            const { containerStyle, wrapperStyle, ...messageTextProps } = this.props;
            if (this.props.renderMessageText) {
                return this.props.renderMessageText(messageTextProps);
            }
            return <MessageText {...messageTextProps} />;
        }
        return null;
    }

    renderMessageImage() {
        if (this.props.currentMessage.image) {
            const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
            if (this.props.renderMessageImage) {
                return this.props.renderMessageImage(messageImageProps);
            }
            return <MessageImage {...messageImageProps} />;
        }
        return null;
    }

    renderTicks() {
        const { currentMessage } = this.props;
        if (this.props.renderTicks) {
            return this.props.renderTicks(currentMessage);
        }

        if (
            !currentMessage.user ||
            currentMessage.user._id !== this.props.user._id ||
            currentMessage.status === MessageStatus.unknown
        ) {
            return;
        }

        if (currentMessage.status === MessageStatus.sending) {
            let size = 10;

            if (Platform.OS === "ios") {
                size = 1;
            }

            return <ActivityIndicator animating size={size} style={[styles.tickActivity]} color="white" />;
        } else {
            const content = [];

            if (currentMessage.status === MessageStatus.failed) {
                content = [
                    <View key={"failed"} style={styles.tickErrorView}>
                        <Text style={[styles.tick, this.props.tickStyle, styles.tickError, this.props.tickErrorStyle]}>
                            !
                        </Text>
                    </View>
                ];
            } else {
                if (currentMessage.status >= MessageStatus.sent) {
                    content.push(<Text key={"sent"} style={[styles.tick, this.props.tickStyle]}>✓</Text>);
                }
                if (currentMessage.status >= MessageStatus.received) {
                    content.push(<Text key={"received"} style={[styles.tick, this.props.tickStyle]}>✓</Text>);
                }
            }
            return (
                <View style={styles.tickView}>
                    {content}
                </View>
            );
        }
    }

    renderTime() {
        if (this.props.position != "center" && this.props.currentMessage.createdAt) {
            const { containerStyle, wrapperStyle, ...timeProps } = this.props;
            if (this.props.renderTime) {
                return this.props.renderTime(timeProps);
            }
            return <Time {...timeProps} />;
        }
        return null;
    }

    renderCustomView() {
        if (this.props.renderCustomView) {
            return this.props.renderCustomView(this.props);
        }
        return null;
    }

    onPress() {
        if (this.props.onPress) {
            this.props.onPress(this.context, this.props.currentMessage);
        }
    }

    onLongPress() {
        if (this.props.onLongPress) {
            this.props.onLongPress(this.context, this.props.currentMessage);
        } else {
            if (this.props.currentMessage.text) {
                const options = ["Copy Text", "Cancel"];
                const cancelButtonIndex = options.length - 1;
                this.context.actionSheet().showActionSheetWithOptions({
                    options,
                    cancelButtonIndex
                }, buttonIndex => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(this.props.currentMessage.text);
                            break;
                    }
                });
            }
        }
    }

    render() {
        return (
            <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
                <View
                    style={[
                        styles[this.props.position].wrapper,
                        this.props.wrapperStyle[this.props.position],
                        this.handleBubbleToNext(),
                        this.handleBubbleToPrevious()
                    ]}
                >
                    <TouchableWithoutFeedback
                        onPress={this.onPress}
                        onLongPress={this.onLongPress}
                        accessibilityTraits="text"
                        {...this.props.touchableProps}
                    >
                        <View>
                            {this.renderCustomView()}
                            {this.renderMessageImage()}
                            {this.renderMessageText()}
                            <View style={[styles.bottom, this.props.bottomContainerStyle[this.props.position]]}>
                                {this.renderTime()}
                                {this.renderTicks()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "flex-start"
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: "#f0f0f0",
            marginRight: 60,
            minHeight: 20,
            justifyContent: "flex-end"
        },
        containerToNext: {
            borderBottomLeftRadius: 3
        },
        containerToPrevious: {
            borderTopLeftRadius: 3
        }
    }),
    right: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "flex-end"
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: "#0084ff",
            marginLeft: 60,
            minHeight: 20,
            justifyContent: "flex-end"
        },
        containerToNext: {
            borderBottomRightRadius: 3
        },
        containerToPrevious: {
            borderTopRightRadius: 3
        }
    }),
    center: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center"
        },
        wrapper: {
            backgroundColor: "transparent",
            minHeight: 20,
            justifyContent: "flex-end"
        }
    }),
    bottom: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    tick: {
        fontSize: 10,
        backgroundColor: "transparent",
        color: "white"
    },
    tickError: {
        fontSize: 10,
        fontWeight: "bold"
    },
    tickActivity: {
        ...Platform.select({
            ios: {
                paddingRight: 20,
                transform: [{ scale: 0.5 }]
            },
            android: {
                paddingLeft: 5,
                paddingRight: 15
            }
        }),

        height: 12,
        width: 10
    },
    tickErrorView: {
        marginTop: -2,
        backgroundColor: "red",
        width: 14,
        height: 14,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    tickView: {
        flexDirection: "row",
        marginRight: 10
    }
};

Bubble.contextTypes = {
    actionSheet: React.PropTypes.func
};

Bubble.defaultProps = {
    touchableProps: {},
    onPress: null,
    onLongPress: null,
    renderMessageImage: null,
    renderMessageText: null,
    renderCustomView: null,
    renderTime: null,
    position: "left",
    currentMessage: {
        text: null,
        createdAt: null,
        image: null
    },
    nextMessage: {},
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
    //TODO: remove in next major release
    isSameDay: warnDeprecated(isSameDay),
    isSameUser: warnDeprecated(isSameUser)
};

Bubble.propTypes = {
    touchableProps: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
    renderMessageImage: React.PropTypes.func,
    renderMessageText: React.PropTypes.func,
    renderCustomView: React.PropTypes.func,
    renderTime: React.PropTypes.func,
    position: React.PropTypes.oneOf(["left", "right", "center"]),
    currentMessage: React.PropTypes.object,
    nextMessage: React.PropTypes.object,
    previousMessage: React.PropTypes.object,
    containerStyle: React.PropTypes.shape({
        left: View.propTypes.style,
        right: View.propTypes.style
    }),
    wrapperStyle: React.PropTypes.shape({
        left: View.propTypes.style,
        right: View.propTypes.style
    }),
    bottomContainerStyle: React.PropTypes.shape({
        left: View.propTypes.style,
        right: View.propTypes.style
    }),
    tickStyle: Text.propTypes.style,
    containerToNextStyle: React.PropTypes.shape({
        left: View.propTypes.style,
        right: View.propTypes.style
    }),
    containerToPreviousStyle: React.PropTypes.shape({
        left: View.propTypes.style,
        right: View.propTypes.style
    }),
    //TODO: remove in next major release
    isSameDay: React.PropTypes.func,
    isSameUser: React.PropTypes.func
};
