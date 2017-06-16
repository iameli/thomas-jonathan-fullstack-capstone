'use strict';

const appState = {
  raidTeams: [],
  activePage: '',
  myTeam: {},
  myUserId: ''
};

// IN WHICH WE MAKE AJAX REQUESTS

// /raid endpoints
function fetchTeams() {
  return $.ajax({
    method: 'GET',
    url: '/raid',
  });
}
function fetchTeam(teamId) {
  return $.ajax({
    method: 'GET',
    url: `/raid/${teamId}`
  });
}
function applyToTeam(teamId, applicantId) {
  return $.ajax({
    method: 'PUT',
    url: `/raid/${teamId}/${applicantId}`
  });
}
function acceptApplicant(teamId, applicantId, className) {
  return $.ajax({
    method: 'POST',
    url: `/raid/${teamId}/jobs.${className}s/${applicantId}`
  });
}
function removeApplicant(teamId, applicantId) {
  return $.ajax({
    method: 'DELETE',
    url: `/raid/${teamId}/applicants/${applicantId}`
  });
}

// /user endpoints
function createUser(reqObj) {
  return $.ajax({
    method: 'POST',
    url: '/user',
    contentType: 'application/json',
    data: JSON.stringify(reqObj),
    dataType: 'json'
  });
}
// function updateTeam(teamId, body) {
//   return $.ajax({
//     contentType: 'application/json',
//     method: 'PUT',
//     url: `/raid/${teamId}`,
//     data: JSON.stringify(body),
//     dataType: 'json'
//   });
// }

// IN WHICH WE PERFORM FUNCTIONS RELATED TO AJAX REQUESTS

