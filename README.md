

# Whiteboard

### The Problem & Our Proposed Solution
It is extremely hard to communicate ideas just by words, especially in a remote and virtual setting. Therefore, we have created Whiteboard, a collaborative image gallery where users can draw using a whiteboard and share their drawings in a gallery with other users. This solution can be used to enhance the virtual classroom experience, to serve as a social media platform, to store artwork, and to have fun and entertain!

Main features including,
* Real-time editing, drawing, and communication in annotations
* Basic drawing and erasing functions
* Managing members in the group

![Demo Landing]("/nextjs-whiteboard/assets/Demo Landing Page.gif")


### Website Link
[https://group-project-whiteboard.vercel.app/](https://group-project-whiteboard.vercel.app/)

### Team Members
Jacqueline Zhang, Joy Chu, Priyanka Goswami, Ryan Qiao, William Zhang

### Technologies
* HTML/CSS/JavaScript
* React, React Routers
* NextJS
* API - Websocket - https://www.npmjs.com/package/ws#api-docs

### Features & Functionality
Our project has several features including user accounts, easy gallery room creation and sharing, a drawing canvas, realtime illustration sharing, and commenting features.

To start off, users must have an account in order to use our application. We have provided functionality to allow people to create their own accounts with just a name, email, and password and login with those accounts. We were able to implement this functionality via Firebase’s user authentication feature, which also provides additional functionalities such as ensuring that only valid email addresses can be used and that an email can only be used once when registering for an account. User sessions will persist across pages and will be invalid when a user logs out.

![Demo Signin]("/nextjs-whiteboard/assets/Demo Login Page.gif")

Another feature in our project is easy gallery room creation and sharing. To create a gallery room, a user simply needs to input the name of the gallery. Then, the room will be automatically created, and a unique gallery room code will be generated. To share the gallery with others, users can access their unique gallery room code, and those who they share the code with can enter the code in order to enter the gallery room.

![Demo Dashboard Page]("/nextjs-whiteboard/assets/Demo Dashboard Page.gif")
![Demo Create Project]("/nextjs-whiteboard/assets/Demo Craete Project.gif")

Once a user enters a gallery room, they will instantly see drawings created by other users who have access to the same gallery, if there are any, without having to refresh the page. This is achievable by taking advantage of the key features of React and Firebase. Additionally, they will be able to add drawings of their own with our whiteboard feature, which was created using the <canvas> HTML tag, and save those drawings to the gallery to share with others.

![Demo Drawing]("/nextjs-whiteboard/assets/Demo Drawing.gif")
![Demo Comment]("/nextjs-whiteboard/assets/Demo Comment.gif")

Finally, we have a commenting feature, where users can leave kind and constructive comments on each others’ drawings. The comments showcase the name of the user, when the comment was posted, and the comment itself. Comments are drawing specific and allow a different way for users to interact with each other.  
 
![Demo Project Room]("/nextjs-whiteboard/assets/Demo Project Room.png")

### Learnings & Takeaways
One of the major things we learned was how to be creative and come up with new solutions when things didn’t go as planned. Our original idea was to create a real-time collaborative whiteboard with editing, annotating, and presenting modes that could be used by individuals and teams. We, first, tried to use AWW’s (A Web Whiteboard) API to implement most of the whiteboard drawing functionality; however, we ran into issues including the API requiring us to have a custom domain in order to unlock some of the features. We, then, pivoted to using the Websocket API and <canvas> HTML tags to create our own real-time collaborative whiteboard; however, because we were using NextJS for our project and didn’t have access to much of the server side functionality, we found it difficult to integrate Websocket’s API with NextJS. Despite these failures, we didn’t give up on the whiteboard idea and eventually settled on creating a social-media-inspired drawing, image viewing, and commenting platform with galleries and a shareable whiteboard space.

Another major takeaway from this project was our exposure to new technologies, including NextJS and Firebase. These were both mentioned in lecture but we didn’t get that much hands-on experience with these two technologies until this project. One of the unique things we learned while using NextJS was how to use static and dynamic routes to separate our ideas into different pages. This not only improved the overall flow of our project but also helped us separate tasks and avoid painful merge conflicts. With Firebase, we learned how to use user authentication, manage user sessions, and read and write to the realtime database. We found ways to use the database in unique ways, such as store images and comments that could be easily retrieved for our gallery room feature.

Our final key takeaway was that we learned how to work effectively and efficiently as a team and utilize our individual strengths. We started off as strangers with a variety of backgrounds and experiences, yet we were able to communicate well despite being in a remote setting and use our individual strengths and experiences to help each other out. We constantly bounced ideas off of each other and used different methods of communication, such as drawings, to convey ideas when things got complicated and confusing. Despite taking a detour on our original project idea, we collectively found ways to make the project interesting to us individually, which fueled our passion and dedication towards the project.

