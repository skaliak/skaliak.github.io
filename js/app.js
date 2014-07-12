/**
 * Created by Peter on 7/11/2014.
 */
var gShowcase = angular.module('gShowcase', ['ngSanitize']);

var ghusername = 'skaliak';
var baseurl = 'https://api.github.com';
var reposurl = baseurl + '/users/' + ghusername + '/repos';
var mediatype = { accept: 'application/vnd.github.VERSION.html'};  //to return md as rendered html


function gsController($scope, $http) {

    $http.get(reposurl)
        .success(function (data) {
            filtered = [];
            $scope.readmes = [];
            data.forEach(function(obj) {
                //from the list of all repos, only keep the ones with a description
               if (obj.description != null && obj.description != "")
               {
                    filtered.push(obj);
                   u = baseurl + '/repos/' + ghusername + '/' + obj.name + '/readme';
                    req_config = { headers: mediatype };
                   $http.get(u, req_config)
                       .success(function (readme_html) {
                              $scope.readmes.push(readme_html);
                       })
                       .error(function (readme_html) {
                           console.log(u);
                           console.log("error:" + readme_html.message);
                   })
               }
            });
            $scope.repos = filtered;
        })
        .error(function (data) {
            console.log("error:" + data);
        });
}