'use strict';

const appState = {
  raidTeams: []
};

// IN WHICH WE MAKE AJAX REQUESTS
function fetchTeams(callback) {
  $.ajax({
    method: 'GET',
    url: '/raid',
    success: response => {
      callback(response);
    }
  });
}
// IN WHICH WE MODIFY THE STATE
function loadData(data) {
  appState.raidTeams = data;
}
// IN WHICH WE RENDER
function render(state) {
  const teamPosts = state.raidTeams.map(team => {
    `<div class="team-post col-8">
      <h3>${team.name}
        <small>${team.time}</small>
      </h3>
      <img class="team-thumb" src="http://placehold.it/850x350" alt="Raid team thumbnail image"/>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
}
// IN WHICH WE HANDLE THE EVENTS

// IN WHICH WE load
$(function() {
  fetchTeams(loadData);
  render(appState);
});
