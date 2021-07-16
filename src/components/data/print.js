import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Data from '../data/index';

const Example = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
    return (
      <div>
        <Data ref={componentRef} />
        <button onClick={handlePrint}>Print this out!</button>
      </div>
    );
  };

export default Example;