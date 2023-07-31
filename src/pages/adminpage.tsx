import * as React from 'react';
import Navbar from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faExpeditedssl } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

interface IAdminPageProps {
}

const AdminPage: React.FunctionComponent<IAdminPageProps> = (props) => {
  return (
    <div className='container'>
        <Navbar />
        <div className='contentAdminPage'>
            <Link className='containerLinkAdmin' href='/adminuserverification'>
                <FontAwesomeIcon icon={faUserPlus} className='faiAdmin' />
                User Verification
            </Link>
            <Link className='containerLinkAdmin' href='/adminproductverification'>
                <FontAwesomeIcon icon={faExpeditedssl} className='faiAdmin' />
                Product Verification
            </Link>
        </div>
    </div>
  );
};

export default AdminPage;
