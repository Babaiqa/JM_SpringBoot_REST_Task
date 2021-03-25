function modalEditFunc(id) {
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
            '<div class="modal fade" id="modalEdit" tabindex="-1"\n' +
            '     aria-hidden="true"\n' +
            '     aria-labelledby="modalEdit">\n' +
            '    <div class="modal-dialog">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-header">\n' +
            '                <h6 class="modal-title" id="modalEditLabel">Edit user</h6>\n' +
            '                <button type="button" class="close" data-dismiss="modal"\n' +
            '                        aria-label="Close">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '            <div class="font-weight-bold">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-md-3"></div>\n' +
            '                    <div class="col-md-6">\n' +
            '                        <form class="text-center" id="formEdit">\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="eID">ID</label>\n' +
            '                                <input class="form-control" type="number" id="eID" name="id"\n' +
            '                                       value="' + user.id + '" readonly/>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="eName">Name</label>\n' +
            '                                <input class="form-control" type="text" id="eName"\n' +
            '                                       name="name" value="' + user.name + '"/>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="eSurname">Surname</label>\n' +
            '                                <input class="form-control" type="text"\n' +
            '                                       id="eSurname" name="surname" value="' + user.surname + '" />\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="eProfession">Profession</label>\n' +
            '                                <input class="form-control" type="text"\n' +
            '                                       id="eProfession" name="profession" value="' + user.profession + '" />\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="eEmail">Email</label>\n' +
            '                                <input class="form-control" type="text"\n' +
            '                                       id="eEmail" name="email" value="' + user.email + '" />\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="ePassword">Password</label>\n' +
            '                                <input class="form-control" name="password" type="text"\n' +
            '                                       id="ePassword"/>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="form-group">\n' +
            '                                <label for="eSelectRoles">ROLE</label>\n' +
            '                                <select class="form-control required" name="selectRoles[]"\n' +
            '                                        multiple\n' +
            '                                        id="eSelectRoles" size="2">\n' +
            '                                    <option value="1">ADMIN</option>\n' +
            '                                    <option value="2">USER</option>\n' +
            '                                </select>\n' +
            '                            </div>\n' +
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
            '                    <input class="btn btn-primary" onclick="updateUser()"\n' +
            '                           type="submit"\n' +
            '                           data-dismiss="modal"\n' +
            '                           value="Edit"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';

        $('#modalEdit').modal();
    });


}
