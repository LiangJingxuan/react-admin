import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal,Typography, message, Tooltip } from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'

import { getArticles, delArticlesById } from '../../requests'

const titleDisplayMap = {
    id: 'id',
    title: '标题',
    autohr: '作者',
    createAt: '添加时间',
    amount: '阅读量'
}
const ButtonGroup = Button.Group;

export default class NewsList extends Component {
    constructor(){
        super();
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 10,
            deleteArticleModalContent: null,
            isShowArticleModal: false,
            deleteArticleConfirmLoading: false,
            deleteId: null
        }
    }
    setData = (state)=>{
        if(!this.updater.isMounted(this))return;
        this.setState(state)
    }
    getData = ()=>{
        this.setState({
            isLoading: true
        });
        getArticles(this.state.offset,this.state.limited)
            .then(res=>{
                // console.log(res)
                const columnKeys = Object.keys(res.list[0])
                const columns = columnKeys.map(item=>{
                    if(item==='amount'){
                        return {
                            title: titleDisplayMap[item],
                            key: item, 
                            render: (text, record)=>{
                                const { amount } = record
                                return (
                                    <Tooltip title={amount>50?"大于50":"小于50"}>
                                        <Tag color={amount>50?"volcano":"cyan"}>{record.amount}</Tag>
                                    </Tooltip>
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
                columns.push({
                    title: '操作',
                    key: 'action', 
                    render: (text,record)=>{
                        return (
                           <ButtonGroup>
                               <Button size='small' type='danger' onClick={this.showDeleteNews.bind(this,record)}>删除</Button>
                               <Button size='small' type='primary' onClick={this.toEdit.bind(this, record)}>修改</Button>
                           </ButtonGroup> 
                        )
                    }
                });
                // 如果请求完成之后组件已经销毁，就不要再setState
                // if(!this.updater.isMounted(this))return; 
                // this.setState({
                //     total: res.totle,
                //     dataSource: res.list,
                //     columns
                // });
                // 如果请求完成之后组件已经销毁，就不要再setState
                this.setData({
                    total: res.totle,
                    dataSource: res.list,
                    columns
                })
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                // if(!this.updater.isMounted(this))return;
                this.setData({
                    isLoading: false
                })
            })
    }
    onPageChange = (page, pageSize)=>{
        this.setState({
            offset: pageSize * (page-1),
            // offset: page,
            limited: pageSize
        },()=>{
            this.getData()
        });
    }
    onShowSizeChange = (current, size)=>{
        this.setState({
            offset: 0,
            limited: size
        },()=>{
            this.getData()
        });
    }
    toExcel = ()=>{
        /* convert state to workbook */
        // 组合数据
        const data = [Object.keys(this.state.dataSource[0],)];
        for(let i=0; i<this.state.dataSource.length;i++){
            data.push(Object.values(this.state.dataSource[i]))
        }
        // 生成文件
        const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
    }
    showDeleteNews = (record)=>{
        // 函数方法调用 Modal
        // Modal.confirm({
        //     title: <Typography>确定要删除 <span style={{color :'red'}}>{record.title} 吗?</span></Typography>,
        //     content: `此操作不可逆, 请谨慎操作.`,
        //     okText: '我要删除',
        //     cancelText: '不想删了',
        //     onOk(){
        //         delArticlesById(record.id)
        //             .then(res=>{
        //                 console.log(res)
        //             })
        //             .catch(err=>{
        //                 console.log(err)
        //             })
        //             .finally(()=>{

        //             })
        //     }
        // })

        // 组件方法调用 Modal
        this.setState({
            deleteArticleModalContent: record.title,
            isShowArticleModal: true,
            deleteId: record.id
        })
    }
    deleteNews = ()=>{
        this.setState({
            deleteArticleConfirmLoading: true
        })
        delArticlesById(this.state.deleteId)
            .then(res=>{
                message.success(res.msg)
                this.setState({
                    offset: 0
                }, ()=>{
                    this.getData()
                })
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                this.setState({
                    deleteArticleConfirmLoading: false,
                    isShowArticleModal: false
                })
            })
    }
    toEdit = (record)=>{
        this.props.history.push({
            pathname: `/admin/newslist/enwsedit/${record.id}`,
            state: {
                title: record.title
            }
        });
    }
    hideDeleteModal = ()=>{
        this.setState({
            deleteArticleModalContent: null,
            isShowArticleModal: false,
            deleteArticleConfirmLoading: false
        })
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <Card title="公告列表" bordered={false} extra={<Button onClick={this.toExcel}>导出excel</Button>}>
                <Table 
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns} 
                    loading={this.state.isLoading}
                    pagination={{
                        current: this.state.offset / this.state.limited + 1,
                        total: this.state.total,
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: this.onPageChange,
                        onShowSizeChange: this.onShowSizeChange
                    }}
                />
                <Modal 
                    title="此操作不可逆, 请谨慎操作!"
                    visible={this.state.isShowArticleModal}
                    maskClosable={false}
                    confirmLoading={this.state.deleteArticleConfirmLoading}
                    onCancel={this.hideDeleteModal}
                    onOk={this.deleteNews}
                >
                    <Typography>确定要删除 <span style={{color :'red'}}>{this.state.deleteArticleModalContent} 吗?</span></Typography>
                </Modal>
            </Card>
        )
    }
}
