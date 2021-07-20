import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = (props) => {
  return (
    <div className="text-center">
      <Spinner color="dark" size="lg"/>
    </div>
  );
}
export default Loading;