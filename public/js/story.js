/**
 * Created by L&M on 03/09/14.
 */

$(function(){
   $("#get-all-images-btn").on("click", function(){
       $.getJSON("/story/get-all-authors-images")
   })
});
