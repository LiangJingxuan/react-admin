import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd'

import logo from './logo_bot.png'
import './frame.less'

const { Header, Content, Sider } = Layout;

class Frame extends Component {
    onMenuClick = ({key})=>{
        this.props.history.push(key);
    }
    onDropdownMenuClick = ({key})=>{
        this.props.history.push(key);
    }
    menu = (
        <Menu onClick={this.onDropdownMenuClick}>
          <Menu.Item key='/admin/notifications'>
            <Badge dot={Boolean(this.props.notificationsCount)}>
                通知中心
            </Badge>
          </Menu.Item>
          <Menu.Item key='/admin/settings'>
            个人设置
          </Menu.Item>
          <Menu.Item key='/login'>
            退出
          </Menu.Item>
        </Menu>
    )
    render() {
        const selectedKeysArr = this.props.location.pathname.split('/');
        selectedKeysArr.length=3;
        
        return (
            <Layout style={{height: '100%'}}>
                <Header className="header xs-header">
                    <div className="xs-logo">
                        <img src={logo} alt='兴商地产' />
                    </div>
                    <div>
                        <Dropdown overlay={this.menu} trigger={['click']}>
                            <div className="ts-ant-dropdown-link">
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> 
                                <span>欢迎您</span> 
                                <Badge count={this.props.notificationsCount} offset={[-10,-10]}>
                                    <Icon type="down" />
                                </Badge>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            selectedKeys={[selectedKeysArr.join('/')]}
                            onClick={this.onMenuClick}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                this.props.menus.map(item=>{
                                    return (
                                        <Menu.Item key={item.pathname}>
                                            <Icon type={item.icon} theme="twoTone" />
                                            {item.title}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: '16px 0',
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
const mapState = state=>{
    return {
        notificationsCount: state.notifications.list.filter(item=>item.isHasRead===false).length
    }
  }
export default connect(mapState)(withRouter(Frame));
