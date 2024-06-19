// import React from 'react'
// import { Col } from 'reactstrap';

// const AgencyInfo = ({user}) => {
//   return (
//     <Col
//     // key={i}
//     style={{
//       paddingBottom: "1rem"
//     }}
//     className="font-icon-list row col-xs-6"
//     // lg="2"
//     // md="4"
//     // sm="4"
//     onClick={() => {
//       console.log(user);
//       Swal.fire({

//         html: `
//         <strong style="font-size: 1.8rem;">${user.type === "user" ? "user" : "company"} Profile Details</strong>
//         <br>
//         <img  style="object-fit: contain height:10rem; width:10rem;" src="${user.selfie}" alt="Profile Picture"></img>
//         <br></br>
//         <b>UserName: </b>${user.userName}
//         <br>
//         <b>Email: </b>${user.email}
//         <br>
//         <b>Phone Number: </b>${user.phoneNumber}
//         <br>
//         <b>Type: </b>${user.type}
//         `,
//         // imageUrl: `${user.selfie}`,
//         // imageWidth: 150,
//         // imageHeight: 150,
//         imageAlt: "Custom image",
//         backdrop: `rgba(0, 0, 0, 0.5)`,
//         showCloseButton: true,
//         showCancelButton: true,
//         // objectFit:"cover",
//         focusConfirm: false,
//         confirmButtonText: `
//        <i class="fa fa-ban"></i> ${user.isBlocked ? "unBlock" : "Block"}
//       `,
//         confirmButtonAriaLabel: "Thumbs up, great!",
//         customClass: {
//           text: "swal-secondary-text",
//           container: 'my-modal',
//           confirmButton: user.isBlocked ? 'unban-button' : 'ban-button',
//           cancelButton: !user.isBlocked ? 'unban-button' : 'ban-button'
//         },
//         cancelButtonText: `
//        <i class="fa fa-close"></i> Cancel
//       `,
//         // cancelButtonAriaLabel: "Thumbs down"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           Swal.fire({
//             title: "Are you sure?",
//             html: user.isBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBlock <strong>${user.userName}</strong> ?`,
//             // text: user.isBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBlock <strong>${user.userName}</strong> ?`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes!",
//             cancelButtonText: "No, cancel!"
//           }).then((result) => {
//             if (result.isConfirmed) {
//               handleBlock(user.id)
//               Swal.fire({
//                 title: user.isBlocked ? `User <b>${user.userName}</b> Can Log in freely Now` : `User ${user.userName} Blocked`,
//                 text: user.isBlocked ? "Thank you for your Job Admin." : "Thank you for your Job Admin.",
//                 icon: "success"
//               });
//             } else if (
//               result.dismiss === Swal.DismissReason.cancel
//             ) {
//               Swal.fire({
//                 title: "Cancelled",
//                 text: "The user ban has been cancelled.",
//                 icon: "error"
//               });
//             }
//           });
//         }
//       });
//     }}

//   >
//     <div className="font-icon-detail" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//       <div onClick={(event) => {
//         event.stopPropagation();
//         handleDetailClick(user);
//         openModal();
//       }} className="details_btn" style={{ alignSelf: 'flex-end', marginRight: ".5rem" }}>
//         {/* {user.type === "user" ? null : <Detail />} */}
//       </div>
//       <div style={{ display: 'flex', flexDirection: 'column', marginBottom: "0rem", alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
//         <img src={user.selfie} style={{ maxHeight: "7rem", width: "3.5rem", objectFit: "contain" }} />
//         <p className="userNameCol" style={{}}>{user.userName}<br></br>{user.email}</p>
//       </div>
//     </div>

//   </Col>
//   )
// }

// export default AgencyInfo
