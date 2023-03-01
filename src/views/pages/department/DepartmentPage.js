import { React, useState } from 'react';
import { Row, Col, Dropdown, Input, message, Upload } from 'antd';
import { ReactComponent as Icon } from '../../../assets/iconfonts/mdi/icon/add-icon.svg';
import './Department.css';
import Colors from '../../../common/constants/Colors';
import Popup from '../../components/Popup';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function DepartmentPage() {
  const items = [
    {
      name: 'Ban Quản lý',
      color: Colors.red,
    },
    {
      name: 'Ban Giám đốc',
      color: Colors.gray,
    },
    {
      name: 'Phòng Nhân sự',
      color: Colors.dark_cyan,
    },
    {
      name: 'Phòng Kế toán - Tài chính',
      color: Colors.blue,
    },
    {
      name: 'Phòng Marketing',
      color: Colors.greenish,
    },
    {
      name: 'Phòng Kỹ thuật - Công nghệ',
      color: Colors.quite_blue,
    },
  ];

  const opts = [
    {
      label: <a href="#" className="option">Thông tin phòng ban</a>,
      key: '0',
    },
    {
      label: <a href="#" className="option">Thành viên</a>,
      key: '1',
    },
  ];

  const { TextArea } = Input;
  const [buttonPopup, setButtonPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      <div style={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      } }>
        <Icon style={ {
          fill: Colors.quite_gray,
          scale: '0.6'
        } } />
      </div>
    </div>
  );

  return (
    <div className="department-card" style={ { backgroundColor: Colors.white_content } }>
      <p className="department-title">Trụ sở Công ty TNHH ABC</p>
      <Row gutter={ [50, 60] } style={ { margin: '0 20px' } }>
        { items.map((item) => (
          <Dropdown
            menu={ {
              items: opts,
            } }
            trigger={ ['click'] }
          >
            <Col span={ 6 } onClick={ (e) => e.preventDefault() }>
              <div className="container">
                <svg width="140" height="140" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    opacity="0.2"
                    d="M145 25H95C92.2386 25 90 27.2386 90 30V130C90 132.761 92.2386 135 95 135H145C147.761 135 150 132.761 150 130V30C150 27.2386 147.761 25 145 25Z"
                    fill="black"
                  />
                  <path
                    fill={ item.color }
                    d="M15 60V105C15 106.326 15.5268 107.598 16.4645 108.536C17.4021 109.473 18.6739 110 20 110H70C71.3261 110 72.5979 110.527 73.5355 111.464C74.4732 112.402 75 113.674 75 115C75 116.326 74.4732 117.598 73.5355 118.536C72.5979 119.473 71.3261 120 70 120H60V130H70C71.3261 130 72.5979 130.527 73.5355 131.464C74.4732 132.402 75 133.674 75 135C75 136.326 74.4732 137.598 73.5355 138.536C72.5979 139.473 71.3261 140 70 140H40C38.6739 140 37.4021 139.473 36.4645 138.536C35.5268 137.598 35 136.326 35 135C35 133.674 35.5268 132.402 36.4645 131.464C37.4021 130.527 38.6739 130 40 130H50V120H20C16.0268 119.984 12.2211 118.398 9.41158 115.588C6.60209 112.779 5.01645 108.973 5 105V60C5.01645 56.0268 6.60209 52.2211 9.41158 49.4116C12.2211 46.6021 16.0268 45.0165 20 45H70C71.3261 45 72.5979 45.5268 73.5355 46.4645C74.4732 47.4021 75 48.6739 75 50C75 51.3261 74.4732 52.5979 73.5355 53.5355C72.5979 54.4732 71.3261 55 70 55H20C18.6739 55 17.4021 55.5268 16.4645 56.4645C15.5268 57.4021 15 58.6739 15 60V60ZM130 40H110C108.674 40 107.402 40.5268 106.464 41.4645C105.527 42.4021 105 43.6739 105 45C105 46.3261 105.527 47.5979 106.464 48.5355C107.402 49.4732 108.674 50 110 50H130C131.326 50 132.598 49.4732 133.536 48.5355C134.473 47.5979 135 46.3261 135 45C135 43.6739 134.473 42.4021 133.536 41.4645C132.598 40.5268 131.326 40 130 40ZM130 60H110C108.674 60 107.402 60.5268 106.464 61.4645C105.527 62.4021 105 63.6739 105 65C105 66.3261 105.527 67.5979 106.464 68.5355C107.402 69.4732 108.674 70 110 70H130C131.326 70 132.598 69.4732 133.536 68.5355C134.473 67.5979 135 66.3261 135 65C135 63.6739 134.473 62.4021 133.536 61.4645C132.598 60.5268 131.326 60 130 60ZM155 30V130C155 132.652 153.946 135.196 152.071 137.071C150.196 138.946 147.652 140 145 140H95C92.3478 140 89.8043 138.946 87.9289 137.071C86.0536 135.196 85 132.652 85 130V30C85 27.3478 86.0536 24.8043 87.9289 22.9289C89.8043 21.0536 92.3478 20 95 20H145C147.652 20 150.196 21.0536 152.071 22.9289C153.946 24.8043 155 27.3478 155 30ZM145 130V30H95V130H145ZM120 105C118.517 105 117.067 105.44 115.833 106.264C114.6 107.088 113.639 108.259 113.071 109.63C112.503 111 112.355 112.508 112.644 113.963C112.933 115.418 113.648 116.754 114.697 117.803C115.746 118.852 117.082 119.567 118.537 119.856C119.992 120.145 121.5 119.997 122.87 119.429C124.241 118.861 125.412 117.9 126.236 116.667C127.06 115.433 127.5 113.983 127.5 112.5C127.5 110.511 126.71 108.603 125.303 107.197C123.897 105.79 121.989 105 120 105Z"
                  />
                </svg>
                <p>{ item.name }</p>
              </div>
            </Col>
          </Dropdown>
        )) }
        <Col span={ 6 }
          style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          } }>
          <button id='add-department' onClick={ () => setButtonPopup(true) }>
            <div className="add-icon">
              <Icon style={ {
                fill: Colors.quite_blue
              } } />
            </div>
          </button>
        </Col>
        <Popup trigger={ buttonPopup } setTrigger={ setButtonPopup }>
          <div className='container-department'>
            <h4 className='title'>Thêm phòng ban</h4>
            <div className='content-department'>
              <h5 className='name'>Tên phòng ban</h5>
              <Input id='input-department' placeholder="Tên phòng ban của công ty" />
              <div className='detail'>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={ false }
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={ beforeUpload }
                  onChange={ handleChange }>
                  { imageUrl ? (
                    <img src={ imageUrl } alt="avatar" style={ { width: '100%', } } />
                  ) : (uploadButton) }
                </Upload>
                <div className='address'>
                  <h5>Mô tả</h5>
                  <TextArea rows={ 6 } placeholder="Thêm phần mô tả cho chi nhánh" style={{backgroundColor: Colors.graynish}}/>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </Row>
    </div>
  );
}
