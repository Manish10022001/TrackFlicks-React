import { useState } from "react";

const containerStyle = {
  display: "flex",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
  //   gap: "4px",
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
}; 
//default values  below
export default function StarRating({
  maxRating = 5,
  
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {/* use array method to get dynamically  */}
        {Array.from({ length: maxRating }, (_, i) => (
          //   <span>S{i + 1}</span>
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            //full={rating >= i + 1} //created full prop to fill stars based on condition i.e if selected rating is greater or equal to i+1 then it will fill those stars and if no then it will keep it empty
            //stars are not getting full,so use ternary operator, on full prop
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1} //now when we hover, stars are filled but when we leave it sets rating to the entered star.
            onHoverIn={() => setTempRating(i + 1)} //i+1 as if only used i then it will give 0 on first start as first index is 0. so we use i+1
            onHoverOut={() => setTempRating(0)} //when mouse leaves rating to 0
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>{" "}
      {/* give tempRating || rating || '', so that when we move to start that rating is set and when we leave that rating is fixed*/}
    </div>
  );
}
/*to get the rating even when the mouse hovers on the stars
  1.create state, 2. use event onMouseEnter  and on MouseLeave events so that when it is on star it gets that rating, when it leaves rating goes away
  3.crate functiona as props called onHoverIn and onHoverOut in line 34 and 35 and pass props to events onMouseEnter and onMouseLeave
*/
const starStyle = {
  width: "48px",
  height: "48px",
  display: "block",
  cursor: "pointer",
};
function Star({ onRate, full, onHoverIn, onHoverOut}) {

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={() => onHoverIn()}
      onMouseLeave={() => onHoverOut()}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="black"
          stroke="white"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