// splice out an applicant from array of applicants
// function spliceApplicant(state, applicantId) {
//   const myApplicants = state.myTeam.applicants;
//   let indexToSplice;
//   myApplicants.forEach(applicant => {
//     if (applicantId === applicant._id) {
//       indexToSplice = myApplicants.indexOf(applicant);
//     }
//   });
//   myApplicants.splice(indexToSplice, 1);
//   return myApplicants;
// }
// IN WHICH WE MODIFY THE STATE
function updateState(state, data) {
  state.raidTeams = data;
}
function setActivePage(state, pageName) {
  state.activePage = pageName;
}
function setMyTeam(state, myNewTeam) {
  state.myTeam = myNewTeam;
}
function setMyId(state, myId) {
  state.myUserId = myId;
}
// IN WHICH WE RENDER
function render(state) {
  function renderHeader() {
    const logoutLink = '<a id="logout-link" href="#">Logout</a>';
    const loginLink = '<a id="login-link" href="#">Login</a>';
    const accountLink = '<a id="account-link" href="#">Account</a>';
    const signupLink = '<a id="signup-link" href="#">Signup</a>';
    const header = `<div class="head">
                      <a id="home-link" href="#"><h2>Raid.io</h2></a>
                    </div>

                    <div class="account-controls col-3">
                      <ul>
                        <!-- <li><a href="#">Login</a></li>
                        <li><a href="#">Signup</a></li> -->
                        <li>${(state.myUserId === '') ? loginLink : logoutLink}</li>
                        <li>${(state.myUserId === '') ? signupLink : accountLink}</li>
                      </ul>
                    </div>`;

    $('.header-root').html(header);
  }

  function renderHomePage() {
    const filterBox = `<div class="row">
                        <div class="col-3 filter-box">
                          <div class="sticky-top">
                            <h4>Filters</h4>
                            <ul>
                              <li>This is a filter</li>
                              <li>This is a filter</li>
                              <li>This is a filter</li>
                            </ul>
                          </div>
                        </div>
                      </div>`;
    let teamPosts = `${filterBox}`;
    state.raidTeams.forEach(team => {
      teamPosts +=
      `<div class="team-post col-8" data-id=${team.id}>
        <h3>${team.name}
          <small>${team.time}</small>
        </h3>
        <img class="team-thumb" src="http://placehold.it/850x350" alt="Raid team thumbnail image"/>
        <p>Etsy aesthetic williamsburg, cray skateboard activated charcoal vaporware meggings mumblecore gluten-free messenger bag. Cloud bread art party gastropub, coloring book tumeric godard letterpress flexitarian echo park polaroid tumblr. Four loko banjo wayfarers tumeric subway tile skateboard, four dollar toast meh messenger bag pour-over occupy marfa. Wayfarers gentrify hell of, asymmetrical post-ironic celiac poke master cleanse fixie distillery affogato hot chicken disrupt. Health goth YOLO seitan wayfarers. Ramps ugh fam, beard iPhone YOLO kitsch scenester jean shorts swag echo park kale chips locavore pour-over. Shaman activated charcoal af banjo pabst tofu.</p>
        <div class="post-callout">
          <ul class="col-3 callout-left">
            <li>Raid Leader: ${team.leader.username}</li>
            <li>Open Roles: ....stuff</li>
          </ul>
          <ul class="callout-right col-3">
            <li><a class="button js-team-apply" href="#" aria-label="Apply to join a raid team">Apply</a></li>
          </ul>
        </div>
      </div>`;
    });
    $('.content-root').html(teamPosts);
  }

  function renderSignupPage() {
    const signupPage = `  <div class="row">
                            <div class="col-12">
                              <div class="container form-container">
                                <form class="signup-form js-signup-form" action="/user" method="post">
                                  <fieldset>
                                    <label for="username">Username:</label><br>
                                    <input type="text" name="username"><br>
                                    <label for="password">Password:</label><br>
                                    <input type="password" name="password"><br>
                                    <!-- <input type="password" name="confirm-password" value="confirm password"> -->
                                    <label for="email">Email:</label><br>
                                    <input type="email" name="email"><br>
                                    <label for="discord">Discord Screenname:</label><br>
                                    <input type="text" name="discord"><br>
                                    <label for="player-first-name">Player First Name</label><br>
                                    <input type="text" name="player-first-name"><br>
                                    <label for="player-last-name">Player Last Name</label><br>
                                    <input type="text" name="player-last-name"><br>
                                    <label for="select-player-class">Select Player Class:</label><br>
                                    <select name="select-player-class">
                                      <option value="paladin">Paladin</option>
                                      <option value="warrior">Warrior</option>
                                      <option value="darkKnight">Dark Night</option>
                                      <option value="whiteMage">White Mage</option>
                                      <option value="scholar">Scholar</option>
                                      <option value="astrologian">Astrologian</option>
                                      <option value="ninja">Ninja</option>
                                      <option value="dragoon">Dragoon</option>
                                      <option value="samurai">Samurai</option>
                                      <option value="monk">Monk</option>
                                      <option value="redMage">Red Mage</option>
                                      <option value="summoner">Summoner</option>
                                      <option value="blackMage">Black Mage</option>
                                      <option value="bard">Bard</option>
                                      <option value="machinist">Machinist</option>
                                    </select><br>
                                    <button type="submit" name="button">Submit</button>
                                  </fieldset>
                                </form>
                              </div>
                            </div>
                          </div>`;
    $('.content-root').html(signupPage);
  }

  function renderAccountPage() {
    // HTML components
    const navBar = `<div class="row nav-bar">
                      <nav aria-label="Navigation bar" role="navigation">
                        <ul class="nav-list">
                          <li><a class="nav-tab" href="#" aria-label="Go to my profile">My Profile</a></li>
                          <li><a class="nav-tab" href="#" aria-label="Go to my team">My Team</a></li>
                        </ul>
                      </nav>
                    </div>
                    <br>`;
    const myTeam = `<div class="row">
                          <div class="col-6 column-left">
                            <img class="team-thumb" src="http://placehold.it/650x350" alt="Raid team thumbnail image" />
                          </div>
                          <div class="col-6 column-right">
                            <h3>${state.myTeam.name} <small>${state.myTeam.time}</small></h3>
                            <p>Meggings microdosing XOXO sartorial butcher hot chicken post-ironic, drinking vinegar asymmetrical lomo hashtag hexagon. Drinking vinegar hexagon coloring book franzen. Et photo booth lumbersexual, irony chartreuse beard tumblr magna cliche post-ironic. Occupy locavore forage, scenester eu mumblecore kale chips. Esse you probably haven't heard of them id +1 try-hard next level. Jianbing edison bulb readymade, dreamcatcher kale chips adipisicing chartreuse typewriter godard lyft dolor williamsburg bespoke anim. Austin aute vice ennui, plaid dolore mlkshk man braid in.
                            </p>
                          </div>
                        </div>`;
    const contentDivider = `<hr>
                            <div class="col-12">
                              <ul class="nav-list">
                                <li><a id="team-members-link" class="team-member-toggle" href="#">Team Members</a></li>
                                <li><a id="team-applicants-link" class="team-member-toggle" href="#">Applicants</a></li>
                              </ul>
                              <br>
                            </div>
                            <div class="team-members-content">
                            </div>`;

    const renderString = navBar + myTeam + contentDivider;
    $('.content-root').html(renderString);
  }
  function addMembersToAccountPage() {
    const members = state.myTeam.members;
    let memberPosts = '';
    members.dps.forEach(member => {
      memberPosts += `<div class="row">
                        <div class="team-member">
                          <div class="col-3 column-left">
                            <img class="team-member-thumb" src="http://placehold.it/200/200" alt="Team member image">
                          </div>
                          <div class="col-9 column-right">
                            <h5>${member.playerName.firstName} ${member.playerName.lastName}</h5>
                            <h6>DPS: <small>${member.class}</small></h6>
                            <p>Tilde drinking vinegar pok pok, swag raw denim pork belly crucifix raclette air plant authentic kinfolk wolf helvetica synth thundercats. Neutra copper mug 8-bit gochujang. Af venmo vexillologist fashion axe, narwhal schlitz artisan portland.</p>
                          </div>
                        </div>
                      </div>`;
    });
    members.healers.forEach(member => {
      memberPosts += `<div class="row">
                        <div class="team-member">
                          <div class="col-3 column-left">
                            <img class="team-member-thumb" src="http://placehold.it/200/200" alt="Team member image">
                          </div>
                          <div class="col-9 column-right">
                            <h5>${member.playerName.firstName} ${member.playerName.lastName}</h5>
                            <h6>Healer: <small>${member.class}</small></h6>
                            <p>Tilde drinking vinegar pok pok, swag raw denim pork belly crucifix raclette air plant authentic kinfolk wolf helvetica synth thundercats. Neutra copper mug 8-bit gochujang. Af venmo vexillologist fashion axe, narwhal schlitz artisan portland.</p>
                          </div>
                        </div>
                      </div>`;
    });
    members.tanks.forEach(member => {
      memberPosts += `<div class="row">
                        <div class="team-member">
                          <div class="col-3 column-left">
                            <img class="team-member-thumb" src="http://placehold.it/200/200" alt="Team member image">
                          </div>
                          <div class="col-9 column-right">
                            <h5>${member.playerName.firstName} ${member.playerName.lastName}</h5>
                            <h6>Tank: <small>${member.class}</small></h6>
                            <p>Tilde drinking vinegar pok pok, swag raw denim pork belly crucifix raclette air plant authentic kinfolk wolf helvetica synth thundercats. Neutra copper mug 8-bit gochujang. Af venmo vexillologist fashion axe, narwhal schlitz artisan portland.</p>
                          </div>
                        </div>
                      </div>`;
    });

    $('.team-members-content').html(memberPosts);
  }
  function addApplicantsToAccountPage() {
    const applicants = state.myTeam.applicants;
    let applicantsPosts = '';
    applicants.forEach(applicant => {
      let classesToDisplay = '';
      let classesForAccept = [];
      let stringOfClassOptions = '';
      applicant.playerClass.forEach(_class => {
        classesToDisplay += `${_class.className}: ${_class.level}, `;
        stringOfClassOptions += `<option value="${_class.className}">${_class.className} @lvl${_class.level}</option><br>`;
        classesForAccept.push(`${_class.className} @lvl${_class.level}`);
      });
      applicantsPosts += `<div class="row">
                        <div class="team-member" data-id=${applicant._id}>
                          <div class="col-3 column-left">
                            <img class="team-member-thumb" src="http://placehold.it/200/200" alt="Team member image">
                          </div>
                          <div class="col-9 column-right">
                            <h5>${applicant.playerName.firstName} ${applicant.playerName.lastName}</h5>
                            <h6>Classes: <small>${classesToDisplay}</small></h6>
                            <p>Tilde drinking vinegar pok pok, swag raw denim pork belly crucifix raclette air plant authentic kinfolk wolf helvetica synth thundercats. Neutra copper mug 8-bit gochujang. Af venmo vexillologist fashion axe, narwhal schlitz artisan portland.</p>
                            <ul class="team-member-controls nav-list">
                              <li><a class="button-good js-team-accept" href="#">Accept</a></li>
                              <li><a class="button-bad js-team-reject" href="#">Reject</a></li>
                            </ul>
                          </div>
                          <div class="col-12">
                            <form class="role-select-form" hidden>
                              <fieldset>
                                <select name="select-class" required="true">
                                  ${stringOfClassOptions}
                                </select>
                                <input id="tank-btn-${applicant._id}" type="radio" name="team-role" value="Tank" required />
                                <label for="tank-btn">Tank</label> |
                                <input id="healer-btn-${applicant._id}" type="radio" name="team-role" value="Healer" />
                                <label for="healer-btn">Healer</label> |
                                <input id="dps-btn-${applicant._id}" type="radio" name="team-role" value="DPS" />
                                <label for="dps-btn">DPS</label> |
                                <input type="submit" value="Submit">
                                <button class="cancel-btn"type="button" name="cancel-btn">Cancel</button>
                              </fieldset>
                            </form>
                          </div>
                        </div>
                      </div>`;
    });
    $('.team-members-content').html(applicantsPosts);
  }


  if (state.activePage === 'home') {
    renderHeader();
    renderHomePage();
  } else if (state.activePage === 'account-members') {
    renderHeader();
    renderAccountPage();
    addMembersToAccountPage();
  } else if (state.activePage === 'account-applicants') {
    renderHeader();
    renderAccountPage();
    addApplicantsToAccountPage();
  } else if (state.activePage === 'signup') {
    renderHeader();
    renderSignupPage();
  }
}

