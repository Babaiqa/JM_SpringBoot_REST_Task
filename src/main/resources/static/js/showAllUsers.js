$(document).ready(showAll());

function showAll() {
    if ($('#usersTableNav').hasClass('active') === false) {
        $('#usersTableNav').addClass("active");
        $('#newUserNav').removeClass("active");
    }

    $('#basicSpace').empty();
    $('#basicSpace').append(
        '<h6 class="card-header">All users</h6>\n' +
        '                <div class="card-body table-responsive">\n' +
        '                    <table class="table table-striped table-sm">\n' +
        '                        <thead id="thead">\n' +
        '                        <tr>\n' +
        '                            <th>ID</th>\n' +
        '                            <th>Name</th>\n' +
        '                            <th>Surname</th>\n' +
        '                            <th>Profession</th>\n' +
        '                            <th>Email</th>\n' +
        '                            <th>Roles</th>\n' +
        '                            <th>Edit</th>\n' +
        '                            <th>Delete</th>\n' +
        '                        </tr>\n' +
        '                        </thead>\n' +
        '                        <tbody id="tbody">\n' +
        '                        </tbody>\n' +
        '                    </table>\n' +
        '                </div>'
    );


    $.getJSON('http://localhost:8080/', function (json) {
        let tr = [];

        for (let i = 0; i < json.length; i++) {
            let rolesArr = json[i].roles.map(role => role.roleName);
            let user = {
                id: json[i].id,
                name: json[i].name,
                surname: json[i].surname,
                profession: json[i].profession,
                email: json[i].email,
                roles: rolesArr.sort((a, b) => a.localeCompare(b))
            };

            tr.push('<tr id="' + user.id + '">');
            tr.push('<td>' + user.id + '</td>');
            tr.push('<td>' + user.name + '</td>');
            tr.push('<td>' + user.surname + '</td>');
            tr.push('<td>' + user.profession + '</td>');
            tr.push('<td>' + user.email + '</td>');
            tr.push('<td>' + user.roles + '</td>');

            tr.push('<td><button class="btn btn-primary editButton" onclick="modalEditFunc(' + user.id + ')">Edit</button></td>');
            tr.push('<td><button class="btn btn-danger deleteButton" onclick="modalDeleteFunc(' + user.id + ')">Delete</button></td>');
            tr.push('</tr>');
        }

        $('#tbody').empty();
        $('#tbody').append($(tr.join('')));
    });
}