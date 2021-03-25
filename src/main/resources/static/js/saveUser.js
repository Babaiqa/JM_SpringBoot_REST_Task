function saveUser() {
    let selectedRoles = window.newUserForm.querySelectorAll('#selectRoles option:checked');
    let roleSet = new Set();

    for (let i = 0; i < selectedRoles.length; i++) {
        selectedRoles[i].value === "1"
            ? roleSet.add({"id": 1, "roleName": "ADMIN"})
            : roleSet.add({"id": 2, "roleName": "USER"})
    }

    let user = {
        name: window.newUserForm.name.value,
        surname: window.newUserForm.surname.value,
        profession: window.newUserForm.profession.value,
        password: window.newUserForm.password.value,
        email: window.newUserForm.email.value,
        roles: Array.from(roleSet)
    };
    if (!(Object.values(user)).includes(null)) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: 'http://localhost:8080/save',
            data: JSON.stringify(user),
            dataType: 'json',
            cache: false,
            success: function (response) {
                let responseRoles = response.roles.map(role => role.roleName).sort((a, b) => a.localeCompare(b));
                $('#tbody').append(
                    '<tr id="' + response.id + '">\n' +
                    '<td>' + response.id + '</td>\n' +
                    '<td>' + response.name + '</td>\n' +
                    '<td>' + response.surname + '</td>\n' +
                    '<td>' + response.profession + '</td>\n' +
                    '<td>' + response.email + '</td>\n' +
                    '<td>' + responseRoles + '</td>\n' +

                    '<td><button class="btn btn-primary editButton" onclick="modalEditFunc(' + response.id + ')">Edit</button></td>\n' +
                    '<td><button class="btn btn-danger deleteButton" onclick="modalDeleteFunc(' + response.id + ')">Delete</button></td>\n' +
                    '</tr>'
                );
                showAll();
            }

        })
    }
}
