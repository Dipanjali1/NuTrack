const ITEMS = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=";
// Localhost =>
// const USERS = "http://localhost:3001/api/v1/";
// const REPORTS = "http://localhost:3001/nutrition_reports/";
// Heroku =>
const USERS = "https://nutrack-api.herokuapp.com/api/v1/";
const REPORTS = "https://nutrack-api.herokuapp.com/nutrition_reports/";

const fetchReq = {
    // Account Component Fetch
    updateBMR: async (token, bmr) => {
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({user:{
                bmr: parseFloat(bmr),
            }})
        };
        return await fetch(`${USERS}update-profile`, reqObj)
        .then(resp => resp.json())
    },
    updateProfile: async (token, newPw, newNm, newEm) => {
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({user:{
                password: newPw,
                name: newNm,
                email: newEm
            }})
        };
        return await fetch(`${USERS}update-profile`, reqObj)
        .then(resp => resp.json())
    },
    deleteAccount: async (token, username) => {
        const reqObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({user:{ username: username }})
        };
        return await fetch(`${USERS}delete-account`, reqObj)
        .then(resp => resp.json())
    },
    // App Component Fetch
    getUserInfo: async (token) => {
        const reqObj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await fetch(`${USERS}profile`, reqObj)
        .then(res => res.json())
    },
    // Nutrition Component Fetch
    getItem: async (itemInput) => {
        return await fetch(`${ITEMS}${itemInput}`, {
            method: "GET",
            headers: {
              "x-rapidapi-key":"9c53497f87msh5a9410759cd8eafp149cecjsn0204a28c3b8c",
              "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
            },
        })
        .then((resp) => resp.json())
    },
    saveReport: async (token, user_id, reportTitle, date, foodList) => {
        const reqObj = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user_id,
              reportName: reportTitle,
              intakeDate: date,
              intakes: foodList,
            }),
        };
        return await fetch(REPORTS, reqObj)
        .then((resp) => resp.json())
    },
    // Overview Component Fetch
    getReports: async (token) => {
        const reqObj = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
        };
        return await fetch(REPORTS, reqObj)
        .then(resp => resp.json())
    },
    // NuReportDisplay Component Fetch
    getReport: async (token, id) => {
        const reqObj = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
        };
        return await fetch(`${REPORTS}${id}`, reqObj)
        .then(resp => resp.json())
    },
    // NuReportCard Component Fetch
    deleteReport: async (token, id) => {
        const reqObj = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
        };
        return await fetch(`${REPORTS}${id}`, reqObj)
    },
    // SignIn Component Fetch
    handleSignIn: async (username, password) => {
        const reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user:{
                username: username,
                password: password
            }})
        };
        return await fetch(`${USERS}login`, reqObj)
        .then(resp => resp.json())
    },
    // SignUp Component Fetch
    handleSignUp: async (username, password, name, email) => {
        const reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user:{
                username: username,
                password: password,
                name: name,
                email: email
            }})
        };
        return await fetch(`${USERS}users`, reqObj)
        .then(resp => resp.json())
    },
}
export default fetchReq;