import React, { Component, PropTypes } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import Image from "react-native-image-progress";
import qs from "qs";

const apiKey = "dc6zaTOxFJmzC";

export default class GifScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            offset: 0,
            isLoading: false
        };

        this.loadMoreImages = this.loadMoreImages.bind(this);
    }

    componentDidMount() {
        const searchTerm = this.props.inputText;
        this.buildUrl(searchTerm, 10);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.inputText !== this.props.inputText) {
            this.setState({
                gifs: [],
                offset: 0,
                isLoading: false
            });
            const searchTerm = nextProps.inputText;
            this.buildUrl(searchTerm, 10);
        }
    }

    buildUrl(term, limit) {
        this.state.isLoading = true;

        if (term === "") {
            const endpoint = "https://api.giphy.com/v1/gifs/trending?api_key=";
            const url = `${endpoint}${apiKey}`;
            this.fetchAndRenderGifs(url);
        } else {
            const endpoint = "https://api.giphy.com/v1/gifs/search?";
            const query = qs.stringify({ q: term, api_key: apiKey, limit, offset: this.state.offset });
            const url = `${endpoint}${query}`;
            this.fetchAndRenderGifs(url);
        }
    }

    async fetchAndRenderGifs(url) {
        try {
            const response = await fetch(url);
            const gifs = await response.json();
            const gifsUrls = gifs.data.map(gif => {
                return { ...gif.images.original, preview: gif.images.fixed_height_downsampled.url };
            });

            const newGifsUrls = this.state.gifs.concat(gifsUrls);
            this.setState({ gifs: newGifsUrls, isLoading: false, offset: this.state.offset + gifsUrls.length });
        } catch (e) {
            console.log(e);
            this.state.isLoading = false;
        }
    }

    handleGifSelect(index, gif) {
        if (this.props.handleGifSelect) {
            this.props.handleGifSelect(gif);
        }
    }

    loadMoreImages(number) {
        const searchTerm = this.props.inputText;

        if (searchTerm !== "" && !this.state.isLoading) {
            this.buildUrl(searchTerm, 10);
        }
    }

    render() {
        const imageList = this.state.gifs.map((gif, index) =>
            <TouchableOpacity onPress={() => this.handleGifSelect(index, gif)} key={index} index={index}>
                <Image
                    source={{ uri: gif.preview }}
                    style={[styles.image, { width: gif.width / (gif.height / 100), height: 100 }]}
                />
            </TouchableOpacity>
        );

        return (
            <View style={this.props.style}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scroll}
                    data={imageList}
                    renderItem={({ item }) => item}
                    onEndReached={this.loadMoreImages}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={10}
                    keyboardShouldPersistTaps={"always"}
                />
            </View>
        );
    }
}

GifScroller.defaultProps = {
    inputText: ""
};

GifScroller.propTypes = {
    inputText: PropTypes.string
};

const styles = StyleSheet.create({
    scroll: {
        height: 100
    },
    image: {
        backgroundColor: "#EEE",
        borderRadius: 2,
        marginRight: 1
    }
});
