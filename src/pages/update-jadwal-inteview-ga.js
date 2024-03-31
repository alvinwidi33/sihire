import Sidebar from '../components/sidebar';
import React from 'react';

function UpdateJadwalInteviewGA() {

    const rectangleStyle = {
    width: '70%',
    height: '550px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '22%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
    marginTop: '-14%',
  };

    return (
        <React.Fragment>
        <Sidebar/>
        
            <div className='update-interview'>
                 <div className="rectangle-style" style={rectangleStyle}>
                    
                 </div>
            </div>
        </React.Fragment>
    );
}

export default UpdateJadwalInteviewGA;