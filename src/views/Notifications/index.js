import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, List, Badge } from 'antd'

import { markNotificationAsReadById } from '../../actions/notifications'

class Notifications extends Component {
    render() {
        return (
            <Card title="通知中心" bordered={false} extra={<Button disabled={this.props.list.every(item=>item.isHasRead===true)}>全部标记为已读</Button>}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                    <List.Item 
                        extra={item.isHasRead ? null : <Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>已读</Button>}
                    >
                        <List.Item.Meta
                          title={<Badge dot={!item.isHasRead} offset={[5,0]}>{item.title}</Badge>}
                          description={item.desc}
                        />
                    </List.Item>
                    )}
                />
            </Card>
        )
    }
}
const mapState = state=>{
  const {
    list
  } = state.notifications;
  return {
    list
  }
}
export default connect(mapState,{markNotificationAsReadById})(Notifications)
