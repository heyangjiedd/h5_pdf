import request from '@/assets/js/request';
import axios from 'axios';
import { merge } from 'lodash';

const state = {
    user:'',
	year:'',
	edit:false,
};

const mutations = {
  SET_USER(state,data){
	state.user = data
  },
	SET_YEAR(state,data){
    state.year = data
  },
	SET_EDIT(state,data){
    state.edit = data
  },
};

const actions = {
	/** 获取信息 **/
	getUserInfo({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('information',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 获取年份 **/
	getYear({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/new/year',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 获取品行美 **/
	getPXM({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/conduct',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 获取智识美 **/
	getZSM({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/knowledge',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 获取身心美 **/
	getSXM({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/bodymind',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 获取才艺美 **/
	getCYM({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/talentbeauty',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 获取创行美 **/
	getCXM({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/createbeauty',{params:data}).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 上传信息 **/
	submitData({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.post('updateInfo',data).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 上传图片 **/
	postFile({ state, commit }, data){
		return new Promise((resolve, reject) => {
			axios.post('http://api.edu2tech.cn/file/upload/picture',data).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
	/** 查询是否能更改 **/
	isExit({ state, commit }, data){
		return new Promise((resolve, reject) => {
			request.get('query/isExit',data).then(response=>{
				resolve(response)
			}).catch(error => {
				reject(error)
			});
		})
	},
};

export default merge({
  namespaced: true,
  state,
  mutations,
  actions
})


