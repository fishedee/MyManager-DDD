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

const CardList: React.FC<any> = observer((props) => {
    const [data, setData] = useState<any[]>([]);
    const [select, setSelect] = useState(undefined);
    const [select2, setSelect2] = useState(undefined);
    const [select3, setSelect3] = useState(undefined);

    console.log('data length', data.length);
    const fetch = () => {
        setData([]);
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
        <Space style={{ display: 'flex', width: '100%' }} wrap={true}>
            <ProCard title={'筛选'}>
                <Space
                    style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}
                    size={30}
                >
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
                        value={select3}
                        onChange={onSelect3}
                        style={{ width: '300px' }}
                        options={options3}
                    />
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
                        value={select3}
                        onChange={onSelect3}
                        style={{ width: '300px' }}
                        options={options3}
                    />
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
                        value={select3}
                        onChange={onSelect3}
                        style={{ width: '300px' }}
                        options={options3}
                    />
                </Space>
            </ProCard>
        </Space>
    );
});

export default CardList;
