import React, { Component, createRef } from 'react'
import { Card, Row, Col } from 'antd'
import echarts from 'echarts'

import './home.less'

console.log(echarts)

export default class Home extends Component {
    constructor(){
        super();
        this.articleAmount = createRef();
    }
    initArticleChart = ()=>{
        this.articleChart = echarts.init(this.articleAmount.current);
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.articleChart.setOption(option);
    }
    componentDidMount(){
        this.initArticleChart()
    }
    render() {
        return (
            <div className="gutter-example">
                <Card title="概览" bordered={false}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="ts-gutter-box"></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="ts-gutter-box"></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="ts-gutter-box"></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="ts-gutter-box"></div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览量" bordered={false}>
                    <div ref={this.articleAmount} style={{height: '400px'}} />
                </Card>
            </div>
        )
    }
}
