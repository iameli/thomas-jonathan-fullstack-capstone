# Raid.io

Find the demo app at https://thomas-jonathan-capstone.herokuapp.com/

## the Application

Raid.io is a handy way to find, apply, create, and manage your FFXIV raid team.

Current teams are listed on the homepage:

Signup for an account and add your player info:

Then apply to whatever team you like:

As a user you can view your profile:

And you can also manage your team:

Accepting members or rejecting them:

## the API
Our RESTful API has various endpoints that allow for the creation of a user(sign up), the querying of user and raid team data, and updating team
data.

### Get User Data:
Send an ajax request with a get method to **/user** to receive data on all users or to **/user/(specific user id)** to retrieve data on a particular
user. User data will be returned as a json object with data 
**{id, username, discord, playerName{firstName, lastName},playerClass[{className, level}]}, team(if they're on one)**.

id: User's unique database id
username: User's username
email: User's email
discord: User's discord username
playerName: First and last name of the User's in game character name
playerClass: The classes the User's character has leveled.

### Get Raid Data:
Similar to getting user data, but using **/raid** and **/raid/(specific raid id)**. Data returned will be in the format of
**{id, name, leader, time, applicants[], members{tanks[], healers[], dps[]}}.

id: The raids database id
name: The name of the raid
leader: The user who is the leader/manager of the raid
applicants: People who are currently applying to the raid
members: People who are currently a part of the team, separated into role

### Creating a User:
Create an ajax request using a post method with data for username, password, discord screenname, email, player name, and player class
to the endpoint **/user** to create new user data in the database. The data for the created user will return as a json object.

### Managing a Raid:
Currently, the api allows for some light team management through three endpoints.

To add a user to a raid field, create an ajax request with a postmethod to **/raid/(raid id)/(field)/(user id)**.

To delete a user from a raid field, create an ajax request with a delete method to **/raid/(raid id)/(field)/(user id)**.

To add a user specifically to the applicants field, create an ajax request with a put method to **/raid/(raid id)/(user id)**.



## the Stack

* **The Front End**
  * Handcrafted HTML with artisanal CSS including a custom grid.
  * Modeled in React-flavored-jQuery with componentized rendering elements and unidirectional data flow.
* **The Back End**
  * Standard ME_N stack setup with a Mongo instance hosted on mLab, an Odyssian Express router journey littered with the corpses of abandoned endpoints, and all built in Node.
