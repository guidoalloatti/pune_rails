/////////////////////
// V1 - Working
/////////////////////
document.addEventListener('DOMContentLoaded', () => {
	const video = document.getElementById('video');
    const resolutionDropdown = document.getElementById('resolution');
    
	navigator.mediaDevices.getUserMedia({ video: true })
	  .then(stream => {
		video.srcObject = stream;

		// Set the video element's size to the camera's resolution
		const { width, height } = stream.getVideoTracks()[0].getSettings();
		video.width = width;
		video.height = height;
	  })
	  .catch(err => {
		console.error(`Error accessing the camera: ${err}`);
	  });
  });

/////////////////////
// V2 - Working
/////////////////////
// document.addEventListener('DOMContentLoaded', () => {
//     const video = document.getElementById('video');
//     const resolutionDropdown = document.getElementById('resolution');
    
//     // Set default resolution to max
//     let resolutionConstraints = {
//       width: { ideal: 4096 },
//       height: { ideal: 2160 }
//     };
    
//     // Update constraints when resolution changes
//     resolutionDropdown.addEventListener('change', () => {
//       const resolution = resolutionDropdown.value;
//       switch(resolution) {
//         case 'hd':
//           resolutionConstraints = {
//             width: { ideal: 1280 },
//             height: { ideal: 720 }
//           };
//           break;
//         case 'fullhd':
//           resolutionConstraints = {
//             width: { ideal: 1920 },
//             height: { ideal: 1080 }
//           };
//           break;
//         case '4k':
//           resolutionConstraints = {
//             width: { ideal: 4096 },
//             height: { ideal: 2160 }
//           };
//           break;
//         default:
//           resolutionConstraints = {
//             width: { ideal: 4096 },
//             height: { ideal: 2160 }
//           };
//       }
      
//       // Reinitialize video stream with updated constraints
//       navigator.mediaDevices.getUserMedia({ video: resolutionConstraints })
//         .then(stream => {
//           video.srcObject = stream;
          
//           // Set the video element's size to the new camera resolution
//           const { width, height } = stream.getVideoTracks()[0].getSettings();
//           video.width = width;
//           video.height = height;
//         })
//         .catch(err => {
//           console.error(`Error accessing the camera: ${err}`);
//         });
//     });
    
//     // Initialize video stream with default constraints
//     navigator.mediaDevices.getUserMedia({ video: resolutionConstraints })
//       .then(stream => {
//         video.srcObject = stream;
        
//         // Set the video element's size to the camera resolution
//         const { width, height } = stream.getVideoTracks()[0].getSettings();
//         video.width = width;
//         video.height = height;
//       })
//       .catch(err => {
//         console.error(`Error accessing the camera: ${err}`);
//       });
//   });



// V3
// document.addEventListener('DOMContentLoaded', () => {
//     const video = document.getElementById('video');
//     const resolutionDropdown = document.getElementById('resolution');
    
//     // Set default resolution to max
//     let resolutionConstraints = {
//       width: { ideal: 1024 },
//       height: { ideal: 2160 }
//     };
    
//     // Update constraints when resolution changes
//     resolutionDropdown.addEventListener('change', () => {
//       const resolution = resolutionDropdown.value;
//       if (resolution === 'default') {
//         resolutionConstraints = {
//           width: { },
//           height: { }
//         };
//       } else {
//         switch(resolution) {
//           case 'hd':
//             resolutionConstraints = {
//               width: { ideal: 1280 },
//               height: { ideal: 720 }
//             };
//             break;
//           case 'fullhd':
//             resolutionConstraints = {
//               width: { ideal: 1920 },
//               height: { ideal: 1080 }
//             };
//             break;
//           case '4k':
//             resolutionConstraints = {
//               width: { ideal: 4096 },
//               height: { ideal: 2160 }
//             };
//             break;
//           case 'ld':
//             resolutionConstraints = {
//               width: { ideal: 800 },
//               height: { ideal: 600 }
//             };
//             break;
//           case 'lld':
//             resolutionConstraints = {
//               width: { ideal: 640 },
//               height: { ideal: 480 }
//             };
//             break;
//           default:
//             resolutionConstraints = {
//                 width: { ideal: 1920 },
//                 height: { ideal: 1080 }
//             };
//         }
//       }
      
//       // Reinitialize video stream with updated constraints
//       navigator.mediaDevices.getUserMedia({ video: resolutionConstraints })
//         .then(stream => {
//           video.srcObject = stream;
          
//           // Set the video element's size to the new camera resolution
//           const { width, height } = stream.getVideoTracks()[0].getSettings();
//           video.width = width;
//           video.height = height;
//         })
//         .catch(err => {
//           console.error(`Error accessing the camera: ${err}`);
//         });
//     });
    
//     // Initialize video stream with default constraints
//     navigator.mediaDevices.getUserMedia({ video: resolutionConstraints })
//       .then(stream => {
//         video.srcObject = stream;
        
//         // Set the video element's size to the camera resolution
//         const { width, height } = stream.getVideoTracks()[0].getSettings();
//         video.width = width;
//         video.height = height;
//       })
//       .catch(err => {
//         console.error(`Error accessing the camera: ${err}`);
//       });
//   });

