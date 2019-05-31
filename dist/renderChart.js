'use strict';
const toString = (obj) => {
    let result = JSON.stringify(obj, function(key, val) {
        // 对function进行特殊处理
        if (typeof val === 'function') {
            return `~ha~${val}~ha~`;
        }
        return val;
    });
    // 再进行还原
    do {
        result = result.replace('\"~ha~', '').replace('~ha~\"', '').replace(/\\n/g, '').replace(/\\\"/g,'"');
    } while (result.indexOf('~ha~') >= 0);
    return result;
};

const renderChart = (props) => {
    const width = props.width ? `${props.width}px` : 'auto';
    const height = props.height ? `${props.height}px` : '100%';
    return (props.geo ? `echarts.registerMap('${props.geo[0]}', ${toString(props.geo[1])});` : '') + `
        document.getElementById('main').style.width = '${width}';
        document.getElementById('main').style.height = '${height}';
        document.getElementById('main').style.backgroundColor = '${props.backgroundColor}';
        var myChart = echarts.init(document.getElementById('main'));
        window.onresize = myChart.resize;
        myChart.setOption(${toString(props.option)});
        myChart.on('click', function(params) {
            delete params.event;
            window.ReactNativeWebView.postMessage(JSON.stringify({'types':'ON_PRESS','payload': JSON.stringify(params)}));
        });
    ` + (props.geo ? `
        var zoom = 1;
        document.addEventListener('gesturestart', (event) => {
            zoom = myChart.getOption().geo[0].zoom;
        }, false);
        document.addEventListener('gesturechange', (event) => {
            myChart.setOption({
                geo: {
                    zoom: zoom * event.scale
                }
            });
        }, false);
    ` : '');
};

const renderSetOption = (option) => {
    return `myChart.setOption(${toString(option)});`;
};

export {
    renderChart,
    renderSetOption
};