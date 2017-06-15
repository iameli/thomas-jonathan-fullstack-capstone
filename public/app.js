'use strict';

const appState = {
  raidTeams: [],
  activePage: '',
  myTeam: {}
};

// IN WHICH WE MAKE AJAX REQUESTS
function fetchTeams() {
  return $.ajax({
    method: 'GET',
    url: '/raid',
  });
}

function updateTeam(teamId, body) {
  return $.ajax({
    contentType: 'application/json',
    method: 'PUT',
    url: `/raid/${teamId}`,
    data: JSON.stringify(body),
    dataType: 'json'
  });
}
// IN WHICH WE PERFORM FUNCTIONS RELATED TO AJAX REQUESTS

// splice out an applicant from array of applicants
function spliceApplicant(state, applicantId) {
  const myApplicants = state.myTeam.applicants;
  let indexToSplice;
  myApplicants.forEach(applicant => {
    if (applicantId === applicant._id) {
      indexToSplice = myApplicants.indexOf(applicant);
    }
  });
  myApplicants.splice(indexToSplice, 1);
  return myApplicants;
}

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
// IN WHICH WE RENDER
function render(state) {

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
      `<div class="team-post col-8">
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
            <li><a class="button" href="#" aria-label="Apply to join a raid team">Apply</a></li>
          </ul>
        </div>
      </div>`;
    });
    $('.content-root').html(teamPosts);
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
      applicantsPosts += `<div class="row">
                        <div class="team-member" data-id=${applicant._id}>
                          <div class="col-3 column-left">
                            <img class="team-member-thumb" src="http://placehold.it/200/200" alt="Team member image">
                          </div>
                          <div class="col-9 column-right">
                            <h5>${applicant.playerName.firstName} ${applicant.playerName.lastName}</h5>
                            <h6>Classes: <small>!!!!!!!</small></h6>
                            <p>Tilde drinking vinegar pok pok, swag raw denim pork belly crucifix raclette air plant authentic kinfolk wolf helvetica synth thundercats. Neutra copper mug 8-bit gochujang. Af venmo vexillologist fashion axe, narwhal schlitz artisan portland.</p>
                            <ul class="team-member-controls nav-list">
                              <li><a class="button-good js-team-accept" href="#">Accept</a></li>
                              <li><a class="button-bad js-team-reject" href="#">Reject</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>`;
    });
    $('.team-members-content').html(applicantsPosts);
  }


  if (state.activePage === 'home') {
    renderHomePage();
  } else if (state.activePage === 'account-members') {
    renderAccountPage();
    addMembersToAccountPage();
  } else if (state.activePage === 'account-applicants') {
    renderAccountPage();
    addApplicantsToAccountPage();
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
  $('.content-root .js-team-accept').on('click', e => {
    e.preventDefault();
    console.log('Accept works!');
  });
  $('.content-root .js-team-reject').on('click', e => {
    e.preventDefault();
    const dataId = e.currentTarget.closest('[data-id]').dataset.id;
    const myTeamId = appState.myTeam.id;
    const requestBody = {
      applicants: spliceApplicant(appState, dataId)
    };
    return updateTeam(myTeamId,requestBody).then(res => {
      setMyTeam(appState, res);
      render(appState);
      eventHandlers();
    });
  });
}
// IN WHICH WE LOAD
function initialLoad() {
  return fetchTeams().then((res) => {
    updateState(appState, res);
    setActivePage(appState,'home');
    //stubbed for test data
    setMyTeam(appState, appState.raidTeams[1]);
    render(appState);
  });
}
$(function() {
  initialLoad();
  eventHandlers();
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
