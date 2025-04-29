// 项目相关api接口
import request from "@/utils/request";

/**
 * 获取所有项目
 */
export function getProject() {
  return request({
    url: "/api/project",
    method: "get",
  });
}

/**
 *添加新项目
 * @param {*} data 新项目的数据
 */
export function addProject(data) {
  return request({
    url: "/api/project",
    method: "post",
    data,
  });
}

/**
 *删除项目
 * @param {*} id 想要删除项目的id
 */
export function delProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: "post",
  });
}

/**
 *修改项目数据 传入一个对象作为参数
 * @param {*} id 想要删除项目的id
 * @param {*} data 新项目的数据
 */
export function editProject({ id, data }) {
  return request({
    url: `/api/project/${id}`,
    method: "put",
    data,
  });
}
