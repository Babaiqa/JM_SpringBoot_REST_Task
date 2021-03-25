function modalDeleteFunc(id) {
    $.getJSON('http://localhost:8080/' + id, function(json){
        let user = {
            id: json.id,
            name: json.name,
            surname: json.surname,
            profession: json.profession,
            password: json.password,
            email: json.email,
            roles: json.roles.map(role => role.roleName)
        };

        let modal = document.getElementById('modalWindow');

        modal.innerHTML =
            '<div class="modal fade" id="modalDelete" tabindex="-1"\n' +
            '     aria-hidden="true"\n' +
            '     aria-labelledby="modalDelete">\n' +
            '    <div class="modal-dialog">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-header">\n' +
            '                <h6 class="modal-title" id="modalDeleteLabel">Delete user</h6>\n' +
            '                <button type="button" class="close" data-dismiss="modal"\n' +
            '                        aria-label="Close">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '            <div class="font-weight-bold">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-md-3"></div>\n' +
            '                    <div class="col-md-6">\n' +
            '                        <form class="text-center" id="formDelete">\n' +
            '                          <fieldset disabled>\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dID">ID</label>\n' +
            '                                <input class="form-control" type="number" id="dID" name="id"\n' +
            '                                       value="' + user.id + '" readonly/>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dName">Name</label>\n' +
            '                                <input class="form-control" type="text" id="dName"\n' +
            '                                       name="name" value="' + user.name + '"/>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dSurname">Surname</label>\n' +
            '                                <input class="form-control" type="text"\n' +
            '                                       id="dSurname" name="surname" value="' + user.surname + '" />\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dProfession">Profession</label>\n' +
            '                                <input class="form-control" type="text"\n' +
            '                                       id="dProfession" name="profession" value="' + user.profession + '" />\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dEmail">Email</label>\n' +
            '                                <input class="form-control" type="text"\n' +
            '                                       id="dEmail" name="email" value="' + user.email + '" />\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dPassword">Password</label>\n' +
            '                                <input class="form-control" name="password" type="text"\n' +
            '                                       id="dPassword"/>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="dSelectRoles">ROLE</label>\n' +
            '                                <select class="form-control" name="selectRoles[]" required\n' +
            '                                        multiple\n' +
            '                                        id="dSelectRoles" size="2">\n' +
            '                                    <option value="1">ADMIN</option>\n' +
            '                                    <option value="2">USER</option>\n' +
            '                                </select>\n' +
            '                            </div>\n' +
            '                          </fieldset>\n' +
            '                        </form>\n' +
            '                    </div>\n' +
            '                    <div class="col-md-3"></div>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="modal-footer">\n' +
            '                <div class="btn-block text-right">\n' +
            '                    <input type="button" class="btn btn-secondary"\n' +
            '                           data-dismiss="modal" value="Close"/>\n' +
            '                    <input class="btn btn-danger"\n' +
            '                           onclick="deleteUser()" \n' +
            '                           data-dismiss="modal" \n' +
            '                           type="button"\n' +
            '                           value="Delete"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        $('#modalDelete').modal();
    });
}
