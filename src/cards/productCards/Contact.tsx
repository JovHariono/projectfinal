import { StaticImageData } from 'next/image';
import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IContactProps {
    gambar: IconProp
    detail: string
}

const Contact: React.FunctionComponent<IContactProps> = (props) => {
  return (
    <div className='containerContact'>
        <div className='containerImageContact'>
            <FontAwesomeIcon icon={props.gambar}/>
        </div>
        <div className='detailContact'>{props.detail}</div>
    </div>
  );
};

export default Contact;
