import {Program} from '../model/program';
import {Task} from '../model/task';
import {Procedure} from '../model/procedure';
import {User} from '../model/user';
import {TaskDetailObject} from '../model/task-details-object';
import {TaskDetails} from '../model/task-details';
import {Token} from '../model/token';
import {TaskType} from '../model/task-type';
import {Subtype} from '../model/subtype';
import {PoolOfContracts} from '../model/pool-of-contracts';
import {Contractor} from '../model/contractor';
import {PoolOfContractsAction} from '../model/pool-of-contracts-action';
import {Project} from '../model/project';
import {Activity} from '../model/activity';
import {PoolOfContractsOpenTask} from '../model/pool-of-contracts-open-task';
import {Budget} from '../model/budget';
import {SpecialTask} from '../model/specialTask';
import Role = roleInterface.Role;

export class CuencaVerdeServiceObjectMapper {
  static mapTaskToRequest(task: Task, users: any, speciesList: any): any {
    if (!task.startdate) {
      task.startdate = '';
    }
    if (!task.deadline) {
      task.deadline = '';
    }

    if (task.procedure.type_process === 'gestion' && task.open) {
      task.special = true;
    }

    const request: any = {
      title: task.title,
      description: task.description,
      type_id: task.taskType ? task.taskType.id : 0,
      option_date: task.option_date ? 1 : 0,
      startdate: task.startdate,
      deadline: task.deadline,
      user_id: users,
      proccess_id: task.procedure.id,
      property: task.property,
      comments: task.comments,
      activity: task.activity ? task.activity.id : 0,
      open: task.open,
      special: task.special,
      budgetOpen: task.budgetOpen,
      type_process: task.procedure.type_process,
      type_comunication: task.procedure.type_comunication
    };

    const budgetOpenSpecies: Array<any> = [];
    if (speciesList != null && speciesList.length > 0) {
      speciesList.forEach(function (specie: any) {
        if (specie.selected) {
          budgetOpenSpecies.push({
            contributions_id: specie.contributions_id,
            id: specie.id,
            quantity: specie.newBalance,
            contribution_type: 2
          });
        }
      });
      request.budgetOpenSpecies = budgetOpenSpecies;
      request.budgetOpen = [];
      request.budgetOpen.value_month = 0;
    } else {
      request.budgetOpenSpecies = [];
    }
    return request;
  }

  static mapProcedureToRequest(procedure: Procedure): any {
    const potentialPropertyId = procedure.property ? (procedure.property.id === 'Sin predio') ? null : procedure.property.id : null;
    const request: any = {
      name: procedure.name,
      description: procedure.description,
      potential_property_id: potentialPropertyId,
      type_process: procedure.type_process,
      nest_procedure: procedure.nest_procedure,
      parent_procedure: procedure.parent_procedure
    };
    const activities: Array<Number> = [];
    procedure.activities.forEach(function (activity) {
      activities.push(activity.id);
    });
    request.activities = activities;
    if (procedure.property && request.type_process === '0' && procedure.property) {
      request.type_process = 'gestion';
    } else if (request.type_process === '0') {
      request.type_process = 'abierta';
    }
    if (procedure.property && procedure.property.property_psa === 1) {
      request.type_process = 'psa';
    }
    return request;
  }

  static mapResponseToProcedure(response: any): Procedure {
    const responseObject = response.json();
    return CuencaVerdeServiceObjectMapper.mapProcedureObjects(responseObject);
  }

