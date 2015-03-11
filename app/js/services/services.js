'use strict';

myApp.factory('commentAPIservice', function ($http,urls) {

    var commentAPI = {};


    commentAPI.getComments = function (id_user, id_trip, istrip, isLastComment, isFriend)
    {
        return $http({
            method: 'GET',
            url: urls.GetComments,
            params:{'id_user':id_user, 'id_trip':id_trip, 'istrip':istrip,'isLastComment':isLastComment, isFriend:isFriend}});
    } // getComments Service

    commentAPI.setComment = function (id_user_post, id_user, id_trip, istrip, content)
    {
        return $http({
            method: 'GET',
            url:urls.SetComment,
            params:{'id_user_post': id_user_post, 'id_user': id_user, 'id_trip': id_trip, 'istrip':istrip, 'content':content}});
    } // setComment Service

    commentAPI.deletePost = function (id_comment)
    {
        return $http({
            method: 'GET',
            url:urls.DeletePost,
            params:{'id_comment': id_comment}});
    } // deletePost Service

    commentAPI.setReplyComment = function (id_post, id_user, content)
    {
        return $http({
            method: 'GET',
            url:urls.SetReplyComment,
            params:{'id_post': id_post, 'id_user' : id_user, 'content' : content}});
    } // setReplyComment Service

    /*
     [
     {
     "id": "102",
     "id_user": "3",
     "date": "26/02/201516: 6: 47",
     "content": "g",
     "id_user_post": "3",
     "id_trip": "-1",
     "ip": "62.149.132.143",
     "dest_user": "ValerioPisapia",
     "dest_trip": "",
     "mitt_user": "ValerioPisapia",
     "id_post": "67"
     }
     ]
     http://newsletter.crubles.com/ws.asmx/getReplyComment
     */
    commentAPI.getReplyComment = function (id_user_post, id_post) {
        return $http({
            method: 'GET',
            url:urls.GetReplyComment,
            params:{'id_user': id_user_post, 'id_post': id_post}});
    } // getReplyComment Service

    commentAPI.deleteReplyPost = function (id_comment)
    {
        return $http({
            method: 'GET',
            url:urls.DeleteReplyComment,
            params:{'id_comment': id_comment}});
    } // deleteReplyPost Service


    return commentAPI;

}).constant("urls",{
    "GetComments" : 'json-data/comments.json', 
    "SetComment" : 'json-data/comment.json', 
    "DeletePost" : 'json-data/deleteResponse.json',
    "SetReplyComment" : 'json-data/reply.json',
    "GetReplyComment" : 'json-data/reply-comments.json', 
    "DeleteReplyComment" : 'json-data/deleteResponse.json' 
}); // commentAPIservice
