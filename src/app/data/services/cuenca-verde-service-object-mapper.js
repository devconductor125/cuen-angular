"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = require("../model/task");
var procedure_1 = require("../model/procedure");
var token_1 = require("../model/token");
var task_type_1 = require("../model/task-type");
var subtype_1 = require("../model/subtype");
var activity_1 = require("../model/activity");
var CuencaVerdeServiceObjectMapper = (function () {
    function CuencaVerdeServiceObjectMapper() {
    }
    CuencaVerdeServiceObjectMapper.mapTaskToRequest = function (task) {
        if (!task.startdate) {
            task.startdate = '';
        }
        if (!task.deadline) {
            task.deadline = '';
        }
        return {
            title: task.title,
            description: task.description,
            type_id: task.taskType ? task.taskType.id : 0,
            option_date: task.option_date ? 1 : 0,
            startdate: task.startdate,
            deadline: task.deadline,
            user_id: task.user.id,
            proccess_id: task.procedure.id,
            property: task.property,
            comments: task.comments,
            activity: task.activity ? task.activity.id : 0,
            open: task.open
        };
    };
    CuencaVerdeServiceObjectMapper.mapProcedureToRequest = function (procedure) {
        var request = {
            name: procedure.name,
            description: procedure.description,
        };
        var activities = [];
        procedure.activities.forEach(function (activity) {
            activities.push(activity.id);
        });
        request.activities = activities;
        return request;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToProcedure = function (response) {
        var responseObject = response.json();
        return CuencaVerdeServiceObjectMapper.mapProcedureObjects(responseObject);
    };
    CuencaVerdeServiceObjectMapper.mapResponseToProceduresArray = function (response) {
        var proceduresResponse = response.json();
        var result = [];
        proceduresResponse.forEach(function (responseObject) {
            result.push(CuencaVerdeServiceObjectMapper.mapProcedureObjects(responseObject));
        });
        return result;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToActivitiesArray = function (response) {
        var activitiesResponse = response.json();
        var result = [];
        activitiesResponse.forEach(function (responseObject) {
            result.push(CuencaVerdeServiceObjectMapper.mapActivityObjects(responseObject));
        });
        return result;
    };
    CuencaVerdeServiceObjectMapper.mapProcedureObjects = function (responseObject) {
        /*if (responseObject.program ) {
          const program: Program = <Program>{};
          program.id = responseObject.program;
          responseObject.program = program;
        }*/ // TODO Remove this code
        if (responseObject.process && responseObject.process.length > 0) {
            var localProcedure = responseObject.process[0];
            var project = {};
            project.id = localProcedure.id;
            project.name = localProcedure.name;
            responseObject.process = project;
        }
        var programs = [];
        if (responseObject.program) {
            responseObject.program.forEach(function (responseProgram) {
                var program = {};
                program.id = responseProgram;
                programs.push(program);
            });
            responseObject.programs = programs;
        }
        var projects = [];
        if (responseObject.project) {
            responseObject.project.forEach(function (responseProject) {
                var project = {};
                project.id = responseProject;
                projects.push(project);
            });
            responseObject.projects = projects;
        }
        var activities = [];
        if (responseObject.activities) {
            responseObject.activities.forEach(function (responseActivity) {
                var activity = {};
                activity.id = responseActivity;
                activities.push(activity);
            });
            responseObject.activities = activities;
        }
        responseObject.progressBarColor = '#0CEE82';
        var procedure = new procedure_1.Procedure();
        procedure.subTypeStep = responseObject.sub_type_step ? Number(responseObject.sub_type_step) : 1;
        procedure.subTypeTotal = responseObject.sub_type_total;
        Object.assign(procedure, responseObject);
        return procedure;
    };
    CuencaVerdeServiceObjectMapper.mapActivityObjects = function (responseObject) {
        var activity = new activity_1.Activity();
        Object.assign(activity, responseObject);
        return activity;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToTask = function (response) {
        var responseObject = response.json();
        return CuencaVerdeServiceObjectMapper.mapTaskObjects(responseObject);
    };
    CuencaVerdeServiceObjectMapper.mapResponseToTasksArray = function (response) {
        var responseObjects = response.json();
        var tasks = responseObjects;
        tasks.forEach(function (task) {
            task.id = (task.taskType ? String(task.taskType) : '0') === '5' ? String(task.id) + '_carta' : task.id;
            task.route = (task.taskType ? String(task.taskType) : '0') === '5' ? String(task.id) + '_carta' : task.id;
        });
        tasks.forEach(function (task) {
            task.id = (task.task_type_id ? String(task.task_type_id) : '0') === '5' ? String(task.id) + '_carta' : task.id;
            task.route = (task.task_type_id ? String(task.task_type_id) : '0') === '5' ? String(task.id) + '_carta' : task.id;
        });
        tasks.forEach(function (task) {
            task.id = task.open ? String(task.id) + '_open' : task.id;
            task.route = task.open ? String(task.id) + '_open' : task.id;
        });
        tasks.forEach(function (responseObject) {
            CuencaVerdeServiceObjectMapper.mapProcedureObjects(responseObject);
        });
        return tasks;
    };
    CuencaVerdeServiceObjectMapper.mapTaskObjects = function (responseObject) {
        if (responseObject.procedure && !responseObject.procedure.id) {
            var procedure = {};
            procedure.id = responseObject.program;
            responseObject.program = procedure;
        }
        if (responseObject.procedure && !responseObject.procedure.id) {
            var procedure = {};
            procedure.id = responseObject.procedure;
            responseObject.procedure = procedure;
        }
        if (responseObject.process && responseObject.process.id) {
            responseObject.process = responseObject.process.id;
        }
        if (responseObject.type_id) {
            var taskType = {};
            taskType.id = responseObject.type_id;
            taskType.name = responseObject.type_name;
            responseObject.taskType = taskType;
        }
        if (responseObject.task_type_id) {
            var taskType = {};
            taskType.id = responseObject.task_type_id;
            responseObject.taskType = taskType;
        }
        if (responseObject.role && !responseObject.role.id) {
            var role = {};
            role.id = responseObject.role;
            responseObject.role = role;
        }
        if (responseObject.user.role_id) {
            var role = {};
            role.id = responseObject.user.role_id;
            responseObject.role = role;
        }
        if (responseObject.user && !responseObject.user.id) {
            var user = {};
            user.id = responseObject.user;
            responseObject.user = user;
        }
        var taskDetails = {};
        if (responseObject.status) {
            var status_1 = {};
            status_1.id = responseObject.status.id;
            status_1.name = responseObject.status.name;
            taskDetails.status = status_1;
        }
        if (responseObject.type) {
            var type = {};
            type.id = responseObject.type.id;
            type.name = responseObject.type.name;
            taskDetails.type = type;
        }
        if (responseObject.process) {
            var process_1 = {};
            process_1.id = responseObject.process.id;
            process_1.name = responseObject.process.name;
            process_1.description = responseObject.process.description;
            taskDetails.process = process_1;
        }
        if (responseObject.activity) {
            var activity = {};
            activity.id = responseObject.activity.id;
            activity.name = responseObject.activity.name;
            taskDetails.activity = activity;
        }
        if (responseObject.project) {
            var project = {};
            project.id = responseObject.project.id;
            project.name = responseObject.project.name;
            taskDetails.project = project;
        }
        if (responseObject.program) {
            var program = {};
            program.id = responseObject.program.id;
            program.name = responseObject.program.name;
            taskDetails.project = program;
        }
        if (responseObject.user) {
            var user = {};
            user.id = responseObject.user.id;
            user.name = responseObject.user.name;
            user.email = responseObject.user.name;
            taskDetails.user = user;
        }
        if (responseObject.role) {
            var role = {};
            role.id = responseObject.role.id;
            role.name = responseObject.role.name;
            taskDetails.role = role;
        }
        responseObject.details = taskDetails;
        var subType = new subtype_1.Subtype();
        Object.assign(subType, responseObject.sub_type);
        var task = new task_1.Task();
        Object.assign(task, responseObject);
        if (!responseObject.taskType) {
            var taskType = new task_type_1.TaskType();
            taskType.id = responseObject.task_type_id;
            task.taskType = taskType;
        }
        if (responseObject.type) {
            var taskType = new task_type_1.TaskType();
            taskType.id = responseObject.type.id;
            task.type = taskType;
        }
        task.sub_type = subType;
        return task;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToToken = function (response) {
        var token = new token_1.Token();
        Object.assign(token, response.json());
        return token;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToTaskType = function (response) {
        var taskType = new task_type_1.TaskType();
        Object.assign(taskType, response);
        return taskType;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToTaskTypes = function (response) {
        var taskTypes = [];
        var responseObjects = response.json();
        responseObjects.forEach(function (responseObject) {
            taskTypes.push(CuencaVerdeServiceObjectMapper.mapResponseToTaskType(responseObject));
        });
        return taskTypes;
    };
    CuencaVerdeServiceObjectMapper.mapPoolOfContractsToRequest = function (poolOfContracts) {
        return {
            id: poolOfContracts.id,
            name: poolOfContracts.name,
            process: CuencaVerdeServiceObjectMapper.mapPoolActionsListToRequest(poolOfContracts.pool_by_process)
        };
    };
    CuencaVerdeServiceObjectMapper.mapPoolActionsListToRequest = function (actions) {
        var result = {};
        actions.forEach(function (poolOfContractsAction) {
            if (!result[poolOfContractsAction.process_id]) {
                result[poolOfContractsAction.process_id] = [];
            }
            result[poolOfContractsAction.process_id].push(poolOfContractsAction.budget_id);
        });
        return result;
    };
    CuencaVerdeServiceObjectMapper.mapContractsListToRequest = function (contracts) {
        var result = [];
        contracts.forEach(function (contratista) {
            if (contratista.contractor.length > 0) {
                var contractor = {};
                var user = {};
                Object.assign(user, contratista);
                Object.assign(contractor, contratista.contractor[0]);
                contractor.user = user;
                result.push(contractor);
            }
        });
        return result;
    };
    CuencaVerdeServiceObjectMapper.mapResponseToContractor = function (response) {
        var responseObject = response.json();
        return CuencaVerdeServiceObjectMapper.mapContractorObjects(responseObject);
    };
    CuencaVerdeServiceObjectMapper.mapResponseToContractsArray = function (response) {
        var proceduresResponse = response.json();
        var result = [];
        proceduresResponse.forEach(function (responseObject) {
            result.push(CuencaVerdeServiceObjectMapper.mapContractorObjects(responseObject));
        });
        return result;
    };
    CuencaVerdeServiceObjectMapper.mapContractorObjects = function (responseObject) {
        var contractor = {};
        var user = {};
        Object.assign(user, responseObject);
        Object.assign(contractor, responseObject.contractor[0]);
        contractor.user = user;
        contractor.contract_modality = String(responseObject.contractor[0].contract_modality_id);
        contractor.type_contract = String(responseObject.contractor[0].type_contract_id);
        contractor.categories = responseObject.categories;
        return contractor;
    };
    return CuencaVerdeServiceObjectMapper;
}());
exports.CuencaVerdeServiceObjectMapper = CuencaVerdeServiceObjectMapper;
//# sourceMappingURL=cuenca-verde-service-object-mapper.js.map