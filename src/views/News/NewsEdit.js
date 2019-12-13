import React, { Component } from 'react'
import { Card, Button } from 'antd'

export default class NewsEdit extends Component {
    render() {
        console.log(this.props)
        return (
            <Card title={this.props.location.state.title} bordered={false} extra={<Button>取消</Button>}>
                新闻编辑...
            </Card>
        )
    }
}
