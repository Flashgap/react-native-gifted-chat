import React from 'react';
import { StyleSheet, View, ListView, Text, Image } from 'react-native';

import { Composer } from 'react-native-gifted-chat';

export default class GifInputToolbar extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
        'https://ressources.blogdumoderateur.com/2013/02/gif-anime.gif',
      ]),
    };
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
    return <Composer {...this.props} multiline={false} />;
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ height: 100, backgroundColor: 'transparent' }} />
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b2b2b2',
    backgroundColor: '#FFFFFF',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

GifInputToolbar.defaultProps = {};

GifInputToolbar.propTypes = {};
