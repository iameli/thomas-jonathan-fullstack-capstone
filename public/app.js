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
// IN WHICH WE MODIFY THE STATE
function updateState(state, data) {
  state.raidTeams = data;
}
function setActivePage(state, pageName) {
  state.activePage = pageName;
}
function setMyTeam(state, myId) {
  //stubbed for test data
  state.myTeam = state.raidTeams[0];
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
    const members = state.myTeam.members;
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
                            <h3>Team Name!!</h3>
                            <p>Meggings microdosing XOXO sartorial butcher hot chicken post-ironic, drinking vinegar asymmetrical lomo hashtag hexagon. Drinking vinegar hexagon coloring book franzen. Et photo booth lumbersexual, irony chartreuse beard tumblr magna cliche post-ironic. Occupy locavore forage, scenester eu mumblecore kale chips. Esse you probably haven't heard of them id +1 try-hard next level. Jianbing edison bulb readymade, dreamcatcher kale chips adipisicing chartreuse typewriter godard lyft dolor williamsburg bespoke anim. Austin aute vice ennui, plaid dolore mlkshk man braid in.
                            </p>
                          </div>
                        </div>`;
    const contentDivider = `<hr>
                            <div class="col-12">
                              <h4>Team Members</h4>
                            </div>`;
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
    const renderString = navBar + myTeam + contentDivider + memberPosts;
    $('.content-root').html(renderString);
  }

  if (state.activePage === 'home') {
    return renderHomePage();
  } else if (state.activePage === 'account') {
    return renderAccountPage();
  }
}
// IN WHICH WE HANDLE THE EVENTS
function eventHandlers() {
  $('#account-link').on('click', e => {
    e.preventDefault();
    setActivePage(appState, 'account');
    render(appState);
  });
  $('#home-link').on('click', e => {
    e.preventDefault();
    setActivePage(appState,'home');
    render(appState);
  });
}
// IN WHICH WE LOAD
function initialLoad() {
  return fetchTeams().then((res) => {
    updateState(appState, res);
    setActivePage(appState,'home');
    //stubbed for test data
    setMyTeam(appState, '');
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
