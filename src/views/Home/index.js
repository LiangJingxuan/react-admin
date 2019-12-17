import React, { Component, createRef } from 'react'
import { Card, Row, Col } from 'antd'
import echarts from 'echarts'

import { getNoticeChart } from '../../requests'
import './home.less'

export default class Home extends Component {
    constructor(){
        super();
        this.articleAmount = createRef();
    }
    initArticleChart = ()=>{
        this.articleChart = echarts.init(this.articleAmount.current);        
        getNoticeChart()
            .then(res=>{
                // 配置图表数据
                const option = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: res.list.map(item=>item.name)
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: res.list.map(item=>item.value)
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.articleChart.setOption(option);
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                
            })
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
