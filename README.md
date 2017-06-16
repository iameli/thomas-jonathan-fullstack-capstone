# Raid.io

Find the demo app at https://thomas-jonathan-capstone.herokuapp.com/

## the Application

Raid.io is a handy way to find, apply, create, and manage your FFXIV raid team.

Current teams are listed on the homepage:
[Home page scroll screengrab](demo/HomePageScroll.gif)
Signup for an account and add your player info:
[Sign up for an account screengrab](demo/HomePageScroll.gif)
Then apply to whatever team you like:
[Apply to a team screengrab](demo/Apply.gif)
As a user you can view your profile:
[View my profile screengrab](demo/MyAccount.gif)
And you can also manage your team:
[View my team](demo/MyTeam.gif)
Accepting members or rejecting them:
[Reject or accept applicants](demo/RejectAccept.gif)

## the API

## the Stack

* **The Front End**
  * Handcrafted HTML with artisanal CSS including a custom grid.
  * Modeled in React-flavored-jQuery with componentized rendering elements and unidirectional data flow.
  * Not currently as responsive as it should be...sorry 😢
* **The Back End**
  * Standard M E _ N stack setup.
  * Mongo instance hosted on mLab with Mongoose for object modeling.
    * Also used Faker extensively for creating test data.
  * An Odyssian Express router journey littered with the corpses of abandoned endpoints.
  * Mocha and Chai for testing.
  * Authentication soon to be deployed with Passport.
  * All built in Node and hosted in Heroku with Travis for CI.
* **Dev Process**
  * Pretty simple tooling:
    * Atom & Postman for most everything.
