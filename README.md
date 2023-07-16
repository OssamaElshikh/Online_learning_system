# E-Learning Website

![HomePage](https://user-images.githubusercontent.com/107733898/213337698-f25ce9f8-ac9f-4168-8519-efd0350b4ce7.jpg)

![Popular](https://user-images.githubusercontent.com/107733898/213337921-9a61d6e5-5a38-4b21-9f1f-11fa6922d40e.jpg)



## Table of Contents

- [Project Description](#project-description)
- [Tools and Frameworks](#tech-and-framework-used)
- [Features](#features)
- [Screenshots](#screenshots)

## Project Description

### Course

Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2022

### Theme

Our platform is an innovative e-learning solution that enables both personal and professional learners to sign up for a variety of training programs and monitor their progress as they strive to achieve a certificate of completion. The platform is equipped with a wide range of courses instructed by accomplished educators who have created interactive lectures and quizzes to assist learners in mastering the material. In addition to providing an easy and adaptable way for students to acquire new skills and knowledge, the platform also offers resources for educators to organize their courses and for administrators to address any concerns that may arise, such as requests for refunds or reports of technical issues. Whether you are seeking to advance your career, discover a new interest or simply broaden your perspectives, our platform is an excellent resource for anyone looking to learn and grow.

### Overview

Our platform was created following the Agile development process, which involves dividing the project into shorter, incremental periods referred to as "Sprints". Each Sprint has specific objectives, and at the end of each Sprint, a functional version of the platform is delivered and evaluated according to predefined system specifications. This method allows for a more dynamic and adaptive development approach, as it enables constant adjustments and enhancements based on feedback and shifting requirements.

### Objectives

- Acquire knowledge on how to effectively implement the Agile approach in project planning and software development.
- Develop proficiency in researching and utilizing the MERN Stack technology.
- Understand the process of creating software by following a defined set of System Requirements.
- Develop team collaboration skills through working on a project using GitHub.

## Tech and Framework used 🧰

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Material-UI](https://material-ui.com/)
- [Stripe](https://stripe.com/)
- [Git](https://git-scm.com/)
- [NodeMailer](https://nodemailer.com/about/)
- [Postman](https://www.postman.com/)
- [VSCode](https://code.visualstudio.com/)
- [JWT](https://jwt.io/)

## Features

| Feature                  | 🔰 Status |
| ------------------------ | :-------: |
| Authentication            |    ✔️     |
| Payments                 |    ✔️     |
| User Email Notifications |    ✔️     |
| User Password Reset      |    ✔️     |
| REST API                 |    ✔️     |

## Screenshots 📗

### Individual Trainee

- #### Sign up and enter their details in a form including first name, last name, email, password and gender.

![SignUp](https://user-images.githubusercontent.com/107733898/213337807-4783791a-ba9a-4d88-8fc9-9612ea433d3f.jpg)


- #### Sign in using his email and password.

![Login](https://user-images.githubusercontent.com/107733898/213337976-eb7147cf-a8ae-4a81-b6ea-d8364485d205.jpg)


- #### Send email in case of forgetting password.

![SendEmail](https://user-images.githubusercontent.com/107733898/213338032-532fe265-bba7-441b-8160-25474bfe4b97.jpg)


- #### Change password

![ResetPassword](https://user-images.githubusercontent.com/107733898/213338280-03083cdd-8cfb-46f6-91a0-456f0341fc41.jpg)


- #### View your profile

![ViewProfile](https://user-images.githubusercontent.com/107733898/213343859-eead088e-fd6b-4438-a231-9774bf66fffe.jpg)


- #### View Course Content

![ViewCours](https://user-images.githubusercontent.com/107733898/213343887-f36705b2-e92f-4509-ac5e-e199df517b01.jpg)
![ViewCourse](https://user-images.githubusercontent.com/107733898/213343894-36b0de1f-c45d-483c-8cb6-6a3e0dad4a0e.jpg)
![ViewCourseContent](https://user-images.githubusercontent.com/107733898/213343900-eea39463-a4db-4d40-a636-e33c4c443d45.jpg)



- #### See Your Certificate

![Certificate](https://user-images.githubusercontent.com/107733898/213343930-0d2d4b07-8678-4f90-8642-f769c10ada0c.jpg)


- #### Rating The Course 

![RateCourse](https://user-images.githubusercontent.com/107733898/213343980-3f84764a-9c98-492f-aa87-f015f8c7a3c6.jpg)


- #### See Resolved Problems

![ViewResolved](https://user-images.githubusercontent.com/107733898/213343997-16f6a9e8-83ed-4d81-96b2-700bde07c6d9.jpg)


- #### Solving Exercise

![SolveExercise](https://user-images.githubusercontent.com/107733898/213344020-24b9447d-e1f4-45de-9f86-0b4fb50e3628.jpg)

### Instructor

- #### Creating Course
![Create1](https://user-images.githubusercontent.com/107733898/213344201-a006ef77-b2e5-403f-93b2-2fe7c7d541b0.jpg)
![VideoCreate](https://user-images.githubusercontent.com/107733898/213344223-7a7c7241-1e5e-41e8-bf16-a5de2296458d.jpg)
![exerciseCreate](https://user-images.githubusercontent.com/107733898/213344238-bcf2b662-ee23-4845-9f4d-fbed11f871b3.jpg)
![CourseContract](https://user-images.githubusercontent.com/107733898/213344246-ae687e02-73f3-45f6-9bb9-d1f55e59346b.jpg)

### Admin Dashboard

![AdminDashboard](https://user-images.githubusercontent.com/107733898/213344280-435a7fc1-35bc-420e-baa6-912d9411dc0a.jpg)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In order to use `ES6 MODULE` in node js.

```bash
> cd server
> find `package.json`
> below `main` enter a new key-value pair called `type = module`
```

In the first terminal

```bash
> git clone https://github.com/malakzayan01/ACLTeam.git
> cd ACLTeam/
> cd server & npm i & cd..
> cd client & npm i
```

Backend

```bash
cd server && npm start
```

Frontend

```bash
cd client && npm start
```

## Environment Variables

Add this keys to .env file to run project

`PORT`

`MongodbURI`

`TOKEN_KEY`

`STRIPE_KEY`

## Code Example :computer:

---

```javascript
export const ProblemPopUp = ({ courseId, open, setOpen }) => {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setAlert(null);
      const res = await reportProblem(
        courseId,
        user?.result?._id,
        formData.get("issue"),
        selectedIssue
      );

      if (res.constructor.name !== "AxiosError") {
        setAlert({
          severity: "success",
          message: "Problem reported successfully",
        });
      }
    } catch (err) {
      setAlert({ severity: "error", message: err.message });
    }
    setTimeout(() => {
      setOpen(false);
      setAlert(null);
    }, 3000);
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Problem</DialogTitle>

      <Box
        component="form"
        sx={{ width: "100%" }}
        display="flex"
        flexDirection={"column"}
        onSubmit={handleSubmit}
      >
        <DialogContent>
          <DialogContentText>
            <Select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              sx={{ marginBottom: "1rem", width: "50%" }}
            >
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Financial">Financial</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Describe your issue"
              name="issue"
            ></TextField>
            {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
```

```javascript
export const getRatingsAndReviews = async (req, res) => {
  try {
    const { instructorId } = req.query;
    const instructor = await Instructor.findById(instructorId)
      .populate({
        path: "ratingsAndReviews",
        populate: { path: "individualTrainee" },
      })
      .populate({
        path: "ratingsAndReviews",
        populate: { path: "corporateTrainee" },
      });
    const ratingsAndReviews = instructor.ratingsAndReviews;
    res.status(200).json(ratingsAndReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
```

## END POINTS

### Authentication Routes

#### Route: `/users`

#### Create User

- Route: `/signup`
- Request Type: `POST`
- Request Body: `{
firstName:"Maram"
lastName:"Aly"
email:"maramaly184@yahoo.com",
password:"pass1234",
confirmPassword:"pass1234",
gender:"Female"
}`
- Response Body: `{
result: {
_id:"63c486c5e9a9c6751066e5ac",
firstName:"Maram",
lastName:"Aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
wallet:0.0,
myCourses:[]
},
role:"individualTrainee",
token: //Generated JWT token
}`

#### Login User

- Route: `/signin`
- Request Type: `POST`
- Request Body: `{
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW"
}`
- Response Body: `{
result: {
_id:"63c486c5e9a9c6751066e5ac",
firstName:"Maram",
lastName:"Aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
wallet:0.0,
myCourses:[]
},
role:"individualTrainee",
token:"//Generated JWT token"
}`

#### Change Password

- Route: `/changePassword`
- Request Type: `PATCH`
- Request Query: `{
password:"pass",
confirmPassword:"pass",
userId:"63c486c5e9a9c6751066e5ac"
}`
- Response Body: `{
message:"Password changed"
}`

#### Reset Password Mail

- Route: `/resetPasswordMail`
- Request Type: `POST`
- Request Query: `{
email:"maramaly184@yahoo.com"
}`
- Response Body: `{
message:"Mail sent"
}`

### Other Routes for all users

#### Route: `/users`

#### Report a problem

- Route: `/reportProblem`
- Request Type: `POST`
- Request Query: `{
userId:"63c486c5e9a9c6751066e5ac",
courseId:"63b67e1b4b5f2b2adc6e917e",
problem:"There is a problem",
problemType:"Technical",
}`
- Response Body: `{
_id:"63c6b801c4964df42a335c38"
individualTrainee:"63c486c5e9a9c6751066e5ac"
course:"63b67e1b4b5f2b2adc6e917e"
problem:"There is a problem"
problemType:"Technical"
status:"unseen"
date:2023-01-17T15:00:17.419+00:00
}`

#### Get all problems unless resolved

- Route: `/report`
- Request Type: `GET`
- Request Query: `{
  id:"63c486c5e9a9c6751066e5ac"
}`
- Response Body: `[
{
_id:"63c6b801c4964df42a335c38"
individualTrainee:"63c486c5e9a9c6751066e5ac"
course:"63b67e1b4b5f2b2adc6e917e"
problem:"There is a problem"
problemType:"Technical"
status:"unseen"
date:2023-01-17T15:00:17.419+00:00
}
]`

#### Follow up on an unresolved problem

- Route: `/followUp`
- Request Type: `PATCH`
- Request Query: `{
  id:"63c486c5e9a9c6751066e5ac",
  message:"Modify the problem"
}`
- Response Body: `{
_id:"63c6b801c4964df42a335c38"
individualTrainee:"63c486c5e9a9c6751066e5ac"
course:"63b67e1b4b5f2b2adc6e917e"
problem:"There is a problem \n Modify the problem"
problemType:"Technical"
status:"unseen"
date:2023-01-17T15:00:17.419+00:00
}`

#### Get all problems resolved

- Route: `/resolved`
- Request Type: `GET`
- Request Query: `{
  id:"63c486c5e9a9c6751066e5ac"
}`
- Response Body: `[
{
_id:"63c6b801c4964df42a335c38"
individualTrainee:"63c486c5e9a9c6751066e5ac"
course:"63b67e1b4b5f2b2adc6e917e"
problem:"There is a problem \n Modify the problem"
problemType:"Technical"
status:"resolved"
date:2023-01-17T15:00:17.419+00:00
}
]`

### Admin Routes

#### Route: `/admin`

#### Create Users

- Route: `/createUser`
- Request Type: `POST`
- Request Body: `{
firstName:"maramm",
lastName:"alyyy",
userName:"maram.adminn",
email:"maram.admin2@gmail.com",
password:"pass",
gender:"Female",
role:"Admin"
}`
- Response Body: `{
_id:"63c6afedc4964df42a335682",
firstName:"maramm",
lastName:"alyyy",
email:"maram.admin2@gmail.com",
password:"$2a$12$jluujHWfFbjlbe9PAZvXSODMrbDTcpZjbUlS5FKuaI4sH6yRZIg1W"
userName:"maram.adminn"
__v:0
}`

#### Get Courses Requests from Corporate Trainee

- Route: `/getRequestCourses`
- Request Type: `GET`
- Response Body: `[
{
_id:"63c6bfecc4964df42a336aeb"
corporateTrainee:{
_id:"63c6bcb4c4964df42a336950",
firstName:"dija",
lastName:"ahmedd",
email:"dija.corp@gmail.com",
password:"$2a$12$sj9jeEHuPgeek1Blu8OCGel3SS5pw813AtDc6NLLHkmxIViO3ms9i",
gender:"Female",
myCourses:[]
}
course:{
_id:"63b67e1b4b5f2b2adc6e917e"
title:"Maram102"
}
status:"unseen"
date:2023-01-17T15:34:04.349+00:00
}
]`

#### Grant Course access to Corporate Trainee

- Route: `/grantCourseAccess`
- Request Type: `POST`
- Request Query: `{
courseId:"63b67e1b4b5f2b2adc6e917e",
corporateTraineeId:"63c6bcb4c4964df42a336950",
requestCourseId:"63c6bfecc4964df42a336aeb"
}`
- Response Body: `[]`

#### Reject Course access to Corporate Trainee

- Route: `/rejectCourseAccess`
- Request Type: `DELETE`
- Request Query: `{
  requestCourseId:"63c6bfecc4964df42a336aeb"
}`
- Response Body: `[]`

#### Get all Reported Problems

- Route: `/getReportedProblems`
- Request Type: `GET`
- Response Body: `[
{
  _id:"63c6b801c4964df42a335c38",
individualTrainee:{
_id:"63c486c5e9a9c6751066e5ac",
firstName:"maram",
lastName:"aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
gender:"Female",
wallet:0.0,
myCourses:[]
},
course:{
_id:"63b67e1b4b5f2b2adc6e917e"
title:"Maram102"
},
problem:"too exoensive",
problemType:"Financial",
status:"unseen",
date:2023-01-17T15:00:17.419+00:00
}
]`

#### Update Problem Status

- Route: `/updateProblemStatus`
- Request Type: `PATCH`
- Request Query: `{
  problemId:"63c6b801c4964df42a335c38",
  status:"resolved"
}`
- Response Body:`[
{
  _id:"63c6b801c4964df42a335c38",
individualTrainee:{
_id:"63c486c5e9a9c6751066e5ac",
firstName:"maram",
lastName:"aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
gender:"Female",
wallet:0.0,
myCourses:[]
},
course:{
_id:"63b67e1b4b5f2b2adc6e917e"
title:"Maram102"
},
problem:"too exoensive",
problemType:"Financial",
status:"unseen",
date:2023-01-17T15:00:17.419+00:00
}
]`

#### Get Refund Requests

- Route: `/getRefundRequests`
- Request Type: `GET`
- Response body:`[
{
_id:"63c6b801c4964df42a335c38",
individualTrainee:{
_id:"63c486c5e9a9c6751066e5ac",
firstName:"maram",
lastName:"aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
gender:"Female",
wallet:0.0,
myCourses:[]
},
course:{
_id:"63b67e1b4b5f2b2adc6e917e"
title:"Maram102"
},
status:"unseen",
date:2023-01-17T15:00:17.419+00:00
}
]`

#### Accept Refund Request

- Route: `/acceptRefundRequest`
- Request Type: `PATCH`
- Request Query: `{
  refundId:"63c6b801c4964df42a335c38",
  courseId:"63b67e1b4b5f2b2adc6e917e",
  individualTraineeId:"63c486c5e9a9c6751066e5ac",
  instructorId:"63b621b7aff2da44dc24e48f"
}`
- Response Body: `[]`

#### Reject Refund Request

- Route: `/rejectRefundRequest`
- Request Type: `DELETE`
- Request Query: `{
  refundId:"63c6b801c4964df42a335c38"
}`
- Response Body: `[]`

#### Define Promotions for Courses

- Route: `/definePromotions`
- Request Type: `PATCH`
- Request Query: `{
  courses:"63b67e1b4b5f2b2adc6e917e",
  discount:50,
  startDate:2023-01-17T15:00:17.419+00:00,
  endDate:2023-01-17T15:00:17.419+00:00
}`
- Response Body: `[
{
_id:"63b67e1b4b5f2b2adc6e917e",
title:"Maram102",
subject:"philosophy",
price:40,
n_enrolled:7
hours:0.86
summary:"idk",
instructor:{
_id:"63b621b7aff2da44dc24e48f",
name:"maram aly",
}
subtitles:["63b67e1b4b5f2b2adc6e9181",
"63b67e1c4b5f2b2adc6e918b",
"63b67e1c4b5f2b2adc6e9190"],
previewVideo:
"https://www.youtube.com/watch?v=BeyOPlepg18",
rating:5.0,
discount:{
  _id:"63be24b59deb28b978b718ef",
  value:0.5,
  startDate:2023-01-11T02:44:20.000+00:00,
  endDate:2023-01-25T02:44:20.000+00:00
}
ratingsAndReviews:[]
}
]`

### Course Routes

### Route: `/course`

#### Get all Courses

- Route: `/`
- Request Type: `GET`
- Response Body: `[
{
_id:"63b67e1b4b5f2b2adc6e917e",
title:"Maram102",
subject:"philosophy",
price:40,
n_enrolled:7
hours:0.86
summary:"idk",
instructor:{
_id:"63b621b7aff2da44dc24e48f",
name:"maram aly",
}
subtitles:["63b67e1b4b5f2b2adc6e9181",
"63b67e1c4b5f2b2adc6e918b",
"63b67e1c4b5f2b2adc6e9190"],
previewVideo:
"https://www.youtube.com/watch?v=BeyOPlepg18",
rating:5.0,
discount:{
  _id:"63be24b59deb28b978b718ef",
  value:0.5,
  startDate:2023-01-11T02:44:20.000+00:00,
  endDate:2023-01-25T02:44:20.000+00:00
}
ratingsAndReviews:[]
}
]`

#### Get Course by ID

- Route: `/course`
- Request Type: `GET`
- Request Query: `{
  id:"63b67e1b4b5f2b2adc6e917e"
}`
- Response Body: `[
{
_id:"63b67e1b4b5f2b2adc6e917e",
title:"Maram102",
subject:"philosophy",
price:40,
n_enrolled:7
hours:0.86
summary:"idk",
instructor:{
_id:"63b621b7aff2da44dc24e48f",
name:"maram aly",
}
subtitles:["63b67e1b4b5f2b2adc6e9181",
"63b67e1c4b5f2b2adc6e918b",
"63b67e1c4b5f2b2adc6e9190"],
previewVideo:
"https://www.youtube.com/watch?v=BeyOPlepg18",
rating:5.0,
discount:{
  _id:"63be24b59deb28b978b718ef",
  value:0.5,
  startDate:2023-01-11T02:44:20.000+00:00,
  endDate:2023-01-25T02:44:20.000+00:00
}
ratingsAndReviews:[]
}
]`

#### Get Courses by Instructor

- Route: `/instructor`
- Request Type: `GET`
- Request Header: `{
  userid:"63b621b7aff2da44dc24e48f"
}`
- Response Body: `[
{
_id:"63b67e1b4b5f2b2adc6e917e",
title:"Maram102",
subject:"philosophy",
price:40,
n_enrolled:7
hours:0.86
summary:"idk",
instructor:{
_id:"63b621b7aff2da44dc24e48f",
name:"maram aly",
}
subtitles:["63b67e1b4b5f2b2adc6e9181",
"63b67e1c4b5f2b2adc6e918b",
"63b67e1c4b5f2b2adc6e9190"],
previewVideo:
"https://www.youtube.com/watch?v=BeyOPlepg18",
rating:5.0,
discount:{
  _id:"63be24b59deb28b978b718ef",
  value:0.5,
  startDate:2023-01-11T02:44:20.000+00:00,
  endDate:2023-01-25T02:44:20.000+00:00
}
ratingsAndReviews:[]
}
]`

#### Get Courses filtered by subject, search query, price and rating

- Route: `/filter`
- Request Type: `GET`
- Request Query: `{
  subject:"philosophy",
  search:"Maram",
  price:40,
  rating:5.0
}`
- Response Body: `[
{
_id:"63b67e1b4b5f2b2adc6e917e",
title:"Maram102",
subject:"philosophy",
price:40,
n_enrolled:7
hours:0.86
summary:"idk",
instructor:{
_id:"63b621b7aff2da44dc24e48f",
name:"maram aly",
}
subtitles:["63b67e1b4b5f2b2adc6e9181",
"63b67e1c4b5f2b2adc6e918b",
"63b67e1c4b5f2b2adc6e9190"],
previewVideo:
"https://www.youtube.com/watch?v=BeyOPlepg18",
rating:5.0,
discount:{
  _id:"63be24b59deb28b978b718ef",
  value:0.5,
  startDate:2023-01-11T02:44:20.000+00:00,
  endDate:2023-01-25T02:44:20.000+00:00
}
ratingsAndReviews:[]
}
]`

#### Get popular courses

- Route: `/popularCourses`
- Request Type: `GET`
- Response Body: `[
{
_id:"63b67e1b4b5f2b2adc6e917e",
title:"Maram102",
subject:"philosophy",
price:40,
n_enrolled:7
hours:0.86
summary:"idk",
instructor:{
_id:"63b621b7aff2da44dc24e48f",
name:"maram aly",
}
subtitles:["63b67e1b4b5f2b2adc6e9181",
"63b67e1c4b5f2b2adc6e918b",
"63b67e1c4b5f2b2adc6e9190"],
previewVideo:
"https://www.youtube.com/watch?v=BeyOPlepg18",
rating:5.0,
discount:{
  _id:"63be24b59deb28b978b718ef",
  value:0.5,
  startDate:2023-01-11T02:44:20.000+00:00,
  endDate:2023-01-25T02:44:20.000+00:00
}
ratingsAndReviews:[]
}
]`

#### Get Ratings and Reviews of a course

- Route: `/ratingsAndReviews`
- Request Type: `GET`
- Request Query: `{
  courseId:"63b67e1b4b5f2b2adc6e917e"
}`
- Response Body: `[
{
_id:"63c6bb50c4964df42a3364eb",
individualTrainee:{
_id:"63c486c5e9a9c6751066e5ac",
firstName:"Maram",
lastName:"Aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
gender:"Female",
wallet:0.0,
myCourses:[]
},
rating:5,
review:"perfect"
}
]`

#### Enroll a trainee in the course

- Route: `/enroll`
- Request Type: `GET`
- Request Query: `{
  courseId:"63b67e1b4b5f2b2adc6e917e"
  traineeId:"63c486c5e9a9c6751066e5ac",
  price:40,
  instructorId :"63b621b7aff2da44dc24e48f"
}`
- Response Body: `{
_id:"63c486c5e9a9c6751066e5ac",
firstName:"Maram",
lastName:"Aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
gender:"Female",
wallet:0.0,
myCourses:[
{
courseId:"63b67e1b4b5f2b2adc6e917e",
coursePrice:40,
watchedVideos:[],
finished:false,
solvedExercises:[],
takenNotes:[],
}
]
}`

#### Refund a course to trainee

- Route: `/refund`
- Request Type: `GET`
- Request Query: `{
  courseId:"63b67e1b4b5f2b2adc6e917e"
  traineeId:"63c486c5e9a9c6751066e5ac",
}`
- Response Body: `{
_id:"63c486c5e9a9c6751066e5ac",
firstName:"Maram",
lastName:"Aly",
email:"maramaly184@yahoo.com",
password:"$2a$12$b0ZmzOFWl6DGm5T3U8YmjuLVm./nKGM6FZ.J3ENWWfJ3coDkMYEyW",
gender:"Female",
wallet:40.0,
myCourses:[]
}`



### Trainee Router

#### Route : `/individualTrainee`
#### Route : `/corporateTrainee`

#### Get individual trainees

- Route: `/`
- Request type: `GET`
- Response body: `{[{"$oid": "63c6a5a7803c3179b661f74f","firstName": "mohamed", "lastName": "Aly", "email": "mohamed.aly@gmail.com", "password": "$2a$12$RK/Sl2SeFeHaHBS4mYKUxuc6kokHpkJs3YHprxZ7Dmieeu77LAHcy", "gender": "male", wallet: 0, myCourses:{} }, {"$oid": "63c6a4a7803c3179b661f74f","firstName": "yara", "lastName": "Aly", "email": "yara.aly@gmail.com", "password": "$2a$12$RK/Sl2SeFeHaHBS4mYKUxuc6kokHpkJs3YHprxZ7Dmieeu77LAHcy", "gender": "Female", wallet: 0, myCourses:{} }]}`

#### Get individual trainee

- Route: `/getIndividualTrainee`
- Request type: `GET`
- Request body: `{ "traineeId": "63b67e1b4b5f2b2adc6e917e" }`
- Response body:`{"$oid": "63c6a4a7803c3179b661f74f","firstName": "yara", "lastName": "Aly", "email": "yara.aly@gmail.com", "password": "$2a$12$RK/Sl2SeFeHaHBS4mYKUxuc6kokHpkJs3YHprxZ7Dmieeu77LAHcy", "gender": "Female", wallet: 0, myCourses:{} }`

#### Get trainee courses

- Route: `/getMyCourses`
- Request type: `GET`
- Request body: `{ "traineeId": "63b67e1b4b5f2b2adc6e917e" }`
- Response body: `{[{"$oid": "63b67e1b4b5f2b2adc6e917e","title":"Maram102", "subject": "philosophy", "price": 40, "n_enrolled": 7, "hours": 0, "summary": "this is a course", "instructor":{"name": "Maram Aly", "_id":"63b621b7aff2da44dc24e48f"},"subtitles": ["63b67e1b4b5f2b2adc6e9181"], "previewVideo": "https://www.youtube.com/watch?v=BeyOPlepg18", "ratingAndReviews:[] ]}`

#### Get exam grade

- Route: `/getGrade`
- Request type: `GET`
- Request body: `{ "traineeId": "63b5f99593b49933e172b789", "exerciseId": "63b67e004b5f2b2adc6e9173" }`
- Response body: `{ "grade": 100 }`

#### Add exercise

- Route: `/addExercise`
- Request type: `POST`
- Request body: `{ "traineeId": "63b5f99593b49933e172b789", "exerciseId": "63b67e004b5f2b2adc6e9173", "grade": 100 }`
- Response body: `{ "progress": 100 }`

#### Get progress

- Route: `/getProgress`
- Request type: `GET`
- Request query:`{ "courseId": "63b67e004b5f2b2adc6e9173" }`
- Request body: `{ "traineeId": "63b5f99593b49933e172b789" }`
- Response body: `{ "progress": 100 }`

#### Add video watched

- Route: `/addVideoWatched`
- Request type: `POST`
- Request body: `{ "traineeId": "63b5f99593b49933e172b789", "videoId": "63b67e004b5f2b2adc6e9173" }`
- Response body: `{ "progress": 100 }`

#### Push notes

- Route: `/pushNotes`
- Request type: `POST`
- Request body: `{ "traineeId": "63b5f99593b49933e172b789", "videoId": "63b67e004b5f2b2adc6e9173", "notes": ["note 1, note 2, note 3"] }`
- Response body: `{ "progress": 100 }`

#### Get notes

- Route: `/getNotes`
- Request type: `GET`
- Request query: `{ "videoId": "63b67e004b5f2b2adc6e9173" }`
- Request body: `{ "traineeId": "63b5f99593b49933e172b789" }`
- Response body: `{ "notes": "this is a note" }`


### individual trainee only Routes

#### Route : `/individualTrainee`

#### Pay for course

- Route: `/payForCourse`
- Request type: `POST`
- Request query: `{ "traineeId": "63b5f99593b49933e172b789", "courseId": "63b67e004b5f2b2adc6e9173", "instructorId": "63b621b7aff2da44dc24e48f" }`

- Response body: `{url: "http://localhost:3000/success/?traineeId=63b5f99593b49933e172b789&courseId=63b67e004b5f2b2adc6e9173&instructorId=63b621b7aff2da44dc24e48f&priceToPay=40"}`

#### Request refund

- Route: `/requestRefund`
- Request type: `POST`
- Request query: `{ "courseId": "63b67e004b5f2b2adc6e9173", "individualTraineeId": "63b5f99593b49933e172b789", "instructor": "63b621b7aff2da44dc24e48f" }`
- Response body: `{ "request": { _id: "63b5f99593b49933e172b789",  "individualTrainee": "63b5f99593b49933e172b789", "course": "63b67e004b5f2b2adc6e9173", "instructor": "63b621b7aff2da44dc24e48f", "status": "unseen" } }`

#### Add rating individual trainee

- Route: `/addRatingIndividualTrainee`
- Request type: `POST`
- Request body: `{ "review": "this is a review", "rating": 5, "traineeId": "63b5f99593b49933e172b789", "courseId": "63b67e004b5f2b2adc6e9173" }`
- Response body: `{"$oid": "63b67e1b4b5f2b2adc6e917e","title":"Maram102", "subject": "philosophy", "price": 40, "n_enrolled": 7, "hours": 0, "summary": "this is a course", "instructor":{"name": "Maram Aly", "_id":"63b621b7aff2da44dc24e48f"},"subtitles": ["63b67e1b4b5f2b2adc6e9181"], previewVideo: "https://www.youtube.com/watch?v=BeyOPlepg18", "ratingAndReviews:[] }`

### corporate trainee only Routes

#### Route : `/corporateTrainee`

#### request access

- Route: `/requestAccess`
- Request type: `POST`
- Request query: `{ "courseId": "63b67e004b5f2b2adc6e9173", "corporateTraineeId": "63b5f99593b49933e172b789" }`
- Response body: `{"$oid": "63b5f99593b49933e172b789","course": "63b67e004b5f2b2adc6e9173", "corporateTrainee": "63b5f99593b49933e172b789", "status": "pending", "_id": "63c0a1b9b0b2b0b5f8b5b5b5"}`

#### addRatingCorporateTrainee

- Route: `/addRatingCorporateTrainee`
- Request type: `POST`
- Request body: `{ "rating": 5, "review": "this is a review", "corporateTrainee": "63b5f99593b49933e172b789" }`
- Response body: `{"$oid": "63b67e1b4b5f2b2adc6e917e","title":"Maram102", "subject": "philosophy", "price": 40, "n_enrolled": 7, "hours": 0, "summary": "this is a course", "instructor":{"name": "Maram Aly", "_id":"63b621b7aff2da44dc24e48f"},"subtitles": ["63b67e1b4b5f2b2adc6e9181"], previewVideo: "https://www.youtube.com/watch?v=BeyOPlepg18", "ratingAndReviews:[{"rating": 5, "review": "this is a review", "corporateTrainee": "63b5f99593b49933e172b789", "_id": "63c0a1b9b0b2b0b5f8b5b5b5"}],"discount":{"value":0.3, "statDate":"2023-01-11T02:44:20.000+00:00","endDate":"2023-01-25T02:44:20.000+00:00", "_id":"63be24b59deb28b978b718ef"} }`

#### getCorporateTrainee

- Route: `/getCorporateTrainee`
- Request type: `GET`
- Response response: ` {"$oid": "63c6a4a7803c3179b661f74f","firstName": "yara", "lastName": "Aly", "email": "yara.aly@gmail.com", "password": "$2a$12$RK/Sl2SeFeHaHBS4mYKUxuc6kokHpkJs3YHprxZ7Dmieeu77LAHcy", "gender": "Female", myCourses:{} }`



### Instructor Router

#### Route : `/instructor`

#### Get instructor

- Route: `/getInstructor`
- Request type: `GET`
- Request query: `{ "id": "63b621b7aff2da44dc24e48f" }`
- Response body: `{ "firstName": "Maram", "lastName": "Aly", "email":"maramm.instructor@gmail.com", "password""$2a$12$Cln6iNYAk6w378cULzyDUOGfPberkK//1.leI/kNT1URpTuda1XCy", "courses": ["63b67e004b5f2b2adc6e9173", "63b67e004b5f2b2adc6e9174"], "firstLogin": true, "rating": 3, "wallet":1378, "ratingAndReviews": [], "biography": "test change bio " }`

#### Create course

- Route: `/createCourse`
- Request type: `POST`
- Request body: `{ "title": "Maram102", "subject": "philosophy", "price": 40, "summary": "this is a course", "subtitles": [{"title":"week 1", "videos": [{"title": "video 1", "url": "https://www.youtube.com/watch?v=BeyOPlepg18", "duration": 3}],"exercises":[{"title": "ex 1", "questions": [{"questionTitle": "what is this?", "options": ["a tree","a phone","a cat","a dog"], "correctAnswer: 2}], subtitle_id: "63b67e004b5f2b2adc6e916d" }]}], "previewVideo": "https://www.youtube.com/watch?v=BeyOPlepg18"}`
- Response body: `{"$oid": "63b67e1b4b5f2b2adc6e917e","title":"Maram102", "subject": "philosophy", "price": 40, "n_enrolled": 0, "hours": 0, "summary": "this is a course", "instructor":{"name": "Maram Aly", "_id":"63b621b7aff2da44dc24e48f"},"subtitles": ["63b67e1b4b5f2b2adc6e9181"], previewVideo: "https://www.youtube.com/watch?v=BeyOPlepg18"}`

#### define promotion

- Route: `/definePromotion`
- Request type: `PATCH`
- Request query: `{ "courseId": "63b67e004b5f2b2adc6e9173", "discount": 0.3, "startDate": "2023-01-11", "endDate": "2023-01-25" }`
- Response body: `{"$oid": "63b67e1b4b5f2b2adc6e917e","title":"Maram102", "subject": "philosophy", "price": 40, "n_enrolled": 7, "hours": 0, "summary": "this is a course", "instructor":{"name": "Maram Aly", "_id":"63b621b7aff2da44dc24e48f"},"subtitles": ["63b67e1b4b5f2b2adc6e9181"], previewVideo: "https://www.youtube.com/watch?v=BeyOPlepg18", "ratingAndReviews:[],"discount":{"value":0.3, "statDate":"2023-01-11T02:44:20.000+00:00","endDate":"2023-01-25T02:44:20.000+00:00", "_id":"63be24b59deb28b978b718ef"} }`

#### add rating

- Route: `/addRating`
- Request type: `POST`
- Request query: `{ "rating": 5, "review": "this is a review", "instructorId": "63b621b7aff2da44dc24e48f", "userId": "63b5f99593b49933e172b789" }`
- Response body: `{"$oid": "63b621b7aff2da44dc24e48f", "firstName": "Maram", "lastName": "Aly", "email": "maramm.instructor@gmail.com", "password": "$2a$12$Cln6iNYAk6w378cULzyDUOGfPberkK//1.leI/kNT1URpTuda1XCy", "courses": ["63b67e004b5f2b2adc6e9173", "63b67e004b5f2b2adc6e9174"], "firstLogin": true, "rating": 3, "wallet": 1378, "ratingAndReviews": [{"rating": 5, "review": "this is a review", "individualTrainee": "63b5f99593b49933e172b789", "_id": "63c038db756dcefd245044e4"}], "biography": "test change bio "}`

#### get instructor courses

- Route: `/getInstructorCoursesFiltered`
- Request type: `GET`
- Request query: `{ "price": [0,50], "subject": "philosophy", "search": "Maram102" }`
  -Response body: `{"$oid": "63b67e1b4b5f2b2adc6e917e","title":"Maram102", "subject": "philosophy", "price": 40, "n_enrolled": 7, "hours": 0, "summary": "this is a course", "instructor":{"name": "Maram Aly", "_id":"63b621b7aff2da44dc24e48f"},"subtitles": ["63b67e1b4b5f2b2adc6e9181"], previewVideo: "https://www.youtube.com/watch?v=BeyOPlepg18", "ratingAndReviews:[],"discount":{"value":0.3, "statDate":"2023-01-11T02:44:20.000+00:00","endDate":"2023-01-25T02:44:20.000+00:00", "_id":"63be24b59deb28b978b718ef"} }`

#### get ratings and reviews

- Route: `/getRatingsAndReviews`
- Request type: `GET`
- Request query: `{ "instructorId": "63b621b7aff2da44dc24e48f" }`
- Response body: `[{"rating": 5, "review": "this is a review", "individualTrainee": "63b5f99593b49933e172b789", "_id": "63c038db756dcefd245044e4"}]`

#### get instructor no id

- Route: `/getInstructorNoID`
- Request type: `GET`
- Response body: `{ "firstName": "Maram", "lastName": "Aly", "email":"maramm.instructor@gmail.com", "password""$2a$12$Cln6iNYAk6w378cULzyDUOGfPberkK//1.leI/kNT1URpTuda1XCy", "courses": ["63b67e004b5f2b2adc6e9173", "63b67e004b5f2b2adc6e9174"], "firstLogin": true, "rating": 3, "wallet":1378, "ratingAndReviews": [], "biography": "test change bio " }`

#### edit instructor profile

- Route: `/editInstructorProfile`
- Request type: `PATCH`
- Request body: `{ "email": "example@gmail.com", "biography": "this is my new bio", userId: "63b621b7aff2da44dc24e48f" }`
- Response body: `{ "firstName": "Maram", "lastName": "Aly", "email":"example@gmail.com", "password""$2a$12$Cln6iNYAk6w378cULzyDUOGfPberkK//1.leI/kNT1URpTuda1XCy", "courses": ["63b67e004b5f2b2adc6e9173", "63b67e004b5f2b2adc6e9174"], "firstLogin": true, "rating": 3, "wallet":1378, "ratingAndReviews": [], "biography": "this is my new bio" }`
