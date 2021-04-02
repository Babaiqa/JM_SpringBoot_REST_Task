$(document).ready(showAll());
//Метод отображения всех пользователей и сама таблица
function showAll() {
    if ($('#usersTableNav').hasClass('active') === false) {
        $('#usersTableNav').addClass("active");
        $('#newUserNav').removeClass("active");
    }

    $('#basicSpace').empty();
    $('#basicSpace').append(
        `<h6 class="card-header">All users</h6>
        <div class="card-body table-responsive">
            <table class="table table-striped table-sm">
                <thead id="thead">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Profession</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </div>`
    );


    $.getJSON('http://localhost:8080/api/', function (json) {
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

            tr.push(`<tr id="${user.id}">`);
            tr.push(`<td>${user.id}</td>`);
            tr.push(`<td>${user.name}</td>`);
            tr.push(`<td>${user.surname}</td>`);
            tr.push(`<td>${user.profession}</td>`);
            tr.push(`<td>${user.email}</td>`);
            tr.push(`<td>${user.roles}</td>`);

            tr.push(`<td><button class="btn btn-primary" onclick="modalEditFunc(${user.id})">Edit</button></td>`);
            tr.push(`<td><button class="btn btn-danger" onclick="modalDeleteFunc(${user.id})">Delete</button></td>`);
            tr.push(`</tr>`);
        }

        $('#tbody').empty();
        $('#tbody').append($(tr.join('')));
    });
}

//Отображение формы создания нового пользователя
function newUser() {
    if ($('#newUserNav').hasClass('active') === false) {
        $('#newUserNav').addClass("active");
        $('#usersTableNav').removeClass('active');
    }
    $('#basicSpace').empty();
    $('#basicSpace').append(
        `<h6 class="card-header">Add new user</h6>
    <div class="card-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4"></div>
                <form class="col-md-4 text-center font-weight-bold" id="newUserForm">

                    <label>Name</label>
                    <input type="text" id="name" class="form-control"
                           placeholder="Input name" required/>

                    <label>Surname</label>
                    <input type="text" id="surname" class="form-control"
                           placeholder="Input surname" required/>

                    <label>Profession</label>
                    <input type="text" id="profession" class="form-control"
                           placeholder="Input profession" required/>

                    <label>Email</label>
                    <input type="email" id="email" class="form-control "
                           placeholder="Input email" required/>

                    <label>Password</label>
                    <input type="password" id="password" class="form-control"
                           placeholder="Input password" required/>

                    <hr>
                        <label for="selectRoles">Select roles</label>
                        <select class="form-control" multiple id="selectRoles" required
                                size="2">
                            <option value="1">ADMIN</option>
                            <option value="2">USER</option>
                        </select>
                        <br>
                            <button class="btn btn-success" type="submit" onclick="saveUser();return false">Add new
                                user
                            </button>
                </form>
                <div class="col-md-4"></div>
            </div>
        </div>
    </div>`);
}

//Отправка формы нового пользователя на контроллер
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
            url: 'http://localhost:8080/api/save',
            data: JSON.stringify(user),
            dataType: 'json',
            cache: false,
            success: function (response) {
                let responseRoles = response.roles.map(role => role.roleName).sort((a, b) => a.localeCompare(b));
                $('#tbody').append(
                    `<tr id="${response.id}">
                    <td>${response.id}</td>
                    <td>${response.name}</td>
                    <td>${response.surname}</td>
                    <td>${response.profession}</td>
                    <td>${response.email}</td>
                    <td>${responseRoles}</td>

                    <td><button class="btn btn-primary editButton" onclick="modalEditFunc(${response.id})">Edit</button></td>
                    <td><button class="btn btn-danger deleteButton" onclick="modalDeleteFunc(${response.id})">Delete</button></td>
                    </tr>`
                );
                showAll();
            }

        })
    }
}

