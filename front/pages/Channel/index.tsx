import React from 'react';
import { Container, Header, DragOver } from '@pages/Channel/styles';

const Channel = () => {
    return(
         <Container> 채널 
             <Header>
                 <span>#{Channel}</span>
                 <div className='header-right' >
                     <span> </span>
                     <button>
                        <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
                     </button>
                 </div>
             </Header>
         </Container> 
    )
}

export default Channel