  static mapFilteredProceduresResponseToProceduresArray(response: any): Array<Procedure> {
    const result: Array<Procedure> = [];
    try {
      const proceduresResponse = response.json();
      proceduresResponse.forEach(function (responseObject: any) {
        const procedure: Procedure = <Procedure>{};
        procedure.id = responseObject.id;
        procedure.name = responseObject.name;
        result.push(procedure);
      });
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  static mapResponseToProceduresArray(response: any): Array<Procedure> {
    const result: Array<Procedure> = [];
    try {
      const proceduresResponse = response.json();
      proceduresResponse.forEach(function (responseObject: any) {
        result.push(CuencaVerdeServiceObjectMapper.mapProcedureObjects(responseObject));
      });
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  static mapResponseToActivitiesArray(response: any): Array<Activity> {
    const activitiesResponse = response.json();
    const result: Array<Activity> = [];
    activitiesResponse.forEach(function (responseObject: any) {
      result.push(CuencaVerdeServiceObjectMapper.mapActivityObjects(responseObject));
    });
    return result;
  }

  private static mapProcedureObjects(responseObject: any): Procedure {
    if (responseObject.process && responseObject.process.length > 0) {
      const localProcedure = responseObject.process[0];
      const project: Project = <Project>{};
      project.id = localProcedure.id;
      project.name = localProcedure.name;
      responseObject.procedure = project;
    }

    const programs: Array<Program> = [];
    if (responseObject.program) {
      responseObject.program.forEach(function (responseProgram: string) {
        const program: Program = <Program>{};
        program.id = responseProgram;
        programs.push(program);
      });
      responseObject.programs = programs;
    }

    const projects: Array<Project> = [];
    if (responseObject.project) {
      responseObject.project.forEach(function (responseProject: number) {
        const project: Project = <Project>{};
        project.id = responseProject;
        projects.push(project);
      });
      responseObject.projects = projects;
    }

    const activities: Array<Activity> = [];
    if (responseObject.activities) {
      responseObject.activities.forEach(function (responseActivity: number) {
        const activity: Activity = <Activity>{};
        activity.id = responseActivity;
        activities.push(activity);
      });
      responseObject.activities = activities;
    }
    responseObject.progressBarColor = '#0CEE82';
    const procedure = new Procedure();
    procedure.subTypeStep = responseObject.sub_type_step ? Number(responseObject.sub_type_step) : 1;
    procedure.subTypeTotal = responseObject.sub_type_total;
    Object.assign(procedure, responseObject);
    return procedure;
  }

  private static mapActivityObjects(responseObject: any): Activity {
    const activity = new Activity();
    Object.assign(activity, responseObject);
    return activity;
  }

  static mapResponseToTask(response: any): Task {
    const responseObject = response.json();
    return CuencaVerdeServiceObjectMapper.mapTaskObjects(responseObject);
  }

  static mapResponseToTasksArray(response: any): Array<Task> {
    const responseObjects = response.json();
    const tasks: Array<Task> = <Array<Task>> responseObjects;
    tasks.forEach(function (task: Task) {
      task.id = task.open ? String(task.id) + '_open' : task.id;
      task.route = task.open ? String(task.id) + '_open' : task.id;
    });
    tasks.forEach(function (responseObject: any) {
      CuencaVerdeServiceObjectMapper.mapProcedureObjects(responseObject);
    });
    return tasks;
  }

  private static mapTaskObjects(responseObject: any): Task {
    /*if (responseObject.procedure && !responseObject.procedure.id) {
      const procedure: Procedure = <Procedure>{};
      procedure.id = responseObject.program;
      responseObject.program = procedure;
    }

    if (responseObject.procedure && !responseObject.procedure.id) {
      const procedure: Procedure = <Procedure>{};
      procedure.id = responseObject.procedure;
      responseObject.procedure = procedure;
    }*/

    if (responseObject.process && responseObject.process.id) {
      // responseObject.process = responseObject.process.id;
      responseObject.process = responseObject.process;
    }

    if (responseObject.type_id) {
      const taskType: TaskType = <TaskType>{};
      taskType.id = responseObject.type_id;
      taskType.name = responseObject.type_name;
      responseObject.taskType = taskType;
    }

    if (responseObject.task_type_id) {
      const taskType: TaskType = <TaskType>{};
      taskType.id = responseObject.task_type_id;
      responseObject.taskType = taskType;
    }

    if (responseObject.role && !responseObject.role.id) {
      const role: Role = <Role>{};
      role.id = responseObject.role;
      responseObject.role = role;
    }

    if (responseObject.user && responseObject.user.role_id) {
      const role: Role = <Role>{};
      role.id = responseObject.user.role_id;
      responseObject.role = role;
    }

    if (responseObject.user && !responseObject.user.id) {
      const user: User = <User>{};
      user.id = responseObject.user;
      responseObject.user = user;
    }

    const taskDetails: TaskDetails = <TaskDetails>{};

    if (responseObject.status) {
      const status: TaskDetailObject = <TaskDetailObject>{};
      status.id = responseObject.status.id;
      status.name = responseObject.status.name;
      taskDetails.status = status;
    }

    if (responseObject.type) {
      const type: TaskDetailObject = <TaskDetailObject>{};
      type.id = responseObject.type.id;
      type.name = responseObject.type.name;
      taskDetails.type = type;
    }

    if (responseObject.process) {
      const process: TaskDetailObject = <TaskDetailObject>{};
      process.id = responseObject.process.id;
      process.name = responseObject.process.name;
      process.description = responseObject.process.description;
      taskDetails.process = process;
    }

    if (responseObject.activity) {
      const activity: TaskDetailObject = <TaskDetailObject>{};
      activity.id = responseObject.activity.id;
      activity.name = responseObject.activity.name;
      taskDetails.activity = activity;
    }

    if (responseObject.project) {
      const project: TaskDetailObject = <TaskDetailObject>{};
      project.id = responseObject.project.id;
      project.name = responseObject.project.name;
      taskDetails.project = project;
    }

    if (responseObject.program) {
      const program: TaskDetailObject = <TaskDetailObject>{};
      program.id = responseObject.program.id;
      program.name = responseObject.program.name;
      taskDetails.project = program;
    }

    if (responseObject.user) {
      const user: TaskDetailObject = <TaskDetailObject>{};
      user.id = responseObject.user.id;
      user.name = responseObject.user.name;
      user.email = responseObject.user.name;
      taskDetails.user = user;
    }

    if (responseObject.role) {
      const role: TaskDetailObject = <TaskDetailObject>{};
      role.id = responseObject.role.id;
      role.name = responseObject.role.name;
      taskDetails.role = role;
    }

    responseObject.details = taskDetails;

    const subType = new Subtype();
    Object.assign(subType, responseObject.sub_type);

    const task = new Task();
    Object.assign(task, responseObject);

    if (!responseObject.taskType) {
      const taskType = new TaskType();
      taskType.id = responseObject.task_type_id;
      task.taskType = taskType;
    }

    if (responseObject.type) {
      const taskType = new TaskType();
      taskType.id = responseObject.type.id;
      task.type = taskType;
    }

    task.sub_type = subType;
    return task;
  }

  static mapResponseToToken(response: any): Token {
    const token = new Token();
    Object.assign(token, response.json());
    return token;
  }

  static mapResponseToTaskType(response: any): TaskType {
    const taskType = new TaskType();
    Object.assign(taskType, response);
    return taskType;
  }

  static mapResponseToTaskTypes(response: any): Array<TaskType> {
    const taskTypes: Array<TaskType> = [];
    const responseObjects = response.json();
    responseObjects.forEach(function (responseObject: any) {
      taskTypes.push(CuencaVerdeServiceObjectMapper.mapResponseToTaskType(responseObject));
    });
    return taskTypes;
  }

  static mapPoolOfContractsToRequest(poolOfContracts: PoolOfContracts) {
    return {
      id: poolOfContracts.id,
      name: poolOfContracts.name,
      contract_type: poolOfContracts.contract_id,
      process: CuencaVerdeServiceObjectMapper.mapPoolActionsListToRequest(poolOfContracts.pool_by_process),
      task_proces: CuencaVerdeServiceObjectMapper.mapPoolOpenTaskListToRequest(poolOfContracts.task_open)
    };
  }

  static mapProceduresToAddPoolActionsRequest(poolId: any, processes: Array<Procedure>) {
    return {
      pool_id: poolId,
      process: this.mapProcedureBudgetToRequest(processes),
      task_proces: this.mapProcedureOpenTasksToRequest(processes)
    };
  }

  static mapProcedureBudgetToRequest(procedures: Array<Procedure>): object {
    const result: object = {};
    procedures.forEach(function (procedure: Procedure) {
      procedure.budget.forEach(function (budget: Budget) {
        if (budget.selected) {
          if (!result[procedure.id]) {
            result[procedure.id] = [];
          }
          result[procedure.id].push(budget.id);
        }
      });
    });
    return result;
  }

  static mapProcedureOpenTasksToRequest(procedures: Array<Procedure>): object {
    const result: object = {};
    procedures.forEach(function (procedure: Procedure) {
      procedure.task_opens.forEach(function (task: SpecialTask) {
        if (task.selected) {
          if (!result[procedure.id]) {
            result[procedure.id] = [];
          }
          result[procedure.id].push(task.id);
        }
      });
    });
    return result;
  }

  static mapPoolActionsListToRequest(actions: Array<PoolOfContractsAction>): object {
    const result: object = {};
    actions.forEach(function (poolOfContractsAction: PoolOfContractsAction) {
      if (!result[poolOfContractsAction.process_id]) {
        result[poolOfContractsAction.process_id] = [];
      }
      result[poolOfContractsAction.process_id].push(poolOfContractsAction.budget_id);
    });
    return result;
  }

  static mapPoolOpenTaskListToRequest(openTasks: Array<PoolOfContractsOpenTask>): object {
    const result: object = {};
    openTasks.forEach(function (poolOfContractsOpenTask: PoolOfContractsOpenTask) {
      if (!result[poolOfContractsOpenTask.process_id]) {
        result[poolOfContractsOpenTask.process_id] = [];
      }
      result[poolOfContractsOpenTask.process_id].push(poolOfContractsOpenTask.task_open_id);
    });
    return result;
  }

  static mapContractsListToRequest(contracts: Array<any>) {
    const result: Array<Contractor> = [];
    contracts.forEach(function (contratista: any) {
      if (contratista.contractor.length > 0) {
        const contractor: Contractor = <Contractor> {};
        const user: User = <User>{};
        Object.assign(user, contratista);
        Object.assign(contractor, contratista.contractor[0]);
        contractor.user = user;
        result.push(contractor);
      }
    });
    return result;
  }

  static mapResponseToContractor(response: any): Contractor {
    const responseObject = response.json();
    return CuencaVerdeServiceObjectMapper.mapContractorObjects(responseObject);
  }

  static mapResponseToContractsArray(response: any): Array<Contractor> {
    const proceduresResponse = response.json();
    const result: Array<Contractor> = [];
    proceduresResponse.forEach(function (responseObject: any) {
      result.push(CuencaVerdeServiceObjectMapper.mapContractorObjects(responseObject));
    });
    return result;
  }

  static mapContractorObjects(responseObject: any): Contractor {
    const contractor: Contractor = <Contractor>{};
    const user: User = <User>{};
    Object.assign(user, responseObject);
    Object.assign(contractor, responseObject.contractor[0]);
    contractor.user = user;
    contractor.contract_modality = String(responseObject.contractor[0].contract_modality_id);
    contractor.type_contract = String(responseObject.contractor[0].type_contract_id);
    contractor.categories = responseObject.categories;
    return contractor;
  }
}
