import request from "@/utils/request.js";

/**
 * 分页获取评论
 * @param {number} [page=1] 获取的页码
 * @param {number} [limit=10] 每页获取条数
 * @param {string} [keyword=""] 关键词
 */
export function getComments(page = 1, limit = 10, keyword = "") {
  return request({
    url: `/api/message`,
    method: "get",
    params: {
      page,
      limit,
      keyword,
    },
  });
}
/**
 * 删除评论
 * @param {*} id
 */
export function delComment(id) {
  return request({
    url: `/api/message/${id}`,
    method: "delete",
  });
}
