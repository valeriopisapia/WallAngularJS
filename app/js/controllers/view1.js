'use strict';

var View1Controller = angular.module('View1Controller', []);
View1Controller.controller('View1Controller',
    function($scope, $rootScope, commentAPIservice)
{
    $scope.comments = [];
    $scope.replyComment = [];
    $scope.isWaiting = false;

    $scope.author = "";

    $scope.id_user_friend = document.getElementById("idFriend").value;  //To server or to cookie
    $scope.id_user_master = document.getElementById("idUserMaster").value; //To server or to cookie

    $scope.isWaiting = true;

    commentAPIservice.getComments($scope.id_user_master, -1, false, false, false)
        .success(function (response) {

            $scope.isWaiting = false;
            var jsonFinal;

            if(typeof response =='object')
            {
                jsonFinal = response;
            }
            else
            {
                jsonFinal = JSON.parse(response);
            }

            for (var i = 0; i < jsonFinal.length; i++) {

                var comment = new Comment(jsonFinal[i]);
                $scope.comments.push(comment);

            }

            if (jsonFinal.length == 1)
            {
                if (comment.id_post == "-1")
                {
                    $scope.comments.pop();
                }
            }

            for (var i = 0; i < $scope.comments.length; i++)
            {
                var comment = $scope.comments[i];

                commentAPIservice.getReplyComment($scope.id_user_master, comment.id_post)
                    .success(function (response, status, headers, config) {
                        var jsonFinal;

                        if(typeof response == 'object')
                        {
                            jsonFinal = response;
                        } // Check if response is json
                        else
                        {
                            jsonFinal = JSON.parse(response);
                        }

                        //Check comment obj
                        var commentSelected = null;
                        var id_post_reply = config.params.id_post;
                        Object.keys($scope.comments).forEach(function (key)
                        {
                            var obj = $scope.comments[key];

                            if (obj.id_post == id_post_reply)
                            {
                                commentSelected = obj;
                            }
                        });

                        for (var j = 0; j < jsonFinal.length; j++)
                        {
                            var replyObj = new Reply(jsonFinal[j]);

                            if (id_post_reply == replyObj.id_post)
                            {
                                commentSelected.reply.push(replyObj);
                            }
                        }
                    }); // Load Reply Comment
            }
        }); // Load Comment (within Reply Comment)

    $scope.post = function () {
        if ($scope.author && $scope.text) {
            $scope.isWaiting = true;

            commentAPIservice.setComment($scope.id_user_master, $scope.id_user_friend, -1, false, $scope.text)
                .success(function (response) {
                    $scope.isWaiting = false;


                    var jsonFinal;

                    if(typeof response == 'object')
                    {
                        jsonFinal = response;
                    } // Check if response is json
                    else
                    {
                        jsonFinal = JSON.parse(response);
                    }

                    var comment = new Comment(jsonFinal[0]);

                    $scope.comments.push(comment);
                    $scope.text = '';
                }).
                error(function (data, status, headers, config) {
                    $scope.isWaiting = false;
                    //Error Notification
                });
        }
    }; // Insert New Post

    $scope.deletePost = function (objcomment) {
        commentAPIservice.deletePost(objcomment.id_post)
            .success(function (response) {
                var jsonFinal;

                if(typeof response =='object')
                {
                    jsonFinal = response;
                }
                else
                {
                    jsonFinal = JSON.parse(response);
                }

                $scope.comments.splice($scope.comments.indexOf(objcomment), 1);

            }).
            error(function (data, status, headers, config) {
                //Error Notification
            });
    }; // Delete Post within the yours repy

    $scope.postReply = function (message, objcomment) {
        if (message) {
            $scope.isWaiting = true;

            commentAPIservice.setReplyComment(objcomment.id_post, $scope.id_user_master, message)
                .success(function (response) {
                    $scope.isWaiting = false;

                    var jsonFinal;

                    var txtReplyArray = document.getElementsByName("txtReply");
                    for (var i = 0; i < txtReplyArray.length; i++) {
                        txtReplyArray[i].value = "";
                    }

                    if(typeof response == 'object')
                    {
                        jsonFinal = response;
                    } // Check if response is json
                    else
                    {
                        jsonFinal = JSON.parse(response);
                    }

                    var replyObj = new  Reply(jsonFinal[0]);

                    Object.keys($scope.comments).forEach(function (key) {
                        var obj = $scope.comments[key];

                        if (obj.id_post == replyObj.id_post) {

                            obj.reply.push(replyObj);
                        }
                    });
                }).
                error(function (data, status, headers, config) {
                    $scope.isWaiting = false;
                    //Error Notification
                });
        }
    }; // Insert comment to the post

    $scope.deleteReplyPost = function (objcomment) {
        var obj = null;
        var array = null;

        Object.keys($scope.comments).forEach(function (key) {
            var obj_temp = $scope.comments[key].reply;

            for (var i = 0; i < obj_temp.length; i++) {
                if (obj_temp[i].id == objcomment.id) {
                    array = obj_temp;
                    obj = obj_temp[i];
                }
            }
        });

        commentAPIservice.deleteReplyPost(objcomment.id)
            .success(function (response) {
                var jsonFinal;

                if(typeof response =='object')
                {
                    jsonFinal = response;
                }
                else
                {
                    jsonFinal = JSON.parse(response);
                }

                var id_comment_deleted = jsonFinal[0].id;

                array.splice(array.indexOf(objcomment), 1);
            });
    }  // Delete single reply to post

}); // View1Controller