// IN WHICH WE HANDLE THE EVENTS
function eventHandlers() {
  $('#account-link').on('click', e => {
    e.preventDefault();
    setActivePage(appState, 'account-members');
    render(appState);
    eventHandlers();
  });
  $('#signup-link').on('click', e => {
    e.preventDefault;
    // hack to cause a render change in the header account controls
    setMyId(appState, 'pending');
    setActivePage(appState, 'signup');
    render(appState);
    eventHandlers();
  });
  $('#home-link').on('click', e => {
    e.preventDefault();
    return fetchTeams().then(res => {
      updateState(appState, res);
      setActivePage(appState,'home');
      render(appState);
      eventHandlers();
    });
  });
  $('#team-members-link').on('click', e => {
    e.preventDefault();
    setActivePage(appState,'account-members');
    render(appState);
    eventHandlers();
  });
  $('#team-applicants-link').on('click', e => {
    e.preventDefault();
    setActivePage(appState,'account-applicants');
    render(appState);
    eventHandlers();
  });
  $('.content-root .js-team-apply').on('click', e => {
    e.preventDefault;
    const newTeamId = e.currentTarget.closest('[data-id]').dataset.id;
    const myId = appState.myUserId;
    return applyToTeam(newTeamId, myId).then(res => {
      // stubbed for DEMO-->user will show in applicants of MyTeam
      setMyTeam(appState,res);
      // Fetch teams to make AppState current
      fetchTeams().then(res => {
        updateState(appState, res);
        render(appState);
        eventHandlers();
        alert('Application Submitted: Good luck!');
      });
    });
  });
  $('.content-root .js-signup-form').on('submit', e => {
    e.preventDefault();
    const formData = $(e.currentTarget).serializeArray();
    const reqBody = {
      username: formData[0].value,
      password: formData[1].value,
      email: formData[2].value,
      discord: formData[3].value,
      playerName: {
        firstName: formData[4].value,
        lastName: formData[5].value
      },
      //hardcoding for DEMO
      playerClass: {
        className: formData[6].value,
        level: 60
      }
    };
    return createUser(reqBody).then(res => {
      setMyId(appState, res.id);
      setActivePage(appState, 'home');
      render(appState);
      eventHandlers();
    });
  });
  $('.content-root .js-team-accept').on('click', e => {
    e.preventDefault();
    $(e.currentTarget).closest('div').next().find('form').show();
  });
  $('.content-root .js-team-reject').on('click', e => {
    e.preventDefault();
    const myApplicantId = e.currentTarget.closest('[data-id]').dataset.id;
    const myTeamId = appState.myTeam.id;
    // Below can be used for PUT endpoint

    // const requestBody = {
    //   applicants: spliceApplicant(appState, applicantId)
    // };
    // return updateTeam(myTeamId,requestBody).then(res => {
    //   setMyTeam(appState, res);
    //   render(appState);
    //   eventHandlers();
    // });

    return removeApplicant(myTeamId, myApplicantId).then(res => {
      setMyTeam(appState, res);
      render(appState);
      eventHandlers();
    });
  });
  $('.content-root .role-select-form').on('submit', e => {
    e.preventDefault();
    const criteria = $(e.currentTarget).serializeArray();
    const newClassName = criteria[0].value;
    const applicantId = e.currentTarget.closest('[data-id]').dataset.id;
    const myTeamId = appState.myTeam.id;
    // const requestBody = {
    //   // applicants: spliceApplicant(appState, applicantId),
    //   [newClassName]: ''
    // };
    return acceptApplicant(myTeamId, applicantId, newClassName).then(res => {
      return removeApplicant(myTeamId, applicantId).then(res => {
        setMyTeam(appState, res);
        render(appState);
        eventHandlers();
      });
    });

  });
  $('.content-root .cancel-btn').on('click', e => {
    $(e.currentTarget).closest('form').hide();
  });
}
// IN WHICH WE LOAD
function initialLoad() {
  return fetchTeams().then(res => {
    updateState(appState, res);
    setActivePage(appState,'home');
    //stubbed for test data
    setMyTeam(appState, appState.raidTeams[0]);
    render(appState);
    eventHandlers();
  });
}
$(function() {
  initialLoad();
});



// Testing out some variations
// const initialLoad = new Promise((resolve, reject) => {
//   return fetchTeams(function(data){
//     //dostuff
//     appState.raidTeams = data;
//     resolve(appState)
//   })
// })
//
// return Promise.resolve(fetchTeams(loadData)).then(() => render(appState));
