function showUser(id) {


    $.getJSON('http://localhost:8080/' + id, function (json) {
        let arr = [];

        arr.push('<tr id="'+ json.id + '">');
        arr.push('<td>' + json.id + '</td>');
        arr.push('<td>' + json.name + '</td>');
        arr.push('<td>' + json.surname + '</td>');
        arr.push('<td>' + json.profession + '</td>');
        arr.push('<td>' + json.email + '</td>');
        arr.push('<td>' + json.roles.map(role => role.roleName).join(", ") + '</td>');

        arr.push('<td><button class="btn btn-primary editButton" onclick="modalEditFunc(' + json.id + ')">Edit</button></td>');
        arr.push('<td><button class="btn btn-danger deleteButton" onclick="modalDeleteFunc(' + json.id + ')">Delete</button></td>');
        arr.push('</tr>');

        $('#tbody').empty();
        $('#tbody').append($(arr.join('')));
    });
}
