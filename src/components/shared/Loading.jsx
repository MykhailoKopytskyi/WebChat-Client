import {ThreeCircles} from "react-loader-spinner";

const Loading = () => {
  return (
    <div className='loading-wrapper' >
      <ThreeCircles
        height="300" 
        width="300" 
        radius="9"
        color="#C3C3C3" 
        ariaLabel="three-dots-loading"
        visible={true}
  />
    </div>
  )
}

export default Loading
