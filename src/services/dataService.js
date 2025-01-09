
import users from "../data/user.json"
import works from "../data/job.json"
import axios from 'axios';

class DataService {
    constructor() {
        this.baseURL = 'http://localhost:8000';
    }

    setAuthHeader(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    login(data) {
        return axios.post(`${this.baseURL}/auth/login/`, data);
    }

    register(data) {
        return axios.post(`${this.baseURL}/auth/registration/`, data);
    }
}

export default new DataService();

export const getTableData = (user, isDone) => {
    if (!user || !users || !works) {
        return;
    }

    const allData = [];
    user.worksIds.map(workId => {
        const data = {};
        const currWork = works.find(w => w.id === workId);
        if (isDone && currWork.endDate !== 0 || !isDone && currWork.endDate == 0)

            if (currWork && (!isDone && currWork.endDate === 0 || isDone && currWork.endDate !== 0)) {
                const otherUserId = user.isManager ? currWork.contractorId : currWork.directorId;

                const otherUser = users.find(u => u.id === otherUserId)

                data.id = currWork.id;
                data.isManager = user.isManager;
                data.workNumber = currWork.workNumber;
                data.classification = currWork.classification;
                data.startDate = _getDate(currWork.startDate);
                data.dueEndDate = _getDate(currWork.dueEndDate);
                data.endDate = _getDate(currWork.endDate);
                data.status = currWork.status;
                data.name = otherUser.name;
                data.phoneNum = otherUser.phoneNum;
                data.contractorRank = otherUser.contractorRank;
                data.facilityNum = currWork.facilityNum
                data.locationName = currWork.locationName
                data.sections = currWork.sections;


                if (!allData.includes(d => d.id === data.id)) {
                    allData.push(data);

                }
            }

    });

    return allData;
}

export const getActiveWorkCount = (user) => {
    return works.reduce((count, currWork) => {
        if (user.worksIds.includes(currWork.id))
            return count + 1
        return count
    }, 0)
}

const _getDate = (timeStamp) => {
    if (timeStamp === 0)
        return null
    const date = new Date(timeStamp);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
}
