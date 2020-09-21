/**
 * Takes a mockOnStreamAvailable function which when given a
 * webrtcstream returns a new stream to replace it with.
 *
 * @source https://github.com/aullman/opentok-camera-filters/blob/master/src/mock-get-user-media.js
 */
function mockGetUserMedia(mockOnStreamAvailable) {
  console.log('Mock user media');
  var oldGetUserMedia;
  // if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
  //   // console.log('Dupa 1');
  //   // console.log(navigator);
  //   // oldGetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  //   //   navigator.mozGetUserMedia;
  //   // if (!!oldGetUserMedia) {
  //   //   console.warn('No old user media');
  //   //   oldGetUserMedia = navigator.mediaDevices.getUserMedia({video: true})
  //   // }
  //   // console.log(oldGetUserMedia);
  //   // navigator.webkitGetUserMedia = navigator.getUserMedia = navigator.mozGetUserMedia =
  //   //   function getUserMedia(constraints, onStreamAvailable, onStreamAvailableError,
  //   //                         onAccessDialogOpened, onAccessDialogClosed, onAccessDenied) {
  //   //     console.log("Used old gUM");
  //   //     return oldGetUserMedia.call(navigator, constraints, function (stream) {
  //   //       console.log("Returning mock stream", stream);
  //   //       onStreamAvailable(mockOnStreamAvailable(stream));
  //   //     }, onStreamAvailableError,
  //   //     onAccessDialogOpened, onAccessDialogClosed, onAccessDenied);
  //     };
  // } else
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('Dupa 2');
    oldGetUserMedia = navigator.mediaDevices.getUserMedia;
    navigator.mediaDevices.getUserMedia = function getUserMedia (constraints) {
      console.log("Used new gUM (navigator.mediaDevices.getUserMedia)");
      return new Promise(function (resolve, reject) {
        oldGetUserMedia.call(navigator.mediaDevices, constraints).then(function (stream) {
          console.log("Returning mock stream", stream);
          resolve(mockOnStreamAvailable(stream));
        }, function (reason) {
          console.log("Rejected mock stream", reason);
          reject(reason);
        }).catch(function(err) {
          console.log("Error getting mock stream", err);
        });
      });
    };
  } else {
    console.error('Could not find getUserMedia function to mock out');
  }
};
