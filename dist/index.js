'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { renderChart, renderSetOption } from './renderChart';
import echarts from './echarts.min';
import PropTypes from 'prop-types';

class Echarts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: JSON.stringify(this.props.option)
        };
    }
    
    shouldComponentUpdate(nextProps) { // 检测传递进来的option是否有变化控制是否执行渲染
        let nextOption = JSON.stringify(nextProps.option);
        if (nextOption !== this.state.option) {
            this.setOption(nextProps.option);
            this.state.option = nextOption;
            return true;
        } else {
            return false;
        }
    }

    static defaultProps = {
        backgroundColor: '#00000000',
        onPress: () => {},
        isMap: false
    }

    render() {
        const mapSource = require('./map.html');
        const indexSource = require('./index.html');
        // let source = this.props.isMap ? mapSource : indexSource;
        let source = indexSource; // 百度地图相关暂未开放，目前只可使用geo矢量地图
        return (
            <View style={{flex: 1, width: this.props.width || '100%', height: this.props.height || '100%'}}>
                <WebView
                    ref="chart"
                    originWhitelist={['*']}
                    useWebKit={true}
                    renderLoading={this.props.renderLoading || (() => <View style={{backgroundColor: this.props.backgroundColor, flex: 1}} />)}
                    style={{backgroundColor: this.props.backgroundColor, flex: 1, width: '100%', height: '100%'}}
                    scrollEnabled={false}
                    onMessage={this._handleMessage}
                    injectedJavaScript={renderChart(this.props)}
                    startInLoadingState={false}
                    source={source}
                />
            </View>
        );
    }

    setOption(option) {
        this.refs.chart.injectJavaScript(renderSetOption(option));
    }

    _handleMessage = (e) => {
        if (!e) return null;
        const data = JSON.parse(e.nativeEvent.data);
        switch (data.types) {
            case 'ON_PRESS':
                this.props.onPress(JSON.parse(data.payload));
                break;
            default:
                break;
        }
    }
}

export {
    Echarts,
    echarts
};

Echarts.propTypes = {
    option: PropTypes.object,
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    renderLoading: PropTypes.func,
    onPress: PropTypes.func
};