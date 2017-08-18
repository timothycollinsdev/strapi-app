(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/strapi/dashboard/dashboard.html',
    '<div class="row"><div class="col-sm-12"><h1 class="page-header">Dashboard</h1><div class="panel panel-default"><div class="panel-heading">Welcome to your admin panel</div><div class="panel-body"><p>The admin panel allows you to easily manage your data. The UI is auto-generated depending on the models of your application. So, in just a few seconds, you are able to create, search, view, edit and delete your data.</p></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/strapi/explorer/explorer-edit.html',
    '<form novalidate data-ng-submit="ExplorerEditCtrl.onSubmit(ExplorerEditCtrl.model)" autocomplete="off"><div class="row"><div class="col-sm-6"><h1 class="page-header" data-ng-if="!ExplorerEditCtrl.model.id">Create {{$stateParams.model}}</h1><h1 class="page-header" data-ng-if="ExplorerEditCtrl.model.id">Edit {{$stateParams.model}}</h1></div><div class="col-sm-6"><div class="action-btn-container pull-right"><button class="btn btn-default" type="button" data-ng-click="ExplorerEditCtrl.resetModel(ExplorerEditCtrl.model)">Reset</button> <button class="btn" ng-class="{\'btn-default\': ExplorerEditCtrl.model.id, \'btn-warning\': !ExplorerEditCtrl.model.id}" type="button" data-ng-click="$state.go(\'strapi.explorer.list\', {model: $stateParams.model})">Cancel</button> <button class="btn btn-warning" data-ng-if="ExplorerEditCtrl.model.id && ($stateParams.model !== \'user\' || user().id !== ExplorerEditCtrl.model.id)" type="button" data-ng-click="ExplorerEditCtrl.deleteEntry(ExplorerEditCtrl.model)">Delete</button> <button data-ng-disabled="ExplorerEditCtrl.submitting" data-ng-if="!ExplorerEditCtrl.model.id" type="submit" class="btn btn-success">Create</button> <button data-ng-disabled="ExplorerEditCtrl.submitting" data-ng-if="ExplorerEditCtrl.model.id" type="submit" class="btn btn-success">Update</button></div></div></div><div class="row"><div class="col-sm-8"><formly-form model="ExplorerEditCtrl.model" fields="ExplorerEditCtrl.fields"></formly-form><div ng-if="$stateParams.model === \'user\'"><button type="button" ng-if="!ExplorerEditCtrl.displayUserPasswordField" ng-click="ExplorerEditCtrl.toggleUserPasswordDisplayField()" class="btn btn-xs btn-default">Display password field</button><div class="panel panel-default" ng-if="ExplorerEditCtrl.displayUserPasswordField"><div class="panel-body"><div class="form-group"><label for="userPassword">PASSWORD</label><span class="pull-right cursor-pointer" ng-click="ExplorerEditCtrl.toggleUserPasswordDisplayField()">Hide field</span><div class="input-group"><input type="{{ExplorerEditCtrl.userPasswordInput.type}}" id="userPassword" name="userPassword" autocomplete="off" class="form-control" placeholder="Password" ng-model="ExplorerEditCtrl.model.password"> <span class="input-group-addon cursor-pointer" ng-click="ExplorerEditCtrl.generateRandomPassword()">Generate</span></div><div class="form-validation display-password-action cursor-pointer" ng-click="ExplorerEditCtrl.changeUserPasswordType()" ng-show="ExplorerEditCtrl.model.password">{{ExplorerEditCtrl.userPasswordInput.action || \'Display\'}} password</div></div></div></div></div><div ng-if="!ExplorerEditCtrl.fields.length"><p>No field to display.</p><p>In order to add fields, edit your <code>api/{apiName}/models/{apiName}.json</code> file following the <a target="_blank" href="http://strapi.io/documentation/models">models documentation</a>.</p></div></div><div class="col-sm-4"><p class="bold uppercase">Manage your publication</p><ng-form><div class="panel panel-default no-padding explorer-manage"><div class="panel-body"><formly-form model="ExplorerEditCtrl.model" fields="ExplorerEditCtrl.createdUpdatedFields"></formly-form><div class="form-group" ng-if="ExplorerEditCtrl.configModel.attributes.lang"><label for="lang" class="uppercase">Lang</label><select class="form-control" name="lang" id="lang" data-ng-model="ExplorerEditCtrl.model.lang" data-ng-options="value for value in configService.getConfig().settings.i18n.locales"></select></div><div class="form-group" ng-if="ExplorerEditCtrl.configModel.templates"><label for="template" class="uppercase">Template</label><select class="form-control" name="template" id="template" data-ng-change="ExplorerEditCtrl.templateChanged(ExplorerEditCtrl.selectedTemplate)" data-ng-model="ExplorerEditCtrl.model.template" data-ng-options="key as key for (key , value) in ExplorerEditCtrl.configModel.templates"></select></div></div></div><p class="bold uppercase" ng-if="ExplorerEditCtrl.relations.length">Manage your relations</p><div class="panel panel-default explorer-relations" ng-if="ExplorerEditCtrl.relations.length"><div class="panel-body"><div class="form-group" ng-repeat="relation in ExplorerEditCtrl.relations"><label class="uppercase">{{relation.key | humanize}}</label><div class="pull-right"><a ng-show="ExplorerEditCtrl.model[relation.key].id" class="no-border text-success explorer-see-link" data-ui-sref="strapi.explorer.list.edit({model:relation.model, entryId:ExplorerEditCtrl.model[relation.key].id})" target="_blank">SEE</a> <a ng-show="relation.collection && ExplorerEditCtrl.model[relation.key]" class="no-border text-success explorer-see-link cursor-pointer" data-go-to-collection ng-click="goToCollection(ExplorerEditCtrl.model[relation.key], $stateParams.model, relation.collection, true)" target="_blank">SEE</a></div><div ng-if="relation.model"><ui-select ng-model="ExplorerEditCtrl.model[relation.key]" theme="select2"><ui-select-match placeholder="Select {{relation.model|an}} {{relation.model}} in the list...">{{$select.selected[getDisplayedAttribute(relation, $select.selected.template)] || \'Id: \' + $select.selected.id}}</ui-select-match><ui-select-choices repeat="item as item in relation.suggestions" refresh-delay="0" refresh="ExplorerEditCtrl.refreshSuggestions(relation, $select.search, ExplorerEditCtrl.model[relation.formattedName])" infinite-scroll-loading="relation.loading" infinite-scroll-immediate-check="true" infinite-scroll="ExplorerEditCtrl.refreshSuggestions(relation, $select.search, ExplorerEditCtrl.model[relation.formattedName])" infinite-scroll-distance="2"><div>{{item[getDisplayedAttribute(relation, item.template)] || \'Id: \' + item.id}}</div></ui-select-choices></ui-select></div><div ng-if="!relation.model && relation.collection"><ui-select multiple ng-model="ExplorerEditCtrl.model[relation.key]" ng-change="ExplorerEditCtrl.refreshSuggestions(relation, $select.search, ExplorerEditCtrl.model[relation.key], true)" theme="bootstrap"><ui-select-match ng-model="ExplorerEditCtrl.relation.search" placeholder="Select {{relation.name|an}} {{relation.name}}..."><a class="no-border text-muted" data-ui-sref="strapi.explorer.list.edit({model:relation.collection, id:$item.id})" target="_blank">{{$item[getDisplayedAttribute(relation, $item.template)] || \'Id: \' + $item.id}}</a></ui-select-match><ui-select-choices repeat="item as item in relation.suggestions" refresh-delay="0" refresh="ExplorerEditCtrl.refreshSuggestions(relation, $select.search, ExplorerEditCtrl.model[relation.key])" infinite-scroll-loading="ExplorerEditCtrl.relation.loading" infinite-scroll-immediate-check="true" infinite-scroll="refreshSuggestions(relation, $select.search, ExplorerEditCtrl.model[relation.formattedName])" infinite-scroll-distance="2"><div ng-if="!item.createLink">{{item[getDisplayedAttribute(relation, item.template)] || \'Id: \' + item.id}}</div><a class="text-white no-border" ng-if="item.createLink" target="_blank" data-ui-sref="strapi.explorer.list.create({model: relation.name})">No {{relation.name}} yet. Create</a></ui-select-choices></ui-select></div></div></div></div></ng-form></div></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/strapi/explorer/explorer-list.html',
    '<div class="row"><div class="col-sm-4"><h1 class="page-header">{{ExplorerListCtrl.configModel.identity | pluralize | capitalize}}</h1></div><div class="col-sm-8"><div class="action-btn-container pull-right"><button class="btn btn-default" ng-click="ExplorerListCtrl.emptyFilters()">Empty filters</button> <button class="btn btn-default" ng-click="ExplorerListCtrl.getPage()">Refresh</button> <button class="btn btn-success" data-ui-sref="strapi.explorer.list.create({model:ExplorerListCtrl.configModel.identity})">Create {{ExplorerListCtrl.configModel.identity|an}} {{ExplorerListCtrl.configModel.identity}}</button></div></div></div><div class="row" ng-show="ExplorerListCtrl.gridOptions.data.length && ExplorerListCtrl.loading === false || ExplorerListCtrl.search || ExplorerListCtrl.loading && !ExplorerListCtrl.firstLoad"><div class="col-sm-12"><div class="form-group"><label for="search">Search</label><input name="search" id="search" class="form-control" ng-change="ExplorerListCtrl.searchChanged()" ng-model="ExplorerListCtrl.search" placeholder="Search by {{ExplorerListCtrl.displayedAttributes.length ? ExplorerListCtrl.displayedAttributes.join(\' or \') + \' or \' : \'\'}}id"></div></div></div><div class="row"><div class="col-sm-12"><p ng-if="ExplorerListCtrl.loading && ExplorerListCtrl.firstLoad">Loading...</p><p ng-if="!ExplorerListCtrl.gridOptions.data.length && ExplorerListCtrl.loading === false && !ExplorerListCtrl.search">No {{ExplorerListCtrl.configModel.identity ? ExplorerListCtrl.configModel.identity : \'entry\'}} yet. <a data-ui-sref="strapi.explorer.list.create({model:$stateParams.model})">Create a new one.</a></p><p ng-if="!ExplorerListCtrl.gridOptions.data.length && ExplorerListCtrl.loading === false && ExplorerListCtrl.search">No results.</p><div id="explorer-grid-container" class="explorer-grid-container" ng-show="ExplorerListCtrl.gridOptions.data.length || (ExplorerListCtrl.loading !== true && ExplorerListCtrl.loading !== false)" ng-class="{\'loading\': ExplorerListCtrl.loading}"><div ui-grid="ExplorerListCtrl.gridOptions" ui-grid-pagination ui-grid-resize-columns ui-grid-move-columns ui-grid-auto-resize ng-style="ExplorerListCtrl.getTableStyle()" class="grid"></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/strapi/explorer/explorer.html',
    '<div class="row explorer-tutorial"><div class="col-sm-12"><h1 class="page-header">Data Explorer</h1><div class="panel panel-default"><div class="panel-heading">Generate your first API</div><div class="panel-body"><p>It looks like you don\'t have any API yet.</p><p>The Strapi ecosystem offers you two possibilities to create a complete RESTful API.</p><ul class="list-unstyled"><li><p class="bold explorer-tutorial-title">Via the CLI</p><code class="block">$ strapi generate api</code><p>For example, you can create a `car` API with a name (`name`), year (`year`) and the license plate (`license`) with:</p><code class="block">$ strapi generate api car name:string year:integer license:string</code></li><li><p class="bold explorer-tutorial-title">Via the Strapi Studio</p><p>The Strapi Studio allows you to easily build and manage your application environment thanks to a powerful User Interface.</p><p>Log into the Strapi Studio with your user account <a href="http://studio.strapi.io" target="_blank">http://studio.strapi.io</a> and follow the instructions to start the experience.</p></li></ul></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/strapi/users/users.html',
    '<div class="row"><div class="col-sm-12"><h1 class="page-header">Users</h1><div class="panel panel-default"><div class="panel-heading">Welcome to your {{configService.getConfig().isNewApp ? \'new \' : \'\'}}<a href="http://www.strapi.io" target="_blank">Strapi.io</a> app.</div><div class="panel-body"><p>If you have any question, see our <a href="http://www.strapi.io/documentation" target="_blank">documentation</a> for more information. Or contact the community on Stackoverflow, Github...</p><p>Check our GitHub to follow the improvements on <a href="http://www.strapi.io" target="_blank">Strapi.io</a></p></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/auth/change-password/change-password.html',
    '<div class="row margin-top"><div class="col-sm-4 col-sm-offset-4"><div class="login-panel panel panel-success"><div class="panel-heading bg-success"><div class="center-block logo-container"><h3 class="panel-title"><img class="img-responsive center-block" ng-src="{{Config.frontendUrl}}/assets/images/logo.png" alt="Logo"></h3></div></div><div class="panel-body"><h1 class="h3">Change password</h1><p>Please choose a password with a minimum of 8 characters.</p><form name="ChangePasswordCtrl.changePasswordForm" novalidate><formly-form model="ChangePasswordCtrl.form" fields="ChangePasswordCtrl.fields"></formly-form><button class="btn btn-default btn-block" type="submit" data-ng-click="ChangePasswordCtrl.action()">Submit</button></form></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/auth/forgot-password/forgot-password.html',
    '<div class="row margin-top"><div class="col-sm-4 col-sm-offset-4"><div class="login-panel panel panel-success"><div class="panel-heading bg-success"><div class="center-block logo-container"><h3 class="panel-title"><img class="img-responsive center-block" ng-src="{{Config.frontendUrl}}/assets/images/logo.png" alt="Logo"></h3></div></div><div class="panel-body"><h1 class="h3">Forgot password</h1><p>We will send you an email with a link to get<br>your new password. <a href="#" data-ui-sref="auth.register">Not registered?</a></p><form name="ForgotPasswordCtrl.forgotPasswordForm" novalidate><formly-form model="ForgotPasswordCtrl.form" fields="ForgotPasswordCtrl.fields"></formly-form><button class="btn btn-default btn-block" type="submit" data-ng-click="ForgotPasswordCtrl.action()">Send request</button></form></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/auth/login/login.html',
    '<div class="row margin-top login"><div class="col-sm-4 col-sm-offset-4"><div class="login-panel panel panel-success"><div class="panel-heading bg-success"><div class="center-block logo-container"><h3 class="panel-title"><img class="img-responsive center-block" ng-src="{{Config.frontendUrl}}/assets/images/logo.png" alt="Logo"></h3></div></div><div class="panel-body"><h1 class="h3">Login</h1><form name="LoginCtrl.loginForm" novalidate><formly-form model="LoginCtrl.credentials" fields="LoginCtrl.fields"></formly-form><p class="auth-forgot"><a href="#" data-ui-sref="auth.forgotPassword">Forgot Password?</a></p><button class="btn btn-default btn-block" type="submit" data-ng-click="LoginCtrl.action()" data-ng-disabled="LoginCtrl.loading">Login</button></form></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/auth/register/confirm.html',
    '<div class="row"><div class="col-sm-4 col-sm-offset-4"><div class="login-panel panel panel-success"><div class="panel-heading bg-success"><h3 class="panel-title">Registration succeeded</h3></div><div class="panel-body"><p>We send you an email with a link to confirm your account.</p><p><a href="#" data-ui-sref="auth.login">Go to login page</a>.</p></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/auth/register/register.html',
    '<div class="row margin-top register"><div class="col-sm-4 col-sm-offset-4"><div class="login-panel panel panel-success"><div class="panel-heading bg-success"><div class="center-block logo-container"><h3 class="panel-title"><img class="img-responsive center-block" ng-src="{{Config.frontendUrl}}/assets/images/logo.png" alt="Logo"></h3></div></div><div class="panel-body"><div class="text-center"><h1 class="h3">Welcome</h1><p>Please fill out this form to create your first user. This user will have the root permissions (full-access) to the application.</p></div><form name="RegisterCtrl.registrationForm" novalidate><formly-form model="RegisterCtrl.user" fields="RegisterCtrl.fields"></formly-form><button class="btn btn-default btn-block" type="submit" data-ng-click="RegisterCtrl.action()" data-ng-disabled="RegisterCtrl.loading">Register</button></form></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/error/partials/error.html',
    '<div class="container"><div class="col-md-4 col-md-offset-4 margin-top"><div class="panel panel-warning"><div class="panel-heading"><span class="text-center">An error occurred...</span></div><div class="panel-body"><p>{{ErrorCtrl.error.message}}</p><p data-ng-show="ErrorCtrl.error.fromState.name"><a href="#" data-ng-click="ErrorCtrl.goToPrevious()">Back to previous page</a></p><p data-ng-show="!ErrorCtrl.error.fromState.name && user()"><a data-ui-sref="strapi.dashboard">Go to Dashboard</a></p><p data-ng-show="!ErrorCtrl.error.fromState.name && !user().id"><a data-ui-sref="auth.login">Go to Login page</a></p></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/header.html',
    '<div class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0"><div class="navbar-header"><a class="navbar-brand no-border" data-ui-sref="strapi.dashboard"><img ng-src="{{Config.frontendUrl}}/assets/images/logo.png" class="img-responsive logo center-block" alt="Logo"></a></div><div class="navbar-links-container"><ul class="nav navbar-top-links navbar-right"><li class="dropdown navbar-user" uib-dropdown is-open="false"><a class="dropdown-toggle cursor-pointer no-border navbar-user-dropdown" uib-dropdown-toggle><img class="navbar-user-img" ng-src="{{Config.frontendUrl}}/assets/images/user-picture.png" alt="User profile"> {{user().username}} <i class="fa fa-angle-down"></i></a><ul class="dropdown-menu dropdown-user" role="menu"><li><a data-ui-sref="strapi.explorer.list.edit({model:\'user\',entryId:user().id})"><i class="fa fa-user fa-fw"></i> User Profile</a></li><li class="divider"></li><li class="cursor-pointer"><a data-ng-click="HeaderCtrl.logout()"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li></ul></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/layout/partials/menu.html',
    '<div class="navbar-default sidebar active" id="menu" role="navigation" ng-controller="MenuController as MenuCtrl"><div class="sidebar-nav navbar-collapse"><ul class="nav" id="side-menu"><li><a data-ui-sref-active="active" data-ui-sref="strapi.dashboard" ng-click="MenuCtrl.expand(\'dashboard\')"><i class="fa fa-dashboard"></i> <span class="title">Dashboard</span></a></li><li><a class="parent-link cursor-pointer" ng-class="{active: !MenuCtrl.collapsedBooleans[\'explorer\']}" ng-click="MenuCtrl.expand(\'explorer\')"><i class="fa fa-cubes"></i> <span class="title">Models</span> <span class="fa arrow"></span></a><ul class="nav nav-second-level" ng-class="{open: !MenuCtrl.collapsedBooleans[\'explorer\']}" uib-collapse="MenuCtrl.collapsedBooleans[\'explorer\']"><li data-ng-repeat="link in MenuCtrl.menuLinks.models"><a data-ui-sref="strapi.explorer.list({model:link.model})" data-ui-sref-opts="{inherit: false}" data-ui-sref-active="active">{{ link.model | pluralize | humanize | capitalize }}</a></li><li data-ng-if="!MenuCtrl.menuLinks.models.length"><a data-ui-sref-active="active" data-ui-sref="strapi.explorer.home">No model yet</a></li></ul></li><li><a class="parent-link cursor-pointer" ng-class="{active: !MenuCtrl.collapsedBooleans[\'users\']}" ng-click="MenuCtrl.expand(\'users\')"><i class="fa fa-users"></i> <span class="title">Users</span> <span class="fa arrow"></span></a><ul class="nav nav-second-level" ng-class="{open: !MenuCtrl.collapsedBooleans[\'users\']}" uib-collapse="MenuCtrl.collapsedBooleans[\'users\']"><li><a data-ui-sref-active="active" data-ui-sref="strapi.explorer.list({model:\'user\'})">List of users</a></li><li><a data-ui-sref-active="active" data-ui-sref="strapi.explorer.list({model:\'role\'})">Roles</a></li><li><a data-ui-sref-active="active" data-ui-sref="strapi.users.permissions">Permissions</a></li></ul></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/core/services/partials/confirmation-modal.html',
    '<div class="modal-header"><h3 class="modal-title">{{options.title}}</h3></div><div class="modal-body"><p>{{options.content}}</p></div><div class="modal-footer"><button class="btn btn-default" type="button" ng-click="cancel()">Cancel</button> <button class="btn btn-warning" type="button" ng-click="ok()">Yes</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('frontend-templates');
} catch (e) {
  module = angular.module('frontend-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/frontend/strapi/users/permissions/permissions.html',
    '<form novalidate class="permissions"><div class="row"><div class="col-sm-8"><h1 class="page-header">Permissions</h1></div><div class="col-sm-4"><div class="pull-right action-btn-container"><button class="btn btn-default" type="button" data-ng-click="UsersPermissionsCtrl.cancel()">Cancel</button> <button class="btn btn-success" type="button" data-ng-click="UsersPermissionsCtrl.update()">Update</button></div></div></div><div class="row"><div class="col-sm-8 col-sm-offset-4"><ul class="list-inline"><li ng-style="{width: UsersPermissionsCtrl.colWidth}" class="text-center"><strong>Public</strong></li><li ng-style="{width: UsersPermissionsCtrl.colWidth}" class="text-center"><strong>Is Contributor</strong></li><li ng-style="{width: UsersPermissionsCtrl.colWidth}" class="text-center"><strong>Registered</strong></li><li ng-repeat="role in UsersPermissionsCtrl.roles" ng-style="{width: UsersPermissionsCtrl.colWidth}" class="text-center"><strong>{{role.name | capitalize}}</strong></li></ul></div></div><div class="panel-group" role="tablist"><div class="panel" ng-repeat="(key, routes) in UsersPermissionsCtrl.routes | orderBy:route.verb"><div class="panel-heading cursor-pointer" role="tab" ng-click="UsersPermissionsCtrl.collapse(key)"><h4 class="panel-title"><a class="no-border">{{key|capitalize}}</a></h4></div><ul class="list-group" uib-collapse="UsersPermissionsCtrl.collapsedBooleans[key]"><li class="list-group-item" ng-repeat="route in routes"><div class="row"><div class="col-sm-4"><kbd class="{{UsersPermissionsCtrl.getRouteClass(route.verb)}}">{{route.verb | uppercase}}</kbd> <code>{{route.path}}</code></div><div class="col-sm-8"><div class="row"><div ng-style="{width: UsersPermissionsCtrl.colWidth}" class="float-left text-center checkbox-container"><strapi-switch id="isPublic" name="isPublic" ng-model="route.isPublic" class="green"></strapi-switch></div><div ng-style="{width: UsersPermissionsCtrl.colWidth}" class="float-left text-center checkbox-container clearfix"><strapi-switch id="contributorsAuthorized" name="contributorsAuthorized" ng-model="route.contributorsAuthorized" ng-show="!route.isPublic && _.includes(route.policies, \'isAuthorized\')" class="green"></strapi-switch></div><div ng-style="{width: UsersPermissionsCtrl.colWidth}" class="float-left text-center checkbox-container"><strapi-switch ng-model="route.registeredAuthorized" ng-show="!route.isPublic && (!route.contributorsAuthorized || !_.includes(route.policies, \'isAuthorized\')) && (_.includes(route.policies, \'isAuthorized\') || _.includes(route.policies, \'authenticated\'))">class="green"></strapi-switch></div><div ng-style="{width: UsersPermissionsCtrl.colWidth}" class="float-left text-center checkbox-container" ng-repeat="role in UsersPermissionsCtrl.roles"><strapi-switch ng-disabled="UsersPermissionsCtrl.roles.length - 1 === $index" ng-model="route.roles[$index].enabled" class="green"></strapi-switch></div></div></div></div></li></ul></div></div></form>');
}]);
})();
