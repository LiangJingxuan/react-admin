import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, List, Badge, Spin } from 'antd'

import { markNotificationAsReadById, markAllNotificationsRead } from '../../actions/notifications'

class Notifications extends Component {
    render() {
        return (
          <Spin spinning={this.props.isLoading}>
            <Card 
              title="通知中心" 
              bordered={false} 
              extra={<Button 
                        disabled={this.props.list.every(item=>item.isHasRead===true)}
                        onClick={this.props.markAllNotificationsRead}
                      >
                          全部标记为已读
                      </Button>}>
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
          </Spin>
        )
    }
}
const mapState = state=>{
  const {
    list,
    isLoading
  } = state.notifications;
  return {
    list,
    isLoading
  }
}
export default connect(mapState,{markNotificationAsReadById, markAllNotificationsRead})(Notifications)
