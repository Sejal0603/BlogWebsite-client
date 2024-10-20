export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'loading....',
        message:'datai sbeing loaded'
    },
    success:{
        title:"success",
        message:"Data successfully loaded"
    },
    responseFailures:{
        title: "error",
        message:"An error occures while fetching response from the server"


    },

    requestFailure:{
        title:'error',
        message:"An error occures while parsing request data"
    },
    networkError:{
        title:"error",
        message:"Unable to connect to server please check internet connectivity"
    }
}

// api serive calls
export const SERVICE_URLS={
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost:{url:'create',method:'POST'}, 
    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'post',method:'GET',query:true},
    updatePost:{url:'update',method:'PUT',query:true},
    deletePost:{url:'delete',method:'DELETE',query:true}
}
    // {
                //  headers: {
                //     'Content-Type': 'multipart/form-data',
                //  }}
