$(document).ready(() => {
  $("#searchUser").on("keyup", e => {
    let userInput = e.target.value;

    $.ajax({
      url: `https://api.github.com/users/${userInput}`,
      data: {
        client_id: "73312955419fc3ec68c4",
        client_secret: "4d13e8906944f8f88c6635d1d60d183ebd6f8b4f"
      }
    }).done(user => {
      $.ajax({
        url: `https://api.github.com/users/${userInput}/repos`,
        data: {
          client_id: "73312955419fc3ec68c4",
          client_secret: "4d13e8906944f8f88c6635d1d60d183ebd6f8b4f",
          sort: 'created: asc',
          per_page: 10
        }
      }).done(repos => {
        $.each(repos, (index, repo) => {
           $('#repos').append(`
            <div class='jumbotron'>
                <div class='row'>
                    <div class='col-md-7'>
                        ${repo.name}: ${repo.description}
                    </div>
                    <div class='col-md-3'>
                        <span class="badge badge-warning mx-1 mb-2">Public Repos: ${
                            repo.forks_count
                        }</span>
                        <span class="badge badge-secondary mx-1 mb-2">Public Gists: ${
                            repo.watchers_count
                        }</span>
                        <span class="badge badge-success mx-1 mb-2">Followers: ${
                            repo.stargazers_count
                        }</span>
                    </div>
                    <div class='col-md-2'>
                        <a href='${repo.html_url}' target='_blank' class='btn btn-dark btn-block'>Repo Page</a>
                    </div>
                </div>
            </div>
           `) 
        })
      });
      $("#profile").html(`
            <div class="card">
                <div class="card-header">
                    <h3>${user.name}</h3>
                </div> 
                
                <div class="card-body">
                    <div class='row'>
                        <div class='col-md-3'>
                            <img src='${
                              user.avatar_url
                            }' style='width:100%' alt='profile_img' >
                            <a href='${
                              user.html_url
                            }' target='_blank' class='btn btn-dark btn-block mt-3 mb-3'>View profile</a>   
                        </div>
                        <div class='col-md-9'>
                            <span class="badge badge-warning mx-1 mb-2">Public Repos: ${
                              user.public_repos
                            }</span>
                            <span class="badge badge-secondary mx-1 mb-2">Public Gists: ${
                              user.public_gists
                            }</span>
                            <span class="badge badge-success mx-1 mb-2">Followers: ${
                              user.public_repos
                            }</span>
                            <span class="badge badge-danger mx-1 mb-2">Following: ${
                              user.following
                            }</span>
                            <br><br>
                            <ul class='list-group'>
                                <li class='list-group-item'>Compnay: ${
                                  user.company
                                }</li>
                                <li class='list-group-item'>User's Blog: ${
                                  user.blog
                                }</li>
                                <li class='list-group-item'>Location: ${
                                  user.location
                                }</li>
                                <li class='list-group-item'>Member Since: ${
                                  user.created_at
                                }</li>
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
        <h2 class='mt-3 mb-3'>Latest Repos</h2>
        <div id='repos'></div>
        `);
    });
  });
});