//Модальное окно с формой редактирования пользователя
function modalEditFunc(id) {
    $.getJSON('http://localhost:8080/api/' + id, function (json) {
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
            `<div class="modal fade" id="modalEdit" tabindex="-1"
                 aria-hidden="true"
                 aria-labelledby="modalEdit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="modalEditLabel">Edit user</h6>
                            <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="font-weight-bold">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <form class="text-center" id="formEdit">
                                        <div class="form-group">
                                            <label for="eID">ID</label>
                                            <input class="form-control" type="number" id="eID" name="id" value="${user.id}" readOnly/>                                                   
                                        </div>

                                        <div class="form-group">
                                        <label for="eName">Name</label>
                                        <input class="form-control" type="text" id="eName" name="name" value="${user.name}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eSurname">Surname</label>
                                            <input class="form-control" type="text" id="eSurname" name="surname" value="${user.surname}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eProfession">Profession</label>
                                            <input class="form-control" type="text" id="eProfession" name="profession" value="${user.profession}"/>
                                        </div>

                                        <div class="form-group">
                                            <label for="eEmail">Email</label>
                                            <input class="form-control" type="text" id="eEmail" name="email" value="${user.email}"/>
                                        </div>
                                        
                                        <label for="ePassword">Password</label>
                                        <input type="password" id="ePassword" class="form-control" placeholder="Input password"/>

                                        <div class="form-group">
                                            <label for="eSelectRoles">ROLE</label>
                                            <select class="form-control" name="selectRoles[]" multiple id="eSelectRoles" size="2" required>
                                                <option value="1">ADMIN</option>
                                                <option value="2">USER</option>
                                            </select>
                                         </div>
                                    </form>
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="btn-block text-right">
                                <input type="button" class="btn btn-secondary" data-dismiss="modal" value="Close"/>                                      
                                <input class="btn btn-primary" type="submit" onclick="updateUser()" data-dismiss="modal" value="Edit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        $('#modalEdit').modal();
    });
}

//Отправка формы отредактированного пользователя на контроллер
function updateUser() {
    let selectedRoles = window.formEdit.querySelectorAll('#eSelectRoles option:checked');
    let roleSet = new Set();

    for (let i = 0; i < selectedRoles.length; i++) {
        selectedRoles[i].value === "1"
            ? roleSet.add({"id": 1, "roleName": "ADMIN"})
            : roleSet.add({"id": 2, "roleName": "USER"})
    }

    let user = {
        id: window.formEdit.eID.value,
        name: window.formEdit.eName.value,
        surname: window.formEdit.eSurname.value,
        profession: window.formEdit.eProfession.value,
        password: window.formEdit.ePassword.value,
        email: window.formEdit.eEmail.value,
        roles: Array.from(roleSet)
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8080/api/update',
        data: JSON.stringify(user),
        dataType: 'json',
        cache: false,
        success: function (response) {
            let responseRoles = response.roles.map(role => role.roleName).sort((a, b) => a.localeCompare(b));

            $(`#${response.id}`)
                .replaceWith(
                    `<tr id="${response.id}">
                        <td>${response.id}</td>
                        <td>${response.name}</td>
                        <td>${response.surname}</td>
                        <td>${response.profession}</td>
                        <td>${response.email}</td>
                        <td>${responseRoles}</td>

                    <td><button class="btn btn-primary" onclick="modalEditFunc(${response.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="modalDeleteFunc(${response.id})">Delete</button></td>
                    </tr>`
                )
        }
    })
}

//Модальное окно с формой для удаления пользователя
function modalDeleteFunc(id) {
    $.getJSON('http://localhost:8080/api/' + id, function (json) {
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
            `<div class="modal fade" id="modalDelete" tabindex="-1"
                 aria-hidden="true"
                 aria-labelledby="modalDelete">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="modalDeleteLabel">Delete user</h6>
                            <button type="button" class="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="font-weight-bold">
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <form class="text-center" id="formDelete">
                                        <fieldset disabled>
                                            <div class="form-group">
                                                <label for="dID">ID</label>
                                                <input class="form-control" type="number" id="dID" name="id" value="${user.id}" readonly/>
                                            </div>
            
                                            <div class="form-group">
                                                <label for="dName">Name</label>
                                                <input class="form-control" type="text" id="dName" name="name" value="${user.name}"/>
                                            </div>
           
                                            <div class="form-group">
                                                <label for="dSurname">Surname</label>
                                                <input class="form-control" type="text" id="dSurname" name="surname" value="${user.surname}"/>
                                            </div>
            
                                            <div class="form-group">
                                                <label for="dProfession">Profession</label>
                                                <input class="form-control" type="text" id="dProfession" name="profession" value="${user.profession}"/>
                                            </div>
            
                                            <div class="form-group">
                                                <label for="dEmail">Email</label>
                                                <input class="form-control" type="text" id="dEmail" name="email" value="${user.email}" />
                                            </div>
            
                                            <div class="form-group">
                                            <label for="dSelectRoles">ROLE</label>
                                            <select class="form-control" name="selectRoles[]"
                                                    multiple
                                                    id="dSelectRoles" size="2">
                                                <option value="1">ADMIN</option>
                                                <option value="2">USER</option>
                                            </select>
                                            </div>
                                        </fieldset>
                                    </form>
                                <div class="col-md-3"></div>
                            </div>
            
                        </div>
            
                        <div class="modal-footer">
                            <div class="btn-block text-right">
                                <input type="button" class="btn btn-secondary"
                                       data-dismiss="modal" value="Close"/>
                                <input class="btn btn-danger"
                                       onclick="deleteUser()"
                                       data-dismiss="modal"
                                       type="button"
                                       value="Delete"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        $('#modalDelete').modal();
    });
}

//Отправка формы удаляемого пользователя на контроллер
function deleteUser() {

    let id = window.formDelete.dID.value;

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8080/api/delete',
        data: JSON.stringify(id),
        dataType: 'json',
        cache: false,
        success:
            $('#' + id).remove()
    })
}