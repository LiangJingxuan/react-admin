import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import logo from './logo_bot.png'
import './frame.less'

const { Header, Content, Sider } = Layout;

class Frame extends Component {
    onMenuClick = ({key})=>{
        this.props.history.push(key);
    }
    render() {
        const selectedKeysArr = this.props.location.pathname.split('/');
        selectedKeysArr.length=2;
        console.log(selectedKeysArr)
        return (
            <Layout style={{height: '100%'}}>
                <Header className="header xs-header">
                    <div className="xs-logo">
                        <img src={logo} alt='兴商地产' />
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
export default withRouter(Frame);
