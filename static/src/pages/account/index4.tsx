import MyPageContainer from '@/components/MyPageContainer';
import { SpaceDivider, useRequest } from 'antd-formily-boost';
import { createSchemaField, observer, FormConsumer } from '@formily/react';
import { Button, Select } from 'antd';
import Link from '@/components/Link';
import ProCard from '@ant-design/pro-card';
import { useHistory } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Space } from '@formily/antd';
import { throttle } from 'underscore';

type MyTableProps = {
    dataSource: any;
    columns: any;
};
const MyTable: React.FC<MyTableProps> = (data) => {
    const headers = data.columns.map((single: any) => {
        return <td key={single.key}>{single.title}</td>;
    });
    const body = data.dataSource.map((singleRow: any, index: number) => {
        const row = data.columns.map((single: any) => {
            return <td key={single.key}>{singleRow[single.dataIndex]}</td>;
        });
        return <tr key={index}>{row}</tr>;
    });
    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{body}</tbody>
        </table>
    );
};
const CardList: React.FC<any> = observer((props) => {
    const [data, setData] = useState<any[]>([]);
    const [select, setSelect] = useState(undefined);
    const [select2, setSelect2] = useState(undefined);
    const [select3, setSelect3] = useState(undefined);

    console.log('data length', data.length);
    const fetch = () => {
        let newData = [
            ...data,
            {
                createTime: '2014-10-10 12:00:00',
                modifyTime: '2014-10-10 12:00:00',
                id: 10015,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'TRANSFER_IN',
                remark: '',
            },
            {
                createTime: '2014-11-10 12:00:00',
                modifyTime: '2014-11-10 12:00:00',
                id: 10014,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'OUT',
                remark: '',
            },
            {
                createTime: '2021-09-02 06:41:33',
                modifyTime: '2021-09-02 06:41:33',
                id: 10013,
                userId: 10001,
                userName: 'fish',
                name: '日常支出',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'IN',
                remark: '',
            },
            {
                createTime: '2014-10-10 12:00:00',
                modifyTime: '2014-10-10 12:00:00',
                id: 10012,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'TRANSFER_IN',
                remark: '',
            },
            {
                createTime: '2014-11-10 12:00:00',
                modifyTime: '2014-11-10 12:00:00',
                id: 10011,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'OUT',
                remark: '',
            },
            {
                createTime: '2021-09-02 06:41:33',
                modifyTime: '2021-09-02 06:41:33',
                id: 10010,
                userId: 10001,
                userName: 'fish',
                name: '日常支出',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'IN',
                remark: '',
            },
            {
                createTime: '2014-10-10 12:00:00',
                modifyTime: '2014-10-10 12:00:00',
                id: 10009,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'TRANSFER_IN',
                remark: '',
            },
            {
                createTime: '2014-11-10 12:00:00',
                modifyTime: '2014-11-10 12:00:00',
                id: 10008,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'OUT',
                remark: '',
            },
            {
                createTime: '2021-09-02 06:41:33',
                modifyTime: '2021-09-02 06:41:33',
                id: 10007,
                userId: 10001,
                userName: 'fish',
                name: '日常支出',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'IN',
                remark: '',
            },
            {
                createTime: '2014-10-10 12:00:00',
                modifyTime: '2014-10-10 12:00:00',
                id: 10006,
                userId: 10001,
                userName: 'fish',
                name: '日常收入',
                money: '100.0000',
                categoryId: 10001,
                categoryName: '日常收支',
                cardId: 10002,
                cardName: '消费卡',
                type: 'TRANSFER_IN',
                remark: '',
            },
        ];
        setData(newData);
    };
    const fetchThrottle = throttle(fetch, 200, {
        leading: false,
    });
    const onSelect = (value: any) => {
        setSelect(value);
        fetchThrottle();
    };
    const onSelect2 = (value: any) => {
        setSelect2(value);
        fetchThrottle();
    };
    const onSelect3 = (value: any) => {
        setSelect3(value);
        fetchThrottle();
    };
    const columns = [
        {
            title: '账务ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '金额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '银行卡',
            dataIndex: 'cardName',
            key: 'cardName',
        },
        {
            title: '分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];
    const listSchema = (
        <MyTable
            //默认就有分页控件的
            columns={columns}
            dataSource={data}
        />
    );
    const options = [
        { label: '收入', value: 'IN' },
        { label: '支出', value: 'OUT' },
        { label: '转账收入', value: 'TRANSFER_IN' },
        { label: '转账支出', value: 'TRANSFER_OUT' },
    ];
    const options2 = [
        { label: '收入', value: 'IN' },
        { label: '支出', value: 'OUT' },
        { label: '转账收入', value: 'TRANSFER_IN' },
        { label: '转账支出', value: 'TRANSFER_OUT' },
    ];
    const options3 = [
        { label: '收入', value: 'IN' },
        { label: '支出', value: 'OUT' },
        { label: '转账收入', value: 'TRANSFER_IN' },
        { label: '转账支出', value: 'TRANSFER_OUT' },
    ];
    return (
        <Space style={{ display: 'flex' }} direction="vertical">
            <ProCard title={'筛选'}>
                <Space style={{ display: 'flex' }} size={30}>
                    <Select
                        value={select}
                        onChange={onSelect}
                        style={{ width: '300px' }}
                        options={options}
                    />
                    <Select
                        value={select2}
                        onChange={onSelect2}
                        style={{ width: '300px' }}
                        options={options2}
                    />
                    <Select
                        value={select2}
                        onChange={onSelect3}
                        style={{ width: '300px' }}
                        options={options3}
                    />
                </Space>
            </ProCard>
            <ProCard title="列表">{listSchema}</ProCard>
        </Space>
    );
});

export default CardList;
