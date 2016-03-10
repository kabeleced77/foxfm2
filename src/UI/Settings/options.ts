// Saves options to chrome.storage
function save_options() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    var appSettings = document.getElementById('appSettings').value;
    chrome.storage.local.set({
        favoriteColor: color,
        likesColor: likesColor,
        AppSettings: JSON.parse(appSettings)
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get({
        favoriteColor: 'red',
        likesColor: true,
        AppSettings: {}
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
        document.getElementById('appSettings').value = JSON.stringify(items.AppSettings);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


function fromJson(targetObject, sourceJsonString) {
    var obj = JSON.parse(sourceJsonString);
    for (var property in targetObject) {
        // only deserialise those properties which are part of the constructor
        if (targetObject.hasOwnProperty(property)) {
            targetObject[property] = obj[property];
        }
    }
    return targetObject;
}