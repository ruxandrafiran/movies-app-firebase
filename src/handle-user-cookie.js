import Cookies from "js-cookie"


// export const getCookie =  () => {
//     let user = Cookies.get("user")
//     if(user) {
//         user = JSON.parse(user)
//     return user
//     }
//     return
// }

// export const setCookie =  (user) => {
//     Cookies.set("user", JSON.stringify(user))
// }

export const getCookie =  () => {
    let id = Cookies.get("id")
    return id
}

export const setCookie =  (id) => {
    Cookies.set("id", id)
}
