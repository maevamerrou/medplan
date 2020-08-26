# MedPlan
Ironhack Project 3

# Description
Web app available for doctors and individuals (patients).
It enables individuals to book doctor appointments online.
Then the patient can view his appointments (and delete the incoming ones) but also, once the appointment has occured, he will have access to the visit report and the prescriptions.
The prescriptions will also be available in a Medication Planner where all the medications, time and quantities will be viewable in a schedule.

On his side, the doctor can receive bookings, upload the visit report, and add the medications.
This app offers more visiliby to his business and make it easier for the individuals to view the doctors availabilities and book appointments 24/7.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform 
-  **Login:** As a user I can login to the platform
-  **Logout:** As a user I can logout from the platform so no one else can modify my information

* Patient interface
-  **Appointment booking** As a patient I can book doctor appointments
-  **Appointment cancellation** As a patient I can cancel doctor appointments
-  **Medecines planer** As a patient I can access my medecines planner
-  **Profile editing** As a patient I can modify my health and personnal details
-  **Appointment report** As a patient I can download the report of each appointment (uploaded by the doctor)

* Health profesionnal interface
-  **Appointment booking** As a doctor I can check my schedule of patients appointments
-  **Appointment cancellation** As a doctor I can cancel patients appointments
-  **Medecines planer** As a doctor I can add prescriptions to my patients
-  **Profile editing** As a doctor I can modify my profesionnal public page details
-  **Appointment report** As a doctor I uploaded check the report for each appointment
-  **Opening times/schedule** As a doctor I can change my opening times to update my appointment calendar



## Backlog

- Friends list
- Recommendations from friends
- Books media
- Comics media

<br>


# Client / Frontend

## React Router Routes (React App)
|Path|Components|Permissions|Behavior|
| ----------- | ----------- | ----------- | ----------- |
| /| Header,  Navbar (if logged in), Home search bar, Search card| public| 
| /signup| Header, Signup form| public| Signup form, link to login, redirect to login page |
| /login| Header,  Login form| public| Login form, link to sign up, redirect to home page  |
| /logout| n/a| patient, doctor  | Navigate to homepage after logout, expire session|
| /doctor/:doctorId| Navbar, Doctor public profile (Calendar)| patient, doctor  | Show doctor details and calendar to book|
| /patient| Navbar, Patient profile| patient| Show patient details and edit buttons|
| /patient/appointments| Navbar, Appointments (Appointment search bar, Appointment card) | patient |Patient can check his appointments, reports, and cancel/edit appointments |
| /patient/medication-planner| Navbar, Medication schedule (Medication card) | patient |Patient can check his medications and add a check button to follow up|
| /doctor/calendar| Navbar, Doctor calendar (Calendar)| doctor | Doctor can check his appointments calendar and click on details |
| /doctor/calendar/:appointmentId | Navbar, Appointment details | doctor | Doctor can check the details of an appointment, add report and prescription, he can also cancel the appointment |
| /doctor/calendar/:appointmentId/prescription | Navbar, Prescription form, Prescription card, Add medication form | doctor |Doctor can add the prescription (each item = a medication) |
| /doctor/private| Navbar, Doctor edit profile| doctor |Doctor can edit his profile and calendar |



## Components

- Header

- Navbar

- Login form

- Signup form

- Home search bar

- Search card

- Doctor public profile

- Patient profile

- Appointments

- Appointment search bar

- Appointment card

- Medication schedule

- Medication card

- Doctor calendar

- Appointment details

- Delete appointment pop-up (backlog)

- Prescription form

- Prescription card
 
- Add medication form

- Doctor edit profile

- Calendar

- Footer (computer view)



<!-- ## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Backlog Service
  - backlog.filter(type, status) // for different types of media and if they are done or not
  - backlog.detail(id)
  - backlog.add(id)
  - backlog.delete(id)
  - backlog.update(id)
  
- External API
  - API for games
  - API for series
  - API for films -->


<br>


# Server / Backend


## Models

### Patient
- name: {string, required}
- email: {string, required, unique}
- passwordHash: {string, required}
- address: string
- alergies: [string]
- history: [string]

### Doctor
- name: {string, required}
- email: {string, required, unique}
- passwordHash: {string, required}
- address: string
- speciality: {string, enum}
- businessHours: {daysofWeek:[number, enum], startTime: string, endTime: string}
- phone: string
- picture: string

### Appointment
- doctor: {string, ref:doctor}
- patient: {string, ref:patient}
- time: date
- reason: string
- prescription: {string, ref:prescription}

### Prescription

- [medicine: {name: string, dosePerTake: number, frequency: {perDay: number, days: number}, startDate: date, endDate: date, comments: string]
- timestamp

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| POST        | `/search/add`                 | {platform, title, type, id}  |                | 400          | Add new backlog element and add to user                                               |
| GET         | `/backlog/series`             |                              |                | 400          | Show series elements                                           |
| GET         | `/backlog/films`              |                              |                |              | Show film elements                                           |
| GET         | `/backlog/games`              |                              |                |              | Show games elements                                          |
| GET         | `/media/:id`                        |                              | 201            | 400          | Show specific element                                        |
| PUT         | `/media/:id`                 |                              | 200            | 400          | edit element                                                 |
| DELETE      | `/media/:id`                 |                              | 201            | 400          | delete element                                               |
| GET         | `/done/series`                |                              |                | 400          | Show series elements                                         |
| GET         | `/done/films`                 |                              |                |              | Show film elements                                           |
| GET         | `/done/games`                 |                              |                |              | Show games elements                                          |



<br>



## Links

### Trello

[Link to your trello board](https://trello.com/b/iloDccrZ/backlog-quest) 

### Git

[Client repository Link](https://github.com/jorgeberrizbeitia/backlog-quest)

[Server repository Link](https://github.com/jorgeberrizbeitia/backlog-quest-server)

[Deployed App Link](https://backlog-quest.herokuapp.com/login)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1zndKZ8DC-_i391alptPKsAKanCSXTrLVL39L3xtEjz8/edit?usp=sharing)