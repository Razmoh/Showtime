import { createStore } from 'vuex'

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + localStorage.getItem('bearer'));
let url = "http://127.0.0.1:3000/";




const store = createStore({

    state: {
        admin: "false",
        user_id: "",
        
        notification: 'null',
        loginError: 'null',

        user: [],
        users: [],
        concerts: [],
        groups: [], 
        tickets: [],
        types: ["Dance", "Disco", "Fanfare", "Musette", "Pop", "Variétés", "Blues", "Country","Flamenco","Funk","Hard rock","Heavy metal","House", "Jazz","Klezmer","Ragga","Ragtime","Reggae","Salsa","Samba","Soul","Techno"],

    },


    // ---------- GETTER -------------------------------------------------------------------------------------------------------
    getters: {

        isAdmin(state) {
            return state.admin
        },

        getUser(state) {
            return state.user_id
        },

        getNotif(state) {
            return state.notification
        },

        getLoginError(state) {
            return state.loginError
        },

        getUsers(state) {
            return state.users
        },

        getConcerts(state) {
            return state.concerts
        },

        getGroups(state) {
            return state.groups
        },

        getTickets(state) {
            return state.tickets
        },

        getTypes(state) {
            return state.types
        },
 
    },


    // ---------- MUTATION -----------------------------------------------------------------------------------------------------
    mutations: {

        setAdmin(state, token) {
            state.admin = token.admin
            state.user_id = token.sub
        },

        notification(state, text) {
            state.notification = text
        },

        loginError(state, text) {
            state.loginError = "";
            let content = [];

            for (const [key, value] of Object.entries(text)) {
                content += `${key}: ${value} \n`;
            }
            console.log("<- Error login : \n" + content);
            state.loginError = content;
        },

        // --- USERS ---
        getUser(state, obj) {
            state.user = obj
        },

        getUsers(state, obj) {
            state.users = obj
        },

        postUser(state, result) {
            state.users.push(result)
        },

        putUser(state, result) {
            console.log(state.users);
            let index = state.users.findIndex(x => x._id === result._id);
            state.users[index] = result
        },

        delUser(state, result) {
            let index = state.users.findIndex(x => x._id === result._id);
            state.users.splice(index, 1);
        },

        // --- CONCERTS ---

        getConcerts(state, obj) {
            state.concerts = obj
        },

        postConcert(state, result) {
            state.concerts.push(result)
        },

        putConcert(state, result) {
            console.log(state.concerts);
            let index = state.concerts.findIndex(x => x._id === result._id);
            state.concerts[index] = result
        },

        delConcert(state, id) {
            let index = state.concerts.findIndex(x => x._id === id);
            state.concerts.splice(index, 1);
        },

        // --- GROUPS ---

        getGroups(state, obj) {
            state.groups = obj
        },

        postGroup(state, result) {
            state.groups.push(result)
        },

        putGroup(state, result) {
            console.log(state.groups);
            let index = state.groups.findIndex(x => x._id === result._id);
            state.groups[index] = result
        },

        delGroup(state, id) {
            let index = state.groups.findIndex(x => x._id === id);
            state.groups.splice(index, 1);
        },

        // --- TICKETS ---

        getTickets(state, obj) {
            state.tickets = obj
        },

        postTicket(state, result) {
            state.tickets.push(result)
        },

        putTicket(state, result) {
            console.log(state.tickets);
            let index = state.tickets.findIndex(x => x._id === result._id);
            state.tickets[index] = result
        },

        delTicket(state, id) {
            let index = state.tickets.findIndex(x => x._id === id);
            state.tickets.splice(index, 1);
        },

    },


    // ---------- ACTION -------------------------------------------------------------------------------------------------------
    actions: {

        getBearer({dispatch}) {
            let token = localStorage.getItem('bearer')

            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            dispatch("setAdmin", JSON.parse(jsonPayload))
        },

        setAdmin({commit}, admin) {
            commit('setAdmin', admin)
        },

        signin({dispatch}, user) {
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(user)
            };

            fetch('http://127.0.0.1:3000/auth/login/', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })
            .then((result) => {
                console.log("-> Action Sign In: ", result)
                localStorage.setItem("bearer", result.access_token)
                window.location.href = '/'
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },


        signup({dispatch}, user) {
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(user)
            };

            fetch('http://127.0.0.1:3000/auth/register', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })
            .then((result) => {
                console.log("-> Action Sign Up: ", result)
                window.location.href = '/login/signin'
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        notification(context, text) {
            context.commit('notification', text)
            setTimeout(() => { context.commit('notification', "null"); }, 5000);
        },

        loginError(context, text) {
            console.log(text);
            context.commit('loginError', text)
        },


        // --- USERS ---

        getUser({state, commit}){
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(`${url}users/`+state.user_id, requestOptions)
            .then((response) =>{
                if(response.ok) {
                    return response.json()
                }
                throw (response.json())
            })
            .then((result)=> {
                commit('getUser', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                })
            });
        },


        getUsers({commit, dispatch}) {
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(`${url}users`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Get Users: ", result)
                    commit('getUsers', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        postUser({commit, dispatch}, user) {

            var raw = JSON.stringify( user );
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}users`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Post User: ", result)
                    commit('postUser', result)
                    dispatch("notification", "User created")
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        putUser({commit, dispatch}, obj) {

            var raw = JSON.stringify( obj.tab );
            
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}users/`+obj.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Put User: ", result)
                    commit('putUser', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        delUser({commit, dispatch}, id) {
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };
            
            fetch(`${url}users/`+id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Del User: ", result)
                    commit('delUser', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },



        // --- CONCERTS ---

        getConcerts({commit, dispatch}, filter = "") {
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(`${url}concerts${filter}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Get Concerts: ", result)
                    commit('getConcerts', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        postConcert({commit, dispatch}, user) {

            var raw = JSON.stringify( user );
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}concerts`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Post Concert: ", result)
                    commit('postConcert', result)
                    dispatch("notification", "Concert created")
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        putConcert({commit, dispatch}, obj) {

            var raw = JSON.stringify( obj.tab );

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}concerts/`+obj.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Put Concert: ", result)
                    commit('putConcert', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        delConcert({commit, dispatch}, id) {
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };
            
            fetch(`${url}concerts/`+id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Del Concert: ", result)
                    commit('delConcert', id)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },


        // --- GROUPS ---

        getGroups({commit, dispatch}) {
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(`${url}groups`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Get Groups: ", result)
                    commit('getGroups', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        postGroup({commit, dispatch}, user) {

            var raw = JSON.stringify( user );
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}groups`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Post Group: ", result)
                    commit('postGroup', result)
                    dispatch("notification", "Group created")
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        putGroup({commit, dispatch}, obj) {

            var raw = JSON.stringify( obj.tab );

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}groups/`+obj.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Put Group: ", result)
                    commit('putGroup', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        delGroup({commit, dispatch}, id) {
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };
            
            fetch(`${url}groups/`+id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Del Group: ", result)
                    commit('delGroup', id)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },


        // --- TICKETS ---

        getTickets({commit, dispatch}, user = "") {
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(`${url}tickets${user}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Get Tickets: ", result)
                    commit('getTickets', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        postTicket({commit, dispatch, state}, concert) {

            concert["user_id"] = state.user_id;
            var raw = JSON.stringify( concert );
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}tickets`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Post Tickets: ", result)
                    commit('postTicket', result)
                    dispatch("notification", "Ticket created")
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        putTicket({commit, dispatch}, obj) {

            var raw = JSON.stringify( obj.tab );

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${url}tickets/`+obj.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Put Ticket: ", result)
                    commit('putTicket', result)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        },

        delTicket({commit, dispatch}, id) {
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };
            
            fetch(`${url}tickets/`+id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Del Ticket: ", result)
                    commit('delTicket', id)
            })
            .catch((error) => {
                error.then((result) => {
                    console.log("<- Action Error: ", result)
                    dispatch("notification", result.message)
                })
            });
        }

    }

})


export default store;