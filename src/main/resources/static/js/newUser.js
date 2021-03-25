function newUser() {
    if ($('#newUserNav').hasClass('active') === false) {
        $('#newUserNav').addClass("active");
        $('#usersTableNav').removeClass('active');
    }
    $('#basicSpace').empty();
    $('#basicSpace').append('<h6 class="card-header">Add new user</h6>\n' +
        '                <div class="card-body"  >\n' +
        '                    <div class="container-fluid">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-md-4"></div>\n' +
        '                            <form class="col-md-4 text-center font-weight-bold" id="newUserForm">\n' +
        '\n' +
        '                                <label>Name</label>\n' +
        '                                <input type="text" id="name" class="form-control"\n' +
        '                                       placeholder="Input name"/>\n' +
        '\n' +
        '                                <label>Surname</label>\n' +
        '                                <input type="text" id="surname" class="form-control"\n' +
        '                                       placeholder="Input surname"/>\n' +
        '\n' +
        '                                <label>Profession</label>\n' +
        '                                <input type="text" id="profession" class="form-control"\n' +
        '                                       placeholder="Input profession"/>\n' +
        '\n' +
        '                                <label>Email</label>\n' +
        '                                <input type="email" id="email" class="form-control "\n' +
        '                                       placeholder="Input email"/>\n' +
        '\n' +
        '                                <label>Password</label>\n' +
        '                                <input type="password" id="password" class="form-control"\n' +
        '                                       placeholder="Input password"/>\n' +
        '                                \n' +
        '                                <hr>\n' +
        '                                <label for="selectRoles">Select roles</label>\n' +
        '                                <select class="form-control" required multiple id="selectRoles"\n' +
        '                                        size="2">\n' +
        '                                    <option value="1">ADMIN</option>\n' +
        '                                    <option value="2">USER</option>\n' +
        '                                </select>\n' +
        '                                <br>\n' +
        '                                <button class="btn btn-success" type="submit" onclick="saveUser();return false">Add new user</button>\n' +
        '                            </form>\n' +
        '                            <div class="col-md-4"></div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>'
    );
}