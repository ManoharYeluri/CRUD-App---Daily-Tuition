$('#add_user').submit(function (e) {
    alert('Data saved successfully :)');
    window.location.replace('http://localhost:3000/');
});

$('#update_user').submit(function (e) {
    e.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    });
    var request = {
        "url": `http://localhost:3000/api/user/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert('Data updated successfully :)');
        window.location.replace('http://localhost:3000/');
    })
});

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/user/${id}`,
            "method": "DELETE"
        }

        if (confirm("Are you sure you want to delete?")) {
            $.ajax(request).done(function (response) {
                alert('Data deleted successfully.');
                location.reload();
            })
        }
    })
}