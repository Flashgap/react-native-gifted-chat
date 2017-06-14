import React from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { GiftedChat, Actions, Bubble, InputToolbar, MessageImage } from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";
import GifInputToolbar from "./GifInputToolbar";
import MessageGif from "./MessageGif";

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
            gif: false
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.onActionsPress = this.onActionsPress.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderTicks = this.renderTicks.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.renderInputToolbar = this.renderInputToolbar.bind(this);

        this._isAlright = null;
    }

    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: require("./data/messages.js")
            };
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.setState(previousState => {
            return {
                isLoadingEarlier: true
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState(previousState => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, require("./data/old_messages.js")),
                        loadEarlier: false,
                        isLoadingEarlier: false
                    };
                });
            }
        }, 1000); // simulating network
    }

    onSend(messages = []) {
        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, messages)
            };
        });

        // for demo purpose
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if (messages[0].image || messages[0].location || !this._isAlright) {
                this.setState(previousState => {
                    return {
                        typingText: "React Native is typing"
                    };
                });
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive("Nice picture!");
                    } else if (messages[0].location) {
                        this.onReceive("My favorite place");
                    } else if (!this._isAlright) {
                        this._isAlright = true;
                        this.onReceive("Alright");
                    }
                }
            }

            this.setState(previousState => {
                return {
                    typingText: null
                };
            });
        }, 1000);
    }

    onReceive(text) {
        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native"
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    }
                })
            };
        });
    }

    onActionsPress() {
        this.chat.setMinInputToolbarHeight(this.state.gif ? 44 : 144);
        this.state.gif = !this.state.gif;
    }

    renderCustomActions(props) {
        return <CustomActions {...props} onActionsPress={this.onActionsPress} isSearch={this.state.gif} />;
    }

    renderMessageImage(props) {
        const image = props.currentMessage.image;
        if (typeof image === "string" || image instanceof String) {
            return <MessageImage {...props} />;
        }

        return <MessageGif {...props} />;
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#f0f0f0"
                    }
                }}
            />
        );
    }

    renderTicks(currentMessage) {
        return (
            <View style={styles.tickView}>
                <View style={styles.tickErrorView}>
                    <Text style={[styles.tick, styles.tickError]}>!</Text>
                </View>
            </View>
        );
    }

    renderCustomView(props) {
        return <CustomView {...props} />;
    }

    renderFooter(props) {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                    Banga!!!
                </Text>
            </View>
        );
    }

    renderInputToolbar(inputToolbarProps) {
        if (this.state.gif) {
            return <GifInputToolbar {...inputToolbarProps} />;
        }
        return <InputToolbar {...inputToolbarProps} />;
    }

    render() {
        return (
            <GiftedChat
                ref={ref => {
                    this.chat = ref;
                }}
                messages={this.state.messages}
                onSend={this.onSend}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
                user={{
                    _id: 1 // sent messages should have same user._id
                }}
                renderActions={this.renderCustomActions}
                renderBubble={this.renderBubble}
                renderCustomView={this.renderCustomView}
                renderFooter={this.renderFooter}
                renderInputToolbar={this.renderInputToolbar}
                renderMessageImage={this.renderMessageImage}
                textInputProps={{ autoFocus: true }}
            />
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    footerText: {
        fontSize: 14,
        color: "#aaa"
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
        paddingRight: 20,
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
});
