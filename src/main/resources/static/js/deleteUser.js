function deleteUser() {

    let id = window.formDelete.dID.value;

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        url: 'http://localhost:8080/delete',
        data: JSON.stringify(id),
        dataType: 'json',
        cache: false,
        success:
            $('#' + id).remove()
    })
}