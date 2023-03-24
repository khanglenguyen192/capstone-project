import { getValue } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';

function UploadFile(props) {
    const [image, setImage] = useState("");

    return (
        <div class="form-group row d-flex justify-content-center align-items-center">
            <div class="vertical-center">
                <input
                    type="file"
                    class="img-cover file-upload-default"
                    onChange="onChange($event)"
                    name="uploadedFile"
                    hidden
                ></input>
                <div class="input-group">
                    <input
                        type="text"
                        // value={ userInfo.imageInfo }
                        class="form-control file-upload-info img-cover"
                        disabled
                        placeholder={ props.placeholder }
                    ></input>
                    <span class="input-group-append">
                        <button
                            class="btn-info disabled"
                            disabled={ !props.isAdmin }
                            style={ { width: '5rem', borderTopRightRadius: '6px', borderBottomRightRadius: '6px', cursor: 'pointer' } }
                            type="button"
                            onClick="imageUpload.click()">
                            Tải Lên
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;