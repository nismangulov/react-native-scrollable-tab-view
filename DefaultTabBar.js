const React = require('react');
const ReactNative = require('react-native');
const PropTypes = require('prop-types');
const {
  StyleSheet,
  Text,
  View,
  Animated,
} = ReactNative;
const Button = require('./Button');

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    tabBarPosition: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    containerHeight: PropTypes.number,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, tabBarPosition, containerHeight, verticalTabs, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: 4,
      height: containerHeight / numberOfTabs,
      backgroundColor: 'navy',
      right: (tabBarPosition === 'left') ? 0 : null,
      left: (tabBarPosition === 'right') ? 0 : null,
      bottom: 0,
      opacity: (isTabActive) ? 1 : 0
    };

    return <Button
      style={styles.flexOne}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
        {verticalTabs &&
          <View style={[tabUnderlineStyle, this.props.underlineStyle, ]} />
        }
      </View>

    </Button>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const verticalTabs = this.props.verticalTabs;
    const numberOfTabs = this.props.tabs.length;

    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        {!verticalTabs &&
          <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
        }
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = DefaultTabBar;
