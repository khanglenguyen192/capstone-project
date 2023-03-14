import React from 'react';
import Colors from '../../../common/constants/Colors';
import './NotificationPage.css';
import { ReactComponent as IconCircle } from '../../../assets/iconfonts/mdi/icon/circle-solid.svg';
import { ReactComponent as ReadEmail } from '../../../assets/iconfonts/mdi/icon/read-email.svg';
import { ReactComponent as UnreadEmail } from '../../../assets/iconfonts/mdi/icon/unread-email.svg';
import { ReactComponent as Trash } from '../../../assets/iconfonts/mdi/icon/trash-email.svg';
import { Select } from 'antd';



function NotificationPage() {
    const items = [
        {
            name: 'Tin nhắn',
            color: Colors.quite_blue,
        },
        {
            name: 'Tài khoản',
            color: Colors.orange,
        },
        {
            name: 'Dự án',
            color: Colors.blue_purple,
        },
        {
            name: 'Ngày nghỉ',
            color: Colors.red,
        },
        {
            name: 'Tăng ca',
            color: Colors.greenish,
        },
        {
            name: 'Sinh nhật',
            color: Colors.blue,
        },
        {
            name: 'Tạm ứng',
            color: Colors.quite_gray,
        },
    ];

    const opts = [
        {
            value: 'all',
            label: 'Tất cả',
        },
        {
            value: 'yesterday',
            label: 'Hôm qua',
        },
        {
            value: 'week',
            label: 'Tuần qua',
        },
        {
            value: 'month',
            label: 'Tháng qua',
        },
    ];

    const handleChange = (value) => {
        console.log(value);
    };

    const handleClick = (e) => {
        console.log(e)
    }

    return (
        <div className="container-noti" style={ { backgroundColor: Colors.white_content } }>
            <div className="left-noti">
                <table className="list-type-noti">
                    <thead>
                        <tr>
                            <th colSpan={ 2 }>Loại thông báo</th>
                        </tr>
                    </thead>
                    <tbody>
                        { items.map((item) => (
                            <tr>
                                <td className='icon-noti'><IconCircle style={ { fill: item.color, height: '0.5rem', width: '0.5rem' } } /></td>
                                <td className='tag' style={ { marginLeft: '20px' } }>{ item.name }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            <div className='right-noti'>
                <div className='sort-option'>
                    <div className='tools'>
                        <ReadEmail className='item' onClick={ () => {handleClick("Read email")} } />
                        <UnreadEmail className='item' onClick={ () => {handleClick("Unread email")} }/>
                        <Trash className='item' onClick={ () => {handleClick("Trash")} }/>
                    </div>
                    <Select
                        className='select-container'
                        labelInValue
                        defaultValue={ opts[0] }
                        style={ { width: 120, } }
                        onChange={ handleChange }
                        options={ opts } />
                </div>
                <div className='content'>
                    <p>
                        Hiện tại không có thông báo nào !!!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;