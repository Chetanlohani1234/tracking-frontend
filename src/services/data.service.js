import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL =
  process.env.NODE_ENV != "production"
    ?
     "https://tracking-backend-ull9.onrender.com/"
    : "https://tracking-backend-ull9.onrender.com";

      //"https://trackingtime-c5jw.onrender.com/"
    //: "https://trackingtime-c5jw.onrender.com/";

axios.interceptors.request.use(function (config) {
  const token = AuthService.getCurrentUserTokken();
  config.headers.Authorization = "Bearer " + token;

  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);
const addUser = (data) => {
  return axios.post(API_URL + "api/consumer/data",data );
};
const getAllUsers = () => {
  return axios.get(API_URL + `api/consumer/Alldata`);
};
const getUserDetailById = (id) => {
  return axios.get(API_URL + `api/consumer/GetDatabyID/${id}`);
};
const updateUser = (id, data) => {
  return axios.post(API_URL + `api/consumer/UpdatebyID/${id}`, data);
};
const addItem = (formData) => {
  return axios.post(API_URL + "api/item/add",formData );
};
const getAllItems = () => {
  return axios.get(API_URL + `api/item/getAll`);
};
const deleteItem = (id) => {
  return axios.delete(API_URL + `api/item/delete/${id}`);
}

const deleteUser = (id) => {
  return axios.delete(API_URL + `api/consumer/delete/${id}`);
};

const addSupplier = (data) => {
  return axios.post(API_URL + "api/supplier/add",data );
};
const getAllSupplier = () => {
  return axios.get(API_URL + `api/supplier/getAll`);
};
const deleteSupplier = (id) => {
  return axios.delete(API_URL + `api/supplier/delete/${id}`);
};

const addCategory = (data) => {
  return axios.post(API_URL + "api/category/add",data );
};

const getCategory = (type) => {
  return axios.get(API_URL + `api/category/getAllCategories?type=${type}`)
}

const getCategoryById = (id) => {
  return axios.get(API_URL + `api/category/getById/${id}`);
};

const updateCategory = (id, data) => {
  return axios.put(API_URL + `api/category/updateById/${id}`, data);
};

const deleteCategory = (id) => {
  return axios.delete(API_URL + `api/category/delete/${id}`);
};


const addProject = (data) => {
  return axios.post(API_URL + "api/project/addProject", data);
};

const getAllProject = () => {
  return axios.get(API_URL + "api/project/getAllProject");
};
const getLeaveRole = () => {
  return axios.get(API_URL + "api/leave/getApprovelRoleOnly");
};
const updateApproveRole = (data) => {
  return axios.put(API_URL + "api/leave/approve/", data);
};
const getHolidayRole = () => {
  return axios.get(API_URL + "api/holiday/getApprovelRoleOnly");
};
const updateHolidayRole = (data) => {
  return axios.put(API_URL + "api/holiday/updateRole/", data);
};
const getUserRole = () => {
  return axios.get(API_URL + "api/user/getApprovelRoleOnly");
};
const updateUserRole = (data) => {
  return axios.put(API_URL + "api/user/userRoleManagement/", data);
};
const getExpenseRole = () => {
  return axios.get(API_URL + "api/expense/getApprovelRoleOnly");
};
const updateExpenseRole = (data) => {
  return axios.put(API_URL + "api/expense/expenseRole/", data);
};
const getTeamRole = () => {
  return axios.get(API_URL + "api/team/getApprovelRoleOnly");
};
const updateTeamRole = (data) => {
  return axios.put(API_URL + "api/team/teamRoleManagement/", data);
};
const getAllLeave = () => {
  return axios.get(API_URL + "api/leave/getAllLeaves");
};
const getAllLeaveById = (id) => {
  return axios.get(API_URL + "api/leave/singleLeave/" + id);
};
const updateLeaveStatus = (data, id, userId) => {
  return axios.put(`${API_URL}api/leave/update/${id}/${userId}`, data);
};
const deleteLeave = (id) => {
  return axios.delete(API_URL + "api/leave/delete/" + id);
};
const addHoliday = (data, id) => {
  return axios.post(API_URL + "api/holiday/create/" + id, data);
};
const getAllHoliday = () => {
  return axios.get(API_URL + "api/holiday/get");
};
const getHolidayById = (id) => {
  return axios.get(API_URL + "api/holiday/getHolidayById/" + id);
};
const updateHolidayById = (data, id, userId) => {
  return axios.put(`${API_URL}api/holiday/update/${id}/${userId}`, data);
};
const deleteHoliday = (id) => {
  return axios.delete(API_URL + "api/holiday/delete/" + id);
};
const getAllAttendence = () => {
  return axios.get(API_URL + "api/Attendence/getAllAttendence");
};
const getSingleAttendenceById = (id) => {
  return axios.get(API_URL + "api/Attendence/getAttendenceByUserId/" + id);
};
const getAllExpense = () => {
  return axios.get(API_URL + "api/expense/getAll");
};
const addExpense = (data, id) => {
  return axios.post(`${API_URL}api/expense/addExpense/${id}`, data);
};
const getExpenseById = (id) => {
  return axios.get(API_URL + "api/expense/getById/" + id);
};
const updateExpenseById = (data, id, userId) => {
  return axios.put(
    API_URL + "api/expense/updateExpense/" + id + "/" + userId,
    data
  );
};
const deleteExpense = (id) => {
  return axios.delete(API_URL + "api/expense/deleteExpense/" + id);
};
const getAllTeam = () => {
  return axios.get(API_URL + "api/team/getAllTeam");
};
const getAllTeamByProjectId = (id) => {
  return axios.get(API_URL + "api/team/getAllTeamVyProjectId/" + id);
};
const getTeamById = (id) => {
  return axios.get(API_URL + "api/team/getTeamById/" + id);
};
const getPerformaceById = (id) => {
  return axios.get(API_URL + "api/team/calculateTeamPerformance/" + id);
};
const getAllUserONly = () => {
  return axios.get(API_URL + "api/user/getOnlyUser");
};
const updateTeamById = (data, id) => {
  return axios.put(API_URL + "api/team/updateTeam/" + id, data);
};
const getAllTeamLeader = () => {
  return axios.get(API_URL + "api/user/getOnlyTL");
};
const getSinglePojectById = (id) => {
  return axios.get(API_URL + "api/project/getProjectById/" + id);
};
const updatePrjectById = (data, id) => {
  return axios.put(API_URL + "api/project/projectPerformance/" + id, data);
};

const deleteProject = (id) => {
  return axios.delete(API_URL + "api/project/deleteProject/" + id);
};
const getTeamTaskById = (id) => {
  return axios.get(API_URL + "api/task/getTeamTaskById/" + id);
};
const getTeamSingleTaskById = (id) => {
  return axios.get(API_URL + "api/task/getSingleTeamTaskById/" + id);
};
const updateTeamTask = (id, data) => {
  return axios.put(API_URL + "api/task/teamTaskUpdate/" + id, data);
};
const deletTeamTask = (id) => {
  return axios.delete(API_URL + "api/task/deleteTeamTask/" + id);
};
const addTeam = (data, id, userId) => {
  return axios.post(`${API_URL}api/team/addTeam/${id}/${userId}`, data);
};
const deleteTeam = (id) => {
  return axios.delete(API_URL + "api/team/deleteTeam/" + id);
};
const addNewMember = (data) => {
  return axios.put(API_URL + "api/team/findTeamAndAddToMember", data);
};

const deleteMember = (id, userId) => {
  return axios.delete(
    API_URL + "api/team/deleteTeamMembers/" + id + "/" + userId
  );
};
const addTeamTask = (data) => {
  return axios.post(API_URL + "api/task/teamTask", data);
};
const getTaskDetailEmployeeById = (id) => {
  return axios.get(API_URL + "api/task/taskGetByUserId/" + id);
};
const addTask = (data, id) => {
  return axios.post(`${API_URL}api/task/addTask/${id}`, data);
};
const deletetaskByid = (id) => {
  return axios.delete(API_URL + "api/task/taskDelete/" + id);
};
const getSingleTaskById = (id) => {
  return axios.get(API_URL + "api/task/getById/" + id);
};
const updateSingleTask = (id, data) => {
  return axios.put(
    API_URL + "api/task/taskRequestStatusUpdateByTL/" + id,
    data
  );
};
const getPerformaceEmpById = (id) => {
  return axios.get(API_URL + "api/user/getPerformance/" + id);
};

const changePassword = (id, data) => {
  return axios.post(API_URL + `api/user/changePassword/${id}`, data);
};
// const getNotiFication = () => {
//   return axios.get(API_URL + "api/notification/getAllNotificationOfAdmin");
// };

const updateNotification = (data, id) => {
  return axios.put(API_URL + "api/notification/updateNotification/" + id, data);
};
const deleteNotification = (id) => {
  return axios.delete(API_URL + "api/notification/deleteNotification/" + id);
};
const getChat = (id) => {
  return axios.get(`${API_URL}api/chat/chatted?userId=${id}`);
};

const getSingleChat = (id, userId) => {
  return axios.get(
    `${API_URL}api/chat/getChat?senderId=${id}&receiverId=${userId}`
  );
};

const getGroupMessages = (id) => {
  return axios.get(`${API_URL}api/chat/group?roomId=${id}`);
};

const getAllUserChat = () => {
  return axios.get(API_URL + "api/user/getAllUserForChat");
};

const addGroup = (data) => {
  return axios.post(API_URL + `api/group/create`, data);
};
const getAllGroup = () => {
  return axios.get(API_URL + "api/group/getGroup");
};
const getChatNotiFication = (id) => {
  return axios.get(API_URL + "api/notification/getChatNotification/" + id);
};
const singleTaskAdd = (data) => {
  return axios.post(API_URL + `api/task/addTasks`, data);
};
const singleAllTasks = () => {
  return axios.get(API_URL + "api/task/getAllTaskForOnlyUser");
};
const getSimpleTaskById = (id) => {
  return axios.get(API_URL + "api/task/getTaskForOnlyUser/" + id);
};
const updateSimpleTaskById = (id) => {
  return axios.put(API_URL + "api/task/userTaskUpdate/" + id);
};
const deleteSimpleTaskById = (id) => {
  return axios.delete(API_URL + "api/task/deleteTaskForOnlyUser/" + id);
};
const sendEmail = (data) => {
  return axios.post(API_URL + "api/email/send-bulk-email", data);
};
const uploadFile = (data) => {
  return axios.post(API_URL + "api/chat/upluadFile", data);
};

const getGroupById = (id) => {
  return axios.get(`${API_URL}api/chat/getGroupById/${id}`);
};
const addGroupMember = (data) => {
  return axios.post(API_URL + "api/group/addMember", data);
};
const removeGroupMember = (data) => {
  return axios.post(API_URL + "api/group/removeMember", data);
};

const deleteGroup = (id) => {
  return axios.delete(API_URL + "api/chat/deleteGroup/" + id);
};
const emailSendFile = (data) => {
  return axios.post(API_URL + "api/email/send-emails", data);
};
const emailSendTeam = (data) => {
  return axios.post(API_URL + "api/email/sendMailTeamMembers", data);
};
const addNewTeam = (data) => {
  return axios.post(API_URL + "api/team/team", data);
};

const DataService = {
  addUser,
  getAllUsers,
  getUserDetailById,
  updateUser,
  deleteUser,
  addItem,
  getAllItems,
  deleteItem,
  addSupplier,
  getAllSupplier,
  deleteSupplier,
  addCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,




  addProject,
  getAllProject,
  getLeaveRole,
  updateApproveRole,
  getHolidayRole,
  updateHolidayRole,
  getUserRole,
  updateUserRole,
  getExpenseRole,
  updateExpenseRole,
  getTeamRole,
  updateTeamRole,
  getAllLeave,
  getAllLeaveById,
  updateLeaveStatus,
  deleteLeave,
  addHoliday,
  getAllHoliday,
  getHolidayById,
  updateHolidayById,
  deleteHoliday,
  getAllAttendence,
  getSingleAttendenceById,
  getAllExpense,
  addExpense,
  getExpenseById,
  updateExpenseById,
  deleteExpense,
  getAllTeam,
  getAllTeamByProjectId,
  getTeamById,
  getPerformaceById,
  getAllUserONly,
  updateTeamById,
  getAllTeamLeader,
  getSinglePojectById,
  updatePrjectById,
  deleteProject,
  getTeamTaskById,
  getTeamSingleTaskById,
  updateTeamTask,
  deletTeamTask,
  addTeam,
  deleteTeam,
  addNewMember,
  deleteMember,
  addTeamTask,
  getTaskDetailEmployeeById,
  addTask,
  deletetaskByid,
  getSingleTaskById,
  updateSingleTask,
  getPerformaceEmpById,
  changePassword,
  //getNotiFication,
  updateNotification,
  deleteNotification,
  getChat,
  getSingleChat,
  getGroupMessages,
  getAllUserChat,
  addGroup,
  getAllGroup,
  getChatNotiFication,
  singleTaskAdd,
  singleAllTasks,
  getSimpleTaskById,
  updateSimpleTaskById,
  deleteSimpleTaskById,
  sendEmail,
  uploadFile,
  getGroupById,
  addGroupMember,
  removeGroupMember,
  deleteGroup,
  emailSendFile,
  emailSendTeam,
  addNewTeam,
};

export default DataService;
