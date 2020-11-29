import React, { useState, useEffect } from "react";
import { auth, db } from '../config/firebase';

function Gallery() {

  const [imageURLs, setimageURLs] = useState([]);


  var picturesRef = db.ref("galleries/" + "0000" + "/pictures");
  
   let json = {}
   picturesRef.on("value", function(snapshot) {
      json = snapshot.val();

      let test = []
      for (let element in json) {
        test.push(json[element])
      }
      
      if (!arraysEqual(test, imageURLs)) {
        setimageURLs(test)
      }
        // for (let element in json) {
        //   if (!(imageURLs.includes(json[element]['imageURL']))) {
        //     let arrayClone = [...imageURLs]
        //     setimageURLs(arrayClone.push(json[element]['imageURL']))
        //   }
        // }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });  

  // let imageURLs = ['https://homepages.cae.wisc.edu/~ece533/images/fruits.png','https://homepages.cae.wisc.edu/~ece533/images/peppers.png']
  
  function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)==JSON.stringify(a2);
  }

  function renderImage(imageUrl) {
    return (
      <div>
        <img src={imageUrl['imageURL']} />
        <figcaption>Created by {imageUrl['creator']}</figcaption>
      </div>
    );
  }


  
  return (
    <div className="gallery">
      <div className="images">
        {imageURLs.map(imageUrl => renderImage(imageUrl))}
      </div>
    </div>
  );
  

}

export default Gallery;

// import React from "react";

// class Gallery extends React.Component {
//   renderImage(imageUrl) {
//     console.log("alkjfe type of imageURL: " + typeof(imageUrl) + imageUrl)
//     return (
//       <div>
//         <img src={imageUrl} />
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div className="gallery">
//         <div className="images">
//           {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
//         </div>
//       </div>
//     );
//   }
// }
// // Gallery.propTypes = {
// //   imageUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// // };
// export default Gallery;