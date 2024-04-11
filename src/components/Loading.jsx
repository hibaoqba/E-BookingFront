import React from 'react'
import {ThreeDots} from 'react-loader-spinner';

const Loading = () => {
  return (
   
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#424242"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    </div>
  )
}

export default Loading
