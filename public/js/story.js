
/**
 * Created by L&M on 03/09/14.
 */

$(function () {
    initAuthorsImageSectionBox();
    initBackgroundSelectionBox();

});

function initBackgroundSelectionBox(){
    $("#get-all-backgrounds-btn").on("click", function () {
        iniImagePickerModal("#pick-image-background-modal",
            "/background/get-all-backgrounds-url",
            ".selected-bg-container img",
            "#background-image");
    });
}

function initAuthorsImageSectionBox() {
    $("#get-all-images-btn").on("click", function () {
        iniImagePickerModal("#pick-image-modal",
            "/story/get-all-authors-images",
            ".selected-image-container img",
            "#existing-author-image");
    });
}

function iniImagePickerModal(modalId, contentUrl, imageContainerSelector, imageFormFieldSelector){
    var wasCalled = false;
    var formScope = $("#upload-story");
    var modal = $(modalId);
    var modalBody = modal.find(".modal-body");

    if (!wasCalled) {
        $.getJSON(contentUrl)
            .done(function (images) {
                var len = images.length;
                for (var i = 0; i < len; i++) {
                    var src = images[i];
                    modalBody.append($("<div></div>").addClass("image-wrapper").html('<img class="img-rounded" src=' + src + ' />'));
                }

                modal.on("click", "img", function(){
                    var imageSrc = $(this).attr("src");
                    formScope.find(imageContainerSelector).attr("src", imageSrc);
                    $(imageFormFieldSelector).val(imageSrc);
                    modal.modal("hide");
                });
                wasCalled = true;
            });
    }
    modal.modal();
}
