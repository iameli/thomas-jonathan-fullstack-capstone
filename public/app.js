'use strict';

const appState = {
  raidTeams: []
};

// IN WHICH WE MAKE AJAX REQUESTS
function fetchTeams() {
  return $.ajax({
    method: 'GET',
    url: '/raid',
  });
}
// IN WHICH WE MODIFY THE STATE
function loadData(data) {
  appState.raidTeams = data;
}

function updateState(data, state) {
  state.raidTeams = data;
}
// IN WHICH WE RENDER
function render(state) {
  let teamPosts = '';
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
// IN WHICH WE HANDLE THE EVENTS

// IN WHICH WE LOAD
function initialLoad() {
  return fetchTeams().then((res) => {
    updateState(res, appState);
    render(appState);
  });
}
$(function() {
  // fetchTeams(loadData);
  // render(appState);

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
