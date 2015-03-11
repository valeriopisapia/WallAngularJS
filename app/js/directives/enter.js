'use strict';

myApp.directive("enter", function ()
{
    return function(scope, element, attrs)
    {
        element.bind("click",function()
        {
            scope.$apply(attrs.enter);
        })
    }
}); // Enter