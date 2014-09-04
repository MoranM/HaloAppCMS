
/**
 * Created by L&M on 03/09/14.
 */

$(function () {
    initAuthorsImageSectionBox();

});

function initAuthorsImageSectionBox() {
    var wasCalled = false;
    var formScope = $("#upload-story");

    $("#get-all-images-btn").on("click", function () {
        var modal = $("#pick-image-modal");
        var modalBody = modal.find(".modal-body");

        if (!wasCalled) {
            $.getJSON("/story/get-all-authors-images")
                .done(function (images) {
                var len = images.length;
                for (var i = 0; i < len; i++) {
                    var src = images[i];
                    modalBody.append($("<div></div>").addClass("image-wrapper").html('<img class="img-rounded" src=' + src + ' />'));
                }

                modal.on("click", "img", function(){
                    var imageSrc = $(this).attr("src");
                    formScope.find(".selected-image-container img").attr("src", imageSrc);
                    $("#existing-author-image").val(imageSrc);
                    modal.modal("hide");
                });
                wasCalled = true;
            });
        }
        modal.modal();
    });
}
