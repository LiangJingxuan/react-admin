import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
import moment from 'moment'

import { getArticles } from '../../requests'

const titleDisplayMap = {
    id: 'id',
    title: '标题',
    autohr: '作者',
    createAt: '添加时间',
    amount: '阅读量'
}

export default class NewsList extends Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            columns: [],
            total: 0
        }
    }
    getData = ()=>{
        getArticles()
            .then(res=>{
                console.log(res)
                const columnKeys = Object.keys(res.list[0])
                const columns = columnKeys.map(item=>{
                    if(item==='amount'){
                        return {
                            title: titleDisplayMap[item],
                            key: item, 
                            render: (text, record)=>{
                                const { amount } = record
                                return (
                                    <Tag color={amount>50?"volcano":"cyan"}>{record.amount}</Tag>
                                )
                            }
                        }
                    }
                    if(item==='createAt'){
                        return {
                            title: titleDisplayMap[item],
                            key: item, 
                            render: (text, record)=>{
                                const { createAt } = record
                                return (
                                    moment(createAt).format('YYYY-MM-DD hh:mm:ss')
                                )
                            }
                        }
                    }
                    return {
                        title: titleDisplayMap[item],
                        dataIndex: item,
                        key: item,
                    }
                });
                this.setState({
                    total: res.totle,
                    dataSource: res.list,
                    columns
                });
            })
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <Card title="公告列表" bordered={false} extra={<Button>操作</Button>}>
                <Table 
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns} 
                    loading={false}
                    pagination={{
                        total: this.state.total,
                        hideOnSinglePage: true
                    }}
                />
            </Card>
        )
    }
